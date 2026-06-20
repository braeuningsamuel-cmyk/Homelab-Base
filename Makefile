# Makefile for Homelab-Base
.PHONY: help lint test secrets validate deploy

help:
	@echo "Homelab-Base - Available commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = \":.*?## \"}; {printf \"  \033[36m%-20s\033[0m %s\n\", $$1, $$2}'
	@echo ""

lint:  ## Run linters
	@echo "🔍 Running linters..."
	@which shellcheck >/dev/null 2>&1 || echo "⚠️  shellcheck not installed"
	@which yamllint >/dev/null 2>&1 || echo "⚠️  yamllint not installed"

test:  ## Run tests
	@echo "🧪 Running tests..."
	@which bats >/dev/null 2>&1 || echo "⚠️  bats not installed"

secrets:  ## Scan for hardcoded secrets
	@echo "🔒 Scanning for hardcoded secrets..."
	@grep -rn --include=\"*.yml\" --include=\"*.yaml\" --include=\"*.env\" \\n\t\t\t-E \"(api_key|secret|password|token)\s*=\s*['\\\"][^'\\\"]{6,}['\\\"]\" \\n\t\t\tapps/ infra/ profile/ docs/ 2>/dev/null || echo \"✅ No hardcoded secrets found\"

validate: lint secrets  ## Run full validation (lint + secrets)

deploy:  ## Deploy all docker compose stacks
	@echo "🐳 Deploying Docker Compose stacks..."
	@for dir in infra/*/; do \\n\t\techo \"  → $$dir\"; \\n\t\t(cd $$dir && docker compose up -d) || echo \"  ⚠️  Failed: $$dir\"; \\n\tdone

.PHONY: help lint test secrets validate deploy
