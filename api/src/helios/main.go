package main

import (
	"fmt"
	"helios/cors"
	"helios/github"
	"helios/helios"
	"helios/slack"
	"helios/static"
	"helios/weather"
	"os"
	"path/filepath"

	_ "github.com/joho/godotenv/autoload"
	"github.com/spf13/viper"
)

func main() {
	// Get current binary path
	binPath, _ := filepath.Abs(filepath.Dir(os.Args[0]))

	// Initialize Config
	viper.SetConfigName("config")
	viper.AddConfigPath("./")
	viper.AddConfigPath(binPath)
	viper.AddConfigPath("$HOME/.helios")
	err := viper.ReadInConfig()

	if err != nil {
		fmt.Println(err)
	}

	viper.SetDefault("port", "8989")

	port := viper.GetString("port")

	h := helios.New()

	h.Use("cors", cors.Service())
	h.Use("static", static.Service())
	h.Use("github", github.Service())
	h.Use("slack", slack.Service())
	h.Use("weather", weather.Service())

	// Initialize helios
	h.Run(port)
}
