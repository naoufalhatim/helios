.PHONY: deps fmt build release clean test serve
export GOPATH=$(shell pwd)

deps:
	@go get -d -v helios/...

fmt:
	@go fmt helios/...

build:
	@go install helios

clean:
	@go clean -i -r helios/...

release: deps
ifeq ("$(wildcard $(./bin/gox))", "")
	@go get github.com/mitchellh/gox
	@go install github.com/mitchellh/gox
endif
	@./bin/gox -build-toolchain -osarch="linux/arm linux/amd64 darwin/amd64"
	@./bin/gox -osarch="linux/arm linux/amd64 darwin/amd64" -output="./bin/{{.Dir}}_{{.OS}}_{{.Arch}}" helios

test:
	@go test helios/...

serve:
ifeq ("$(wildcard $(./bin/fresh))","")
	@go get github.com/pilu/fresh
	@go install github.com/pilu/fresh
endif
	@./bin/fresh -c fresh.conf
