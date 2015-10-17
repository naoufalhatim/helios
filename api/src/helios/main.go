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

	// Initialize Config
	viper.SupportedExts = []string{"json"}
	viper.SetConfigName("config")
	viper.AddConfigPath("./")
	viper.AddConfigPath(binPath)
	viper.AddConfigPath("$HOME/.helios")
	err := viper.ReadInConfig()

	if err != nil {
		log.Fatalln("No valid config.json file found found.")
		os.Exit(1)
	}

	// Set Config Defaults
	viper.SetDefault("port", "8989")

	h := helios.New()

	// Register http handler for sending the client config
	h.HTTPEngine.GET("/config", func(c *gin.Context) {
		c.JSON(200, viper.GetStringMap("client"))
	})

	h.Use("cors", cors.Service())
	h.Use("static", static.Service())

	if viper.IsSet("forecastio.apiKey") {
		h.Use("weather", weather.Service())
	}

	if viper.IsSet("github.apiKey") && viper.IsSet("github.apiSecret") {
		h.Use("github", github.Service())
	}

	if viper.IsSet("slack.apiKey") {
		h.Use("slack", slack.Service())
	}

	// Initialize helios
	h.Run(viper.GetString("port"))
}
