package main

import (
	"helios/cors"
	"helios/github"
	"helios/helios"
	"helios/slack"
	"helios/static"
	"helios/weather"
	"log"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
	_ "github.com/joho/godotenv/autoload"
	"github.com/spf13/viper"
)

func main() {
	// Get current binary path
	binPath, _ := filepath.Abs(filepath.Dir(os.Args[0]))

	// Viper settings
	viper.SupportedExts = []string{"json"}

	// Initialize Config
	config := viper.New()
	config.SetConfigName("config")
	config.AddConfigPath("./")
	config.AddConfigPath(binPath)
	config.AddConfigPath("$HOME/.helios")

	// Read config file
	err := config.ReadInConfig()
	if err != nil {
		log.Fatalln("No valid config.json file found.", err)
		os.Exit(1)
	}

	// Set Config Defaults
	config.SetDefault("port", "8989")

	// Initialize Helios
	h := helios.New()
	h.SetConfig(config)

	// Register http handler for sending the client config
	h.HTTPEngine.GET("/config", func(c *gin.Context) {
		c.JSON(200, config.GetStringMap("client"))
	})

	// Register Services
	h.Use("cors", cors.Service())
	h.Use("static", static.Service())

	if config.IsSet("forecastio.apiKey") {
		h.Use("weather", weather.Service())
	}

	if config.IsSet("github.apiKey") && config.IsSet("github.apiSecret") {
		h.Use("github", github.Service())
	}

	if config.IsSet("slack.apiKey") {
		h.Use("slack", slack.Service())
	}

	// Start helios
	h.Run(config.GetString("port"))
}
