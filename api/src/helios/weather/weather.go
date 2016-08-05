package weather

import (
	"encoding/json"
	"fmt"
	"github.com/pkg/errors"
	"helios/helios"
	"net/http"
	"time"
)

type WeatherService struct {
	WeatherChan chan helios.Message
}

func Service() helios.ServiceHandler {
	return func(h *helios.Engine) {

		w := &WeatherService{
			WeatherChan: h.NewBroadcastChannel("weather", true),
		}

		go initWeatherFetch(h, w)
	}
}

func initWeatherFetch(h *helios.Engine, w *WeatherService) {
	apiURL := "https://api.forecast.io/forecast/%s/%s,%s"
	apiKey := h.Config.GetString("forecastio.apiKey")
	lat := h.Config.GetString("forecastio.lat")
	long := h.Config.GetString("forecastio.long")

	for {
		weather, err := getWeather(fmt.Sprintf(apiURL, apiKey, lat, long))
		if err != nil {
			h.Warn("Failed to fetch latest weather", "error", err.Error())
			w.WeatherChan <- helios.NewError("Failed to fetch latest weather at %s,%s", lat, long)
		} else {
			w.WeatherChan <- helios.NewMessage(weather)
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
		return nil, errors.Wrap(err, "Failed to fetch weather")
	}
	defer resp.Body.Close()

	decoder := json.NewDecoder(resp.Body)

	err = decoder.Decode(&weatherBody)
	if err != nil {
		return nil, errors.Wrap(err, "Failed to parse weather body")
	}

	return weatherBody, nil
}
