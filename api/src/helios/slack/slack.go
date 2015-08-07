package slack

import (
	"helios/helios"
	"os"
	"time"

	"github.com/nlopes/slack"
)

var MessageChann chan helios.Message

func Service() helios.ServiceHandler {
	return func(h *helios.Engine) error {

		// Setup broadcaster and save channel to a global
		MessageChann = h.NewBroadcastChannel("slack")

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
				channel, err := api.GetChannelInfo(event.Channel)
				if err == nil {
					channelName = channel.Name
				}
				MessageChann <- helios.NewMessage(channelName)
			}
		}
	}
	panic("Shouldn't be here")
}
