package helios

import (
	"fmt"

	"github.com/googollee/go-socket.io"
	log "gopkg.in/inconshreveable/log15.v2"
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

func NewError(err interface{}) Message {
	return Message{
		Error: err,
	}
}

func initSocket() *socketio.Server {
	server, err := socketio.NewServer(nil)
	if err != nil {
		fmt.Println("Failed to start socket server")
		return nil
	}

	server.On("connection", func(so socketio.Socket) {
		fmt.Printf("New socket.io connection: %s", so.Id())

		so.Join(ROOM)

		// Send all cached mesages to client
		for _, payload := range serviceCache {
			server.BroadcastTo(ROOM, MESSAGE, payload)
		}

		so.On("disconnection", func() {
			// no op
		})
	})

	server.On("error", func(so socketio.Socket, err error) {
		log.Error("Error on socket.io server", "error", err.Error())
	})

	return server
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
