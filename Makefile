# Makefile for Docker Container Management

# Project variables
PROJECT_NAME = markdown-cleaner
DOCKER_IMAGE = $(PROJECT_NAME)
CONTAINER_NAME = $(PROJECT_NAME)-app
DOCKER_PORT = 3001
APP_PORT = 3000

# Docker configuration
DOCKER_RUN_FLAGS = -p $(DOCKER_PORT):$(APP_PORT) \
	--name $(CONTAINER_NAME)

# Help target
.PHONY: help
help:
	@echo "Docker Container Management"
	@echo ""
	@echo "Available commands:"
	@echo "  build       : Build Docker image"
	@echo "  run         : Run Docker container"
	@echo "  stop        : Stop Docker container"
	@echo "  restart     : Restart Docker container"
	@echo "  rm          : Remove Docker container"
	@echo "  logs        : View container logs"
	@echo "  shell       : Open shell in container"
	@echo "  clean       : Remove image and container"
	@echo "  compose-up  : Start services with docker-compose"
	@echo "  compose-down: Stop services with docker-compose"

# Build Docker image
.PHONY: build
build:
	@docker build -t $(DOCKER_IMAGE) .
	@echo "Docker image $(DOCKER_IMAGE) built successfully"

# Run Docker container
.PHONY: run
run: build
	@docker run -v ./.env:/app/.env -d $(DOCKER_RUN_FLAGS) $(DOCKER_IMAGE)
	@echo "Container $(CONTAINER_NAME) is running on http://localhost:$(DOCKER_PORT)"

# Stop Docker container
.PHONY: stop
stop:
	@docker stop $(CONTAINER_NAME) || true
	@echo "Stopped container $(CONTAINER_NAME)"

# Restart Docker container
.PHONY: restart
restart: stop run

# Remove Docker container
.PHONY: rm
rm: stop
	@docker rm $(CONTAINER_NAME) || true
	@echo "Removed container $(CONTAINER_NAME)"

# View container logs
.PHONY: logs
logs:
	@docker logs -f $(CONTAINER_NAME)

# Open shell in container
.PHONY: shell
shell:
	@docker exec -it $(CONTAINER_NAME) /bin/sh

# Remove image and container
.PHONY: clean
clean: rm
	@docker rmi $(DOCKER_IMAGE) 2>/dev/null || true
	@echo "Removed image $(DOCKER_IMAGE)"

# Docker Compose commands
.PHONY: compose-up
compose-up:
	@docker-compose up -d --build
	@echo "Services started with docker-compose"

.PHONY: compose-down
compose-down:
	@docker-compose down
	@echo "Services stopped"

# Default target
.DEFAULT_GOAL := help
