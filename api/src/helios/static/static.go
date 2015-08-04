package static

import (
	"helios/helios"
	"os"

	"github.com/gin-gonic/contrib/static"
)

func Service() helios.ServiceHandler {
	return func(h *helios.Engine) error {
		publicDir := "public"

		if len(os.Getenv("PUBLIC")) > 0 {
			publicDir = os.Getenv("PUBLIC")
		}

		// Setup static file server on HTTPEngine
		h.HTTPEngine.Use(static.Serve("/", static.LocalFile(publicDir, true)))

		return nil
	}
}
