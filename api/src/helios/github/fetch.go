package github

import (
	"helios/helios"
	"strconv"
	"time"

	"github.com/google/go-github/github"
	"golang.org/x/oauth2"
)

func startExistingUsers(g *GithubService) {
	for _, u := range g.Users {
		startUser(u, g)
	}
}

func startUser(u User, g *GithubService) {
	go userRoutine(u, g)
}

func userRoutine(u User, g *GithubService) error {

	ts := tokenSource{
		&oauth2.Token{
			AccessToken: u.AccessToken,
		},
	}

	tc := oauth2.NewClient(oauth2.NoContext, ts)

	client := github.NewClient(tc)

	//List Options Page, PerPage
	opts := github.ListOptions{1, 1}

	for {
		events, resp, err := client.Activity.ListEventsPerformedByUser(u.Username, false, &opts)
		if err != nil {
			g.EventChan <- helios.NewError("Problem retrieving events for user: %s. Error: %v", u.Username, err)
		}

		newEventTime := g.LastEvent.EventTime

		if len(events) > 0 {
			newEventTime = *events[0].CreatedAt
		}

		// read in last event and compare to new event time
		g.LastEvent.Lock()
		dur := g.LastEvent.EventTime.Sub(newEventTime)
		if dur.Seconds() > 0.0 {
			g.LastEvent.EventTime = newEventTime
			g.EventChan <- helios.NewMessage(events[0])
		}
		g.LastEvent.Unlock()

		// Wait as long as the X-Poll-Interval header says to
		interval, err := strconv.ParseInt(resp.Header["X-Poll-Interval"][0], 10, 8)
		if err != nil {
			// if strconv failed for whatever reason, use the default X-Poll-Interval value of 60
			time.Sleep(60 * time.Second)
		} else {
			time.Sleep(time.Duration(interval) * time.Second)
		}
	}

	panic("Shouldn't be here")
}
