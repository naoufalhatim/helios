# Helios [![Build Status](https://travis-ci.org/mojotech/helios.svg?branch=master)](https://travis-ci.org/mojotech/helios)
_Live data display with weather powered by Forecast.io_

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

**IMPORTANT** If you need to restart your Pi, be sure to reboot the helios service once the current time
is available. This is required for slack functionality to work correctly.

```bash
ssh pi@frontdoor.local
sudo systemctl restart helios.service
```

This will be fixed in future versions.

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
