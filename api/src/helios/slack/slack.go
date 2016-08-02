package slack

import (
	"helios/helios"
	"regexp"
	"time"

	"gopkg.in/nlopes/slack.v0"
)

type Command struct {
	Name string   `json:"name"`
	Args []string `json:"args"`
}

type SlackService struct {
	Messages    chan helios.Message
	Commands    chan helios.Message
	Users       map[string]slack.User
	Channels    map[string]slack.Channel
	slackEvents chan slack.SlackEvent
}

func Service() helios.ServiceHandler {
	return func(h *helios.Engine) {

		var s = &SlackService{
			Messages: h.NewBroadcastChannel("slack", true),
			Commands: h.NewBroadcastChannel("command", false),
			Users:    make(map[string]slack.User),
			Channels: make(map[string]slack.Channel),
		}

		// Setup broadcaster and save channel to a global

		err := initSlackRTM(h, s)
		if err != nil {
			h.Error("Slack service failed to start", "error", err)
		}
	}
}

func initSlackRTM(h *helios.Engine, s *SlackService) error {
	token := h.Config.GetString("slack.apiKey")

	s.slackEvents = make(chan slack.SlackEvent)

	api := slack.New(token)

	rtm, err := api.StartRTM("", "http://localhost/")
	if err != nil {
		return err
	}

	// Cache all users for mention lookups
	users, err := api.GetUsers()
	if err != nil {
		return err
	}

	// Map all users ids to user type
	for _, u := range users {
		s.Users[u.Id] = u
	}

	// Cache all channels for lookups
	channels, err := api.GetChannels(true)
	if err != nil {
		return err
	}

	// Map all channel ids to channel type
	for _, c := range channels {
		s.Channels[c.Id] = c
	}

	go rtm.HandleIncomingEvents(s.slackEvents)
	go rtm.Keepalive(20 * time.Second)
	go messageHandler(api, s, h)

	return nil
}

func messageHandler(api *slack.Slack, s *SlackService, h *helios.Engine) {
	for {
		select {
		case msg := <-s.slackEvents:
			switch msg.Data.(type) {
			case *slack.MessageEvent:
				channelName := ""
				event := msg.Data.(*slack.MessageEvent)

				if channel, ok := s.Channels[event.ChannelId]; ok {
					channelName = channel.Name
				}

				s.Messages <- helios.NewMessage(channelName)

				// Find only the first mention at the begining of the string
				re := regexp.MustCompile(`^<@(.*?)>:? (\w+)\s?(.*)?`)
				match := re.FindStringSubmatch(event.Text)

				if len(match) < 3 {
					continue
				}

				// Validate that user id exists
				if u, ok := s.Users[match[1]]; ok {
					// Commands can only be sent to the defined name and a valid bot
					botName := h.Config.GetString("slack.botName")
					if u.Name == botName && u.IsBot {
						args := []string{}

						// If we have more than the username and command then process the rest as args
						if len(match) > 3 {
							re := regexp.MustCompile(`"[^"]+"|[\w]+`) // Match individual words and quoted strings
							args = re.FindAllString(match[3], -1)
						}

						// Wrap the command information
						command := Command{
							Name: match[2],
							Args: args,
						}

						s.Commands <- helios.NewMessage(command)
					}
				}

			}
		}
	}
	panic("Shouldn't be here")
}
