# Helios [![Build Status](https://travis-ci.org/mojotech/helios.svg?branch=master)](https://travis-ci.org/mojotech/helios)
Live weather display powered by Forecast.io


### Developer Resources

Helios is broken up into 2 distinct parts: Client and Api. Each piece can be developed
independently of eachother, or simultaneously.

Refer to each readme file for how to develop for each service.

* [API Server](api/README.md)
* [Web Client](client/README.md)


### Release

Helios contains a `release` folder in the root of the repo. The release folder contains the compiled
server binary and static assets required to run Helios.

  `make release`

### Deploying to Frontdoor Pi

The frontdoor pi will run the binary and static assets that live in the `release` folder. So, a release
must first be committed to master before the deploy steps are run.

  `git remote add frontdoor pi@frontdoor.local:helios.git`
  `git push frontdoor master`

