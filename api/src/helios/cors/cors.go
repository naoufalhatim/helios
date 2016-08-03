package cors

import (
	"helios/helios"

	"github.com/tommy351/gin-cors"
)

func Service() helios.ServiceHandler {
	return func(h *helios.Engine) {
		h.HTTPEngine.Use(cors.Middleware(cors.Options{AllowCredentials: true}))
	}
}
