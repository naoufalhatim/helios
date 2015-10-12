# Helios [![Build Status](https://travis-ci.org/mojotech/helios.svg?branch=master)](https://travis-ci.org/mojotech/helios)
Live weather display powered by Forecast.io

![](https://camo.githubusercontent.com/26360563bb3f56221eaa29df75862a61252cebf2/687474703a2f2f642e70722f692f313455646c2b)


### Developer Resources

Helios is broken up into 2 distinct parts: Client and Api. Each piece can be developed
independently of eachother, or simultaneously.

Refer to each readme file for how to develop for each service.

* [API Server](api/README.md)
* [Web Client](client/README.md)


### Release

Helios will compile all of the assets into a `release` folder in the root of the repo. The release folder will contains the compiled
server binary and static assets required to run Helios.

  `make release`

### Deploying to Frontdoor Pi

To deploy to the internal instance of helios, run the `deploy` task from within the same network that helios is running. This will
prompt for the pi's password several times unless your public key is on the pi running helios.

    `make deploy`


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
