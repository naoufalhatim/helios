package helios

import (
	"fmt"
	"github.com/googollee/go-socket.io"
	"github.com/pkg/errors"
)

const (
	ROOM    = "helios"
	MESSAGE = "event"
)

var serviceCache = make(map[string]socketMessage)

type socketMessage struct {
	Type string `json:"type"`
	Message
}

type Message struct {
	Data  interface{} `json:"data,omitempty"`
	Error interface{} `json:"error,omitempty"`
}

func NewMessage(payload interface{}) Message {
	return Message{
		Data: payload,
	}
}

func NewError(format string, args ...interface{}) Message {
	return Message{
		Error: fmt.Sprintf(format, args...),
	}
}

func initSocket() (*socketio.Server, error) {
	server, err := socketio.NewServer(nil)
	if err != nil {
		return nil, errors.Wrap(err, "Failed to start socket server")
	}

	server.On("connection", func(so socketio.Socket) {

		so.Join(ROOM)

		// Send all cached mesages to client
		for _, payload := range serviceCache {
			server.BroadcastTo(ROOM, MESSAGE, payload)
		}

		so.On("disconnection", func() {
			// no op
		})
	})

	return server, nil
}

func (h *Engine) NewBroadcastChannel(message string, enableCache bool) chan Message {
	chReceiver := make(chan Message)
	go func() {
		for {
			msg := <-chReceiver

			wrappedMsg := socketMessage{
				Type:    message,
				Message: msg,
			}

			if enableCache {
				// cache the lastest message from this service
				serviceCache[message] = wrappedMsg
			}

			h.Info("Got message to broadcast", "socket", message)
			h.Socket.BroadcastTo(ROOM, MESSAGE, wrappedMsg)
		}
	}()
	return chReceiver
}
