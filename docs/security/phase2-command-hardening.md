### Phase 2 Implementation: Command and File Access Hardening

Date: 2026-06-19
Status: IMPLEMENTED

Implemented in bootstreep-homelab:
- ai-agent/server_commands.py now uses named allowlists for local and remote commands.
- Arbitrary SSH command execution was removed; remote calls must use approved command names.
- SSH key paths are canonicalized and restricted to ~/.ssh.
- Docker actions are restricted to ps, up, down, restart, and logs.
- Container names are validated before Docker actions are executed.
- ai-agent/telegram-bot.py now validates command arguments, script paths, container names, and compose paths.
- Telegram script execution is restricted to approved scripts under ~/scripts and ~/ai-agent.
- AMP no longer mounts /var/run/docker.sock in compose/amp.yml or docker-compose-all.yml.

Remaining documented exceptions:
- Nextcloud AIO keeps read-only docker.sock access because the AIO image requires Docker orchestration.
- Watchtower keeps read-only docker.sock access for update orchestration.
- Promtail uses docker.sock metadata for log discovery.

Verification:
- python -m py_compile ai-agent/server_commands.py ai-agent/telegram-bot.py
- rg -n "docker\\.sock|cap_drop: \\[\\]" compose docker-compose-all.yml