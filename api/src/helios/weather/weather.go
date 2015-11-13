package weather

import (
	"encoding/json"
	"fmt"
	"helios/helios"
	"net/http"
	"time"

	log "gopkg.in/inconshreveable/log15.v2"
)

var WeatherChan chan helios.Message

func Service() helios.ServiceHandler {
	return func(h *helios.Engine) error {

		WeatherChan = h.NewBroadcastChannel("weather", true)

		go initWeatherFetch(h)

		return nil
	}
}

func initWeatherFetch(h *helios.Engine) {
	apiURL := "https://api.forecast.io/forecast/%s/%s,%s"
	apiKey := h.Config.GetString("forecastio.apiKey")
	lat := h.Config.GetString("forecastio.lat")
	long := h.Config.GetString("forecastio.long")

	for {
		weather, err := getWeather(fmt.Sprintf(apiURL, apiKey, lat, long))
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
