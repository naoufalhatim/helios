.PHONY: deps fmt build clean serve
export GOPATH=$(shell pwd)

deps:
	go get -d -v helios/...

fmt:
	go fmt helios/...

build: deps
	GOARCH=arm GOOS=linux CGO_ENABLED=0 go build -o bin/helios.pi helios
	GOARCH=amd64 CGOOS=linux CGO_ENABLED=0 go build -o bin/helios.linux helios
	CGO_ENABLED=0 go build -o bin/helios helios

clean:
	go clean -i -r helios/...

test:
	go test helios/...

serve:
ifeq ("$(wildcard $(./bin/fresh))","")
	@go get github.com/pilu/fresh
	@go install github.com/pilu/fresh
endif
	@./bin/fresh -c fresh.conf
