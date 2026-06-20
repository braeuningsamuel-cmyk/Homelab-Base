# Homelab-Base

> Unified monorepo for the bootstreep homelab stack — infrastructure automation, desktop dashboard, security guardian, and profile documentation in one place.

[![CI](https://img.shields.io/badge/CI-passing-00B894?style=flat-square)](https://github.com/braeuningsamuel-cmyk/Homelab-Base/actions)
[![Quality](https://img.shields.io/badge/quality-5%2F5-6366F1?style=flat-square)](#quality-bar)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)
[![Repo size](https://img.shields.io/github/repo-size/braeuningsamuel-cmyk/Homelab-Base?style=flat-square)](https://github.com/braeuningsamuel-cmyk/Homelab-Base)

---

## What is this?

**Homelab-Base** is the umbrella monorepo that groups four sibling GitHub repositories so they can be browsed, audited, and cross-referenced from a single root. Every subdirectory corresponds to a standalone repo:

| Path | Standalone repo | Purpose |
|------|----------------|---------|
| [`infra/`](infra/) | [bootstreep-homelab](https://github.com/braeuningsamuel-cmyk/bootstreep-homelab) | Bash + Ansible + Docker bootstrap (Traefik, Authentik, Prometheus, Loki, Grafana, Vaultwarden) |
| [`apps/dashboard/`](apps/dashboard/) | [bootstreep-dashboard](https://github.com/braeuningsamuel-cmyk/bootstreep-dashboard) | Tauri desktop dashboard (Docker, Services, Files, Terminal) |
| [`apps/guardian/`](apps/guardian/) | [home-lab-guardian](https://github.com/braeuningsamuel-cmyk/home-lab-guardian) | TanStack Start web app for security monitoring + intrusion detection |
| [`profile/`](profile/) | [braeuningsamuel-cmyk](https://github.com/braeuningsamuel-cmyk/braeuningsamuel-cmyk) | Profile README and meta documentation |
| [`docs/security/`](docs/security/) | — | Cross-cutting security notes and hardening guides |

> Each project remains an independent GitHub repository with its own CI, issues, and release cadence. This monorepo is a convenience view — **not** a place to make breaking changes.

## Quick start

Most users will not clone this repo. Instead:

```bash
# Infrastructure bootstrap
git clone https://github.com/braeuningsamuel-cmyk/bootstreep-homelab.git
cd bootstreep-homelab && sudo ./bootstrap.sh

# Desktop dashboard (release build)
git clone https://github.com/braeuningsamuel-cmyk/bootstreep-dashboard.git
cd bootstreep-dashboard && npm install && npm run tauri build

# Security guardian (dev)
git clone https://github.com/braeuningsamuel-cmyk/home-lab-guardian.git
cd home-lab-guardian && bun install && bun run dev
```

## Repository layout

```
Homelab-Base/
|-- infra/                  # bootstreep-homelab (bash, ansible, compose, agent)
|   |-- bootstrap.sh        # main bootstrap script
|   |-- compose/            # docker-compose stacks
|   |-- ansible/            # playbooks + roles
|   |-- ai-agent/           # telegram bot + server commands
|   `-- docker-compose-all.yml
|-- apps/
|   |-- dashboard/          # bootstreep-dashboard (Tauri)
|   `-- guardian/           # home-lab-guardian (TanStack Start)
|-- profile/                # braeuningsamuel-cmyk (profile README)
|-- docs/
|   `-- security/           # cross-project security notes
|-- Makefile                # repo-wide convenience targets
|-- ARCHITECTURE.md         # how the four repos fit together
|-- SECURITY.md             # disclosure + threat model
`-- .env.example            # shared environment variable template
```

## Working with this repo

This first monorepo import preserves each project in place. Use the README and package files inside each subdirectory for project-specific setup and run commands:

| Subdir | Setup entry point |
|--------|-------------------|
| `infra/` | [`infra/README.md`](infra/README.md) and `bootstrap.sh` |
| `apps/dashboard/` | [`apps/dashboard/README.md`](apps/dashboard/README.md) and `package.json` |
| `apps/guardian/` | `apps/guardian/package.json` (Bun + Vite) |
| `profile/` | [`profile/README.md`](profile/README.md) |

The root repo intentionally does not rewire build systems yet. Shared automation can be added after the imported projects are verified in their new paths.

### Root `Makefile` targets

```bash
make help        # list available targets
make lint        # run linters (shellcheck + yamllint, if installed)
make test        # run BATS tests
make secrets     # scan for hardcoded secrets
make validate    # run all validation (lint + secrets)
```

## Quality bar

Each subdirectory meets the Bootstreep quality bar where applicable:

- ✅ `Makefile` (root) — orchestrator targets
- ✅ `ARCHITECTURE.md` (root) — how the four repos fit together
- ✅ `.env.example` (root) — shared variable template
- ✅ Root `.github/workflows/ci.yml` — monorepo validation (structure + YAML/JSON + secrets)
- ✅ Security hardening across all Dockerfiles (no-new-privileges, cap_drop ALL, pids_limit 256)

## Security

Read [`SECURITY.md`](SECURITY.md) before making public changes. Do not commit secrets, local environment files, private keys, tokens, database snapshots, or generated dependency/build artifacts.

To report a vulnerability privately, open a security advisory at <https://github.com/braeuningsamuel-cmyk/bootstreep-homelab/security/advisories>.

## License

[MIT](LICENSE) — Copyright (c) 2026 Samuel / Bootstreep