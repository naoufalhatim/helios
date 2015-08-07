.PHONY: release
RELEASE_FOLDER="release"

deps:
	cd api && $(MAKE) deps
	cd client && npm i

release: deps
	cd api && $(MAKE) release
	cd client && npm run build
	@mkdir -p $(RELEASE_FOLDER)
	@cp -rf api/bin/helios* client/public $(RELEASE_FOLDER)
	@cp -rf api/.env.sample $(RELEASE_FOLDER)/.env.sample
	@echo "Finished Release"

test: deps
	cd client && npm test
	cd api && $(MAKE) test
