package helios

import (
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/googollee/go-socket.io"
	"github.com/spf13/viper"
	log "gopkg.in/inconshreveable/log15.v2"
)

type Engine struct {
	HTTPEngine *gin.Engine
	Socket     *socketio.Server
	Config     *viper.Viper
	services   []Service
	log.Logger
}

type ServiceHandler func(*Engine) error

type Service struct {
	name    string
	handler ServiceHandler
}

func New() *Engine {
	// package instance of the helios type
	engine := &Engine{
		HTTPEngine: gin.Default(),
		Socket:     initSocket(),
		Logger:     log.New(),
	}

	fileHandler, _ := log.FileHandler("./error.log", log.LogfmtFormat())
	engine.SetHandler(log.MultiHandler(log.LvlFilterHandler(log.LvlWarn, fileHandler), log.StreamHandler(os.Stdout, log.TerminalFormat())))

	return engine
}

func (h *Engine) Use(name string, mw ServiceHandler) {
	h.services = append(h.services, Service{name, mw})
}

func (h *Engine) SetConfig(v *viper.Viper) {
	h.Config = v
}

func (h *Engine) Run(port string) {
	// Start services services
	h.startServices()

	//Socket.io Route
	h.HTTPEngine.GET("/socket/", func(c *gin.Context) {
		h.Socket.ServeHTTP(c.Writer, c.Request)
	})

	// Start engine now that all services have loaded
	h.HTTPEngine.Run(":" + port)
}

func (h *Engine) startServices() {
	for _, s := range h.services {
		err := s.handler(h)
		if err != nil {
			h.Warn(fmt.Sprintf("Failed to start service: Error: %s", err), "service", s.name)
		}
	}
}
