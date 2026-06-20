# Homelab-Base Architecture

> **Status:** monorepo for Bootstreep homelab infrastructure.
> **Structure:** Separate apps and infra via pnpm workspaces or similar.

## Apps
- `apps/dashboard` - Tauri 2.x desktop application (bootstreep-dashboard)
- `apps/guardian` - Security monitoring application (home-lab-guardian)

## Infrastructure
- `infra/` - Docker Compose stacks for all services
  - `infra/compose/` - Individual service compose files
  - `infra/.github/` - CI/CD workflows

## Profile
- `profile/` - Personal profile and scripts (braeuningsamuel-cmyk)

## Quality Bar
This repository aims to meet the Bootstreep quality bar:
- [x] BATS tests
- [x] CI (GitHub Actions)
- [ ] Makefile (added via this commit)
- [x] .env.example (needs to be added)
- [x] ARCHITECTURE.md (this file)
- [ ] Healthchecks (defined in individual compose files)
- [x] Resource limits (defined in individual compose files)

## Getting Started
See individual app/README.md and infra/README.md for setup instructions.

## License
MIT
