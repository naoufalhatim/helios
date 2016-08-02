package static

import (
	"helios/helios"

	"github.com/gin-gonic/contrib/static"
)

func Service() helios.ServiceHandler {
	return func(h *helios.Engine) {
		publicDir := "public"

		if h.Config.IsSet("publicDir") {
			publicDir = h.Config.GetString("publicDir")
		}

		// Setup static file server on HTTPEngine
		h.HTTPEngine.Use(static.Serve("/", static.LocalFile(publicDir, true)))
	}
}
