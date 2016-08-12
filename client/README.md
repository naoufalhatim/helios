## Helios Client

### Setup

1. `npm i`
2. `gulp serve`

Note: if no API server can be found, the client will use dummy data from `gulp/responses`.
The client will be served from port 3000 by default

### Testing

Helios front end uses Jest for snapshot testing.

Use `jest` to run snapshot tests.

Use `jest -u` if you have made changes to a plugin and
need to update the snapshot file.
