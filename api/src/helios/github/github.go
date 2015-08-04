package github

import (
	"encoding/csv"
	"fmt"
	"helios/helios"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/markbates/goth"
	githubProvider "github.com/markbates/goth/providers/github"
	log "gopkg.in/inconshreveable/log15.v2"
)

var LastEvent Event
var Users = make(map[string]User)
var EventChan chan interface{}

func loadUsersCSV() error {
	// Open and parse existing users from the uat file
	usersFile, err := os.OpenFile("users.csv", os.O_RDWR|os.O_CREATE, 0664)
	if err != nil {
		log.Error("Failed to open users file", "error", err.Error())
		return err
	}
	defer usersFile.Close()

	csvReader := csv.NewReader(usersFile)
	rawCSV, err := csvReader.ReadAll()
	if err != nil {
		log.Error("Failed to read CSV file", "error", err.Error())
		return err
	}

	for _, row := range rawCSV {
		u := User{row[0], row[1]}
		Users[u.Username] = u
	}

	return nil
}

func Service() helios.ServiceHandler {
	return func(h *helios.Engine) error {
		githubKey := os.Getenv("GITHUB_KEY")
		githubSecret := os.Getenv("GITHUB_SECRET")

		// Set the initial last event time to now
		LastEvent.EventTime = time.Now()

		// Setup Goth Authentication
		goth.UseProviders(
			githubProvider.New(githubKey, githubSecret, fmt.Sprintf("http://localhost:8989/auth/github/callback"), "repo", "user:email"),
		)

		// Setup github auth routes
		h.HTTPEngine.GET("/auth/github/callback", providerCallback)
		h.HTTPEngine.GET("/auth/github", providerAuth)

		//Socket.io Route
		h.HTTPEngine.GET("/socket.io/", func(c *gin.Context) {
			h.Socket.ServeHTTP(c.Writer, c.Request)
		})

		// Start socket broadcast channel and save the channel to a global
		EventChan = h.NewBroadcastChannel("github")

		// Load registered users
		err := loadUsersCSV()
		if err != nil {
			return err
		}

		// Start Existing Users
		startExistingUsers()

		return nil

	}
}
