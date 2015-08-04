## Helios Server

### Jobs

* Serve static assets used by client
* Provide socket connection with client
* Run api services and pipe results to client via socket
* Run forever and never go down

### Technology

* [Golang](http://golang.org/)
* [GIN](https://github.com/gin-gonic/gin)
* [google/go-github](https://github.com/google/go-github)
* [nlopes/slack](https://github.com/nlopes/slack)

### Setup ENV

The Helios server will automatically load `./.env` into the environment variable.
To set up `.env` for local development, run the following and modify `.env`

    cp .env.sample .env

### Compiling

This is used for building the release but can also be used for development:

    make build
    ./bin/helios


### Auto Compile (for rapid development)

Use the serve build command to auto compile when changes are made:

    make serve
