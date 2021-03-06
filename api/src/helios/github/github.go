package github

import (
	"encoding/csv"
	"fmt"
	"helios/helios"
	"os"
	"time"

	"github.com/markbates/goth"
	githubProvider "github.com/markbates/goth/providers/github"
	"github.com/pkg/errors"
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
		return errors.Wrap(err, "Failed to open users file")
	}

	defer usersFile.Close()

	csvReader := csv.NewReader(usersFile)
	rawCSV, err := csvReader.ReadAll()
	if err != nil {
		return errors.Wrap(err, "Failed to read CSV file")
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
		h.HTTPEngine.GET("/auth/github/callback", providerCallback(h, g))
		h.HTTPEngine.GET("/auth/github", providerAuth)

		// Load registered users
		err := loadUsersCSV(g)
		if err != nil {
			h.Error("Failed to load users from csv", "error", err.Error())
		}

		// Start Existing Users
		h.Debug("Starting existing github user go routines")
		startExistingUsers(g)
	}
}
