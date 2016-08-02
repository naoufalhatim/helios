package cors

import (
	"helios/helios"

	"github.com/tommy351/gin-cors"
)

func Service() helios.ServiceHandler {
	return func(h *helios.Engine) {

		if h.Config.GetBool("enableCors") {
			h.Info("Enabling CORS Service")
			h.HTTPEngine.Use(cors.Middleware(cors.Options{AllowCredentials: true}))
		}
	}
}
