package github

import (
	"fmt"
	"helios/helios"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/markbates/goth/gothic"
)

func providerAuth(c *gin.Context) {
	gothic.GetProviderName = func(req *http.Request) (string, error) { return "github", nil }
	gothic.BeginAuthHandler(c.Writer, c.Request)
}

func providerCallback(h *helios.Engine, g *GithubService) gin.HandlerFunc {
	return func(c *gin.Context) {
		var user User

		// Run user auth using the gothic library
		githubUser, err := gothic.CompleteUserAuth(c.Writer, c.Request)
		if err != nil {
			h.Warn("Failed to create user from callback", "error", err.Error())
		}

		user.Username = githubUser.RawData["login"].(string)
		user.AccessToken = githubUser.AccessToken

		// If the user doesn't exist yet
		if _, ok := g.Users[user.Username]; !ok {
			userFile, err := os.OpenFile("users.csv", os.O_APPEND|os.O_WRONLY, 0644)
			defer userFile.Close()

			_, err = userFile.WriteString(fmt.Sprintf("%s,%s\n", user.Username, user.AccessToken))
			if err != nil {
				h.Error("Failed to write new users to CSV", "error", err.Error())
			}

			g.Users[user.Username] = user
			// startUser(user)

		} else {
			h.Info("User already exists")
		}

		c.JSON(200, user)
	}
}
