package helios

import (
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

type ServiceHandler func(*Engine)

type Service struct {
	name    string
	handler ServiceHandler
}

func New() *Engine {
	// package instance of the helios type
	engine := &Engine{
		HTTPEngine: gin.Default(),
		Logger:     log.New(),
	}

	fileHandler, _ := log.FileHandler("./error.log", log.LogfmtFormat())
	engine.SetHandler(log.MultiHandler(log.LvlFilterHandler(log.LvlWarn, fileHandler), log.StreamHandler(os.Stdout, log.TerminalFormat())))

	socket, err := initSocket()
	if err != nil {
		engine.Error("Failed to initialize socket server")
	}

	// Handle error cases
	socket.On("error", func(so socketio.Socket, err error) {
		engine.Error("Error on socket.io server", "error", err.Error())
	})

	engine.Socket = socket

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
	h.Info("Starting services", "count", len(h.services))
	h.startServices()

	//Socket.io Route
	h.HTTPEngine.GET("/socket/", func(c *gin.Context) {
		h.Socket.ServeHTTP(c.Writer, c.Request)
	})

	// Start engine now that all services have loaded
	h.Info("Helios running", "port", port)
	h.HTTPEngine.Run(":" + port)
}

func (h *Engine) startServices() {
	for _, s := range h.services {
		h.Debug("Starting service", "name", s.name)
		s.handler(h)
	}
}
