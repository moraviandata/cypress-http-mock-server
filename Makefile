

.PHONY: docker

docker:
	docker build . -t moraviandata/cypress-http-mock-server:latest