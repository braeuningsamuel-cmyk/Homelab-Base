# Security Policy

## Reporting

Do not open public issues or discussions for secrets, vulnerabilities, exposed tokens, private hostnames, private IP maps, credentials, or exploit details.

Use a private channel with the repository owner for sensitive reports.

## Token Hygiene

- Never paste tokens, API keys, passwords, cookies, SSH keys, or recovery codes into chat, commits, issues, pull requests, or logs.
- Revoke any token that has been exposed before using it again.
- Prefer short-lived tokens with the minimum required scopes.
- Keep local credentials in the OS credential manager, GitHub CLI auth store, or ignored environment files.

## Required Checks Before Public Push

Before pushing public changes:

1. Run a secret scan over the final tree.
2. Review `git status --short` and `git diff --cached --stat`.
3. Confirm no `.env*`, private keys, token dumps, local databases, or generated dependency/build folders are staged.
4. Rotate or revoke any credential that appears in the working tree or terminal output.
