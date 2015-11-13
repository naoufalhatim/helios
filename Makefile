.PHONY: release deps test deploy
RELEASE_FOLDER="release"
REMOTE_USER=pi
REMOTE_HOST=frontdoor.local
REMOTE_PATH=/opt/helios

deps:
	@cd api && $(MAKE) deps
	@cd client && npm i

release: deps
	@echo "Starting Release"
	@cd api && $(MAKE) release
	@cd client && npm run build
	@mkdir -p $(RELEASE_FOLDER)
	@cp -rf api/bin/helios* client/public $(RELEASE_FOLDER)
	@cp -rf api/config.json.sample $(RELEASE_FOLDER)/config.json.sample
	@echo "Finished Release"

test: deps
	@cd client && npm test
	@cd api && $(MAKE) test

deploy: release
	@echo "Starting Deployment"
	@ssh $(REMOTE_USER)@$(REMOTE_HOST) sudo systemctl stop helios.service
	@rsync -azhvP release/ $(REMOTE_USER)@$(REMOTE_HOST):$(REMOTE_PATH)
	@ssh $(REMOTE_USER)@$(REMOTE_HOST) sudo systemctl start helios.service
	@echo "Finished Deployment"
