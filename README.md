# Helios [![Build Status](https://travis-ci.org/mojotech/helios.svg?branch=master)](https://travis-ci.org/mojotech/helios)
Live weather display powered by Forecast.io

![](https://camo.githubusercontent.com/26360563bb3f56221eaa29df75862a61252cebf2/687474703a2f2f642e70722f692f313455646c2b)

Helios is comprised of a web client and API server:

* [API server](api/README.md)
* [Web client](client/README.md)

Note: The API server is not necessary to run when working on the client.
A mock server will be spun up automatically if an API server is not run.

### Release

`make release`

Helios will compile all of the assets into a `release` folder in the root of the repo, containing the compiled
server binary and static assets.

### Deploying to Frontdoor Pi

`make deploy`

To deploy to the internal instance of helios, run the task while on the same network as Helios is connected to.

### Working with the PI

Sometimes it's necessary to run commands manually on the pi.

SSH into the pi.

  `ssh pi@frontdoor.local`

Restart the helios service:

  `sudo systemctl restart helios.service`

Turn the projector on and off:

  `echo "on 0" | cec-client -s` #on
  `echo "standby 0" | cec-client -s` #off

Add a developer's public key for deploy commands:

  `gh-auth add --users=<github_username>`
