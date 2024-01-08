.DEFAULT_GOAL := help

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort -k 1,1 | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'


.PHONY: lint
lint: ## lint
	@cd solid && pnpm lint

.PHONY: lint-fix
lint-fix: ## lint and fix
	@cd solid && pnpm lint:fix
	
.PHONY: build
build: ## build
	@cd solid && pnpm build

.PHONY: build-prod
build-prod: ## build for prod
	@cd solid && pnpm i --frozen-lockfile && pnpm build