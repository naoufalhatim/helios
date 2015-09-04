package slack

import (
	"helios/helios"
	"os"
	"regexp"
	"time"

	"gopkg.in/nlopes/slack.v0"
)

type Command struct {
	Name string   `json:"name"`
	Args []string `json:"args"`
}

var MessageChann chan helios.Message
var CommandChann chan helios.Message
var Users = make(map[string]slack.User)
var Channels = make(map[string]slack.Channel)

func Service() helios.ServiceHandler {
	return func(h *helios.Engine) error {

		// Setup broadcaster and save channel to a global
		MessageChann = h.NewBroadcastChannel("slack", true)
		CommandChann = h.NewBroadcastChannel("command", false)

		err := initSlackRTM()
		if err != nil {
			return err
		}

		return nil
	}
}

func initSlackRTM() error {
	token := os.Getenv("SLACK_API")

	chReceiver := make(chan slack.SlackEvent)

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
		Users[u.Id] = u
	}

	// Cache all channels for lookups
	channels, err := api.GetChannels(true)
	if err != nil {
		return err
	}

	// Map all channel ids to channel type
	for _, c := range channels {
		Channels[c.Id] = c
	}

	go rtm.HandleIncomingEvents(chReceiver)
	go rtm.Keepalive(20 * time.Second)
	go messageHandler(api, chReceiver)

	return nil
}

func messageHandler(api *slack.Slack, c chan slack.SlackEvent) {
	for {
		select {
		case msg := <-c:
			switch msg.Data.(type) {
			case *slack.MessageEvent:
				channelName := ""
				event := msg.Data.(*slack.MessageEvent)

				if channel, ok := Channels[event.ChannelId]; ok {
					channelName = channel.Name
				}

				MessageChann <- helios.NewMessage(channelName)

				// Find only the first mention at the begining of the string
				re := regexp.MustCompile(`^<@(.*?)>:? (\w+)\s?(.*)?`)
				match := re.FindStringSubmatch(event.Text)

				if len(match) < 3 {
					continue
				}

				// Validate that user id exists
				if u, ok := Users[match[1]]; ok {
					// Commands can only be sent to the defined name and a valid bot
					if u.Name == os.Getenv("SLACK_BOT_NAME") && u.IsBot {
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

						CommandChann <- helios.NewMessage(command)
					}
				}

			}
		}
	}
	panic("Shouldn't be here")
}
