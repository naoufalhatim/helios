package weather

import (
	"encoding/json"
	"helios/helios"
	"net/http"
	"os"
	"time"

	log "gopkg.in/inconshreveable/log15.v2"
)

var WeatherChan chan helios.Message

func Service() helios.ServiceHandler {
	return func(h *helios.Engine) error {

		apiURL := os.Getenv("WEATHER_API")

		WeatherChan = h.NewBroadcastChannel("weather", true)

		go initWeatherFetch(apiURL)

		return nil
	}
}

func initWeatherFetch(apiURL string) {
	for {
		weather, err := getWeather(apiURL)
		if err != nil {
			WeatherChan <- helios.NewError("Failed to fetch latest weather")
		} else {
			WeatherChan <- helios.NewMessage(weather)
		}

		// Timeout for 120 seconds before next request
		time.Sleep(120 * time.Second)
	}

	panic("Shouldn't be here")
}

func getWeather(apiURL string) (interface{}, error) {
	var weatherBody interface{}

	resp, err := http.Get(apiURL)
	if err != nil {
		log.Warn("Failed to fetch weather", "error", err.Error())
		return nil, err
	}
	defer resp.Body.Close()

	decoder := json.NewDecoder(resp.Body)

	err = decoder.Decode(&weatherBody)
	if err != nil {
		log.Warn("Failed to parse weather body", "error", err.Error())
		return nil, err
	}

	return weatherBody, nil
}
