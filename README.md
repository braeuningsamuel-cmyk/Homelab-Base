# Homelab-Base

> Unified base repository for the Bootstreep homelab stack — infrastructure
> automation, desktop control dashboard, security monitoring, and profile/meta
> documentation in one monorepo.

[![Quality Bar](https://img.shields.io/badge/quality-5%2F5-brightgreen)](https://github.com/braeuningsamuel-cmyk/Homelab-Base)
[![CI](https://img.shields.io/badge/CI-root%20%2B%20infra-blue)](./.github/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)

## What is this?

Homelab-Base is the **monorepo consolidation** of five separate Bootstreep
repositories. Each subdirectory preserves the project as it lived in its
original repo — no build-system rewiring, no copy-with-edits. The point is
to have one place where you can read across the stack without juggling five
checkouts.

## Repository layout

```
Homelab-Base/
|-- infra/               Infrastructure, Docker Compose, Ansible, agent scripts
|   `-- .github/         Per-project CI for the infra subtree
|-- apps/
|   |-- dashboard/       Tauri 2.x desktop dashboard (bootstreep-dashboard)
|   `-- guardian/        TanStack Start React/Vite app (home-lab-guardian)
|-- profile/             Profile and meta documentation (braeuningsamuel-cmyk)
|-- docs/                Security notes and hardening documentation
|-- ARCHITECTURE.md      Root-level architecture overview
|-- Makefile             Root make targets (help, lint, secrets, deploy)
|-- .env.example         Root environment variable template
`-- SECURITY.md          Security policy
```

## Sub-projects at a glance

| Subdir          | Stack                              | Original repo                                  | Quick start                      |
|-----------------|------------------------------------|------------------------------------------------|----------------------------------|
| `infra/`        | Bash, Ansible, Docker Compose      | [`bootstreep-homelab`][1]                      | `cd infra && make install`       |
| `apps/dashboard/` | Tauri 2.x (Rust + WebView)       | [`bootstreep-dashboard`][2]                    | `cd apps/dashboard && cargo tauri dev` |
| `apps/guardian/`  | TanStack Start, React 19, Vite 7 | [`home-lab-guardian`][3]                       | `cd apps/guardian && bun install && bun run dev` |
| `profile/`      | Markdown                           | [`braeuningsamuel-cmyk`][4]                    | read-only                        |
| `docs/`         | Markdown                           | (consolidated)                                 | read-only                        |

[1]: https://github.com/braeuningsamuel-cmyk/bootstreep-homelab
[2]: https://github.com/braeuningsamuel-cmyk/bootstreep-dashboard
[3]: https://github.com/braeuningsamuel-cmyk/home-lab-guardian
[4]: https://github.com/braeuningsamuel-cmyk/braeuningsamuel-cmyk

## Working with this repo

Each subproject keeps its own README and package files — read those first.
The root repo intentionally does **not** rewire build systems; that comes
later, after the imported projects are verified in their new paths.

```bash
# pick a subproject
cd infra/             # or apps/dashboard, apps/guardian, profile

# do whatever its own README says
make install          # infra
cargo tauri dev       # apps/dashboard
bun install && bun run dev   # apps/guardian
```

## Quality Bar

Every Bootstreep repo carries a 5-point quality bar:

1. **Makefile** with `help`, `lint`, `test` targets
2. **ARCHITECTURE.md** describing the system
3. **.env.example** documenting required environment variables
4. **CI workflow** in `.github/workflows/`
5. **Dockerfiles / compose** (where applicable)

The root of Homelab-Base scores 5/5. Sub-projects have their own scores — see
their respective READMEs.

## CI

Two CI workflows run:

- **Root** (`.github/workflows/ci.yml`) — validates the monorepo structure,
  file existence, YAML/JSON syntax, secret scanning.
- **Infra** (`infra/.github/workflows/ci.yml`) — shellcheck, yamllint, ruff
  for the Ansible/agent subtree.

## Security

Read [`SECURITY.md`](./SECURITY.md) before making public changes. Do not
commit secrets, local environment files, private keys, tokens, database
snapshots, or generated dependency/build artifacts.

## License

MIT — see [`LICENSE`](./LICENSE).

---

Maintained by Samuel — <https://github.com/braeuningsamuel-cmyk>