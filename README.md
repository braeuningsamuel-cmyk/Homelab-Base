# Homelab-Base

Homelab-Base is the unified base repository for the homelab stack: infrastructure automation, the desktop control dashboard, security monitoring, and profile/meta documentation.

## Repository Layout

- `infra/` - Infrastructure, Docker Compose, agent scripts, and hardening work from `bootstreep-homelab`.
- `apps/dashboard/` - Tauri desktop dashboard from `bootstreep-dashboard`.
- `apps/guardian/` - Guardian monitoring app from `home-lab-guardian`.
- `profile/` - Profile and meta documentation from `braeuningsamuel-cmyk`.
- `docs/security/` - Security notes and hardening documentation.

## Working With This Repo

This first monorepo import preserves each project in place. Use the README and package files inside each subdirectory for project-specific setup and run commands:

- Infrastructure: `infra/README.md`
- Dashboard: `apps/dashboard/README.md`
- Guardian: `apps/guardian/package.json`
- Profile: `profile/README.md`

The root repo intentionally does not rewire build systems yet. Shared automation can be added after the imported projects are verified in their new paths.

## Security

Read `SECURITY.md` before making public changes. Do not commit secrets, local environment files, private keys, tokens, database snapshots, or generated dependency/build artifacts.
