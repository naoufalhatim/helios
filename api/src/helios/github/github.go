package github

import (
	"encoding/csv"
	"fmt"
	"helios/helios"
	"os"
	"time"

	"github.com/markbates/goth"
	githubProvider "github.com/markbates/goth/providers/github"
	log "gopkg.in/inconshreveable/log15.v2"
)

type GithubService struct {
	LastEvent    Event
	Users        map[string]User
	EventChan    chan helios.Message
	githubKey    string
	githubSecret string
}

func loadUsersCSV(g *GithubService) error {
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
		g.Users[u.Username] = u
	}

	return nil
}

func Service() helios.ServiceHandler {
	return func(h *helios.Engine) {
		g := &GithubService{
			Users:        make(map[string]User),
			EventChan:    h.NewBroadcastChannel("github", true),
			githubKey:    h.Config.GetString("github.apiKey"),
			githubSecret: h.Config.GetString("github.apiSecret"),
		}

		// Set the initial last event time to now
		g.LastEvent.EventTime = time.Now()

		// Setup Goth Authentication
		goth.UseProviders(
			githubProvider.New(g.githubKey, g.githubSecret, fmt.Sprintf("http://%s:%s/auth/github/callback", h.Config.GetString("host"), h.Config.GetString("port")), "repo", "user:email"),
		)

		// Setup github auth routes
		h.HTTPEngine.GET("/auth/github/callback", providerCallback(g))
		h.HTTPEngine.GET("/auth/github", providerAuth)

		// Load registered users
		err := loadUsersCSV(g)
		if err != nil {
			h.Error("Failed to load users from csv", "error", err)
		}

		// Start Existing Users
		startExistingUsers(g)
	}
}
