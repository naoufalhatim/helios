## Helios Server

### Setup

The Helios server will automatically load `config.json` from any of the following locations: `./config.json`, `~/.helios/config.json`, `<binpath>/config.json`.
To set up `config.json` for local development, run the following and modify `config.json`

`cp config.json.sample config.json`

To download the server dependencies:

`make deps`

To run the server and auto compile when changes are made:

`make serve`
