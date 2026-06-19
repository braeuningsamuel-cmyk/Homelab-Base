<p align="center">
  <img src="https://img.shields.io/badge/status-building-6C5CE7?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/focus-homelab-00B894?style=for-the-badge" alt="Focus">
  <img src="https://img.shields.io/badge/location-germany-F09D51?style=for-the-badge" alt="Location">
</p>

<h1 align="center">Samuel</h1>

<p align="center">
  <b>Homelab-Enthusiast · KI-Automation · Privacy-First</b>
  <br>
  <i>» Building enterprise-inspired infrastructure, one container at a time «</i>
</p>

<p align="center">
  <code>sudo rm -rf / && echo "just kidding"</code>
</p>

<br>

---

## About Me

<table>
<tr>
<td width="60%">

- 🔧 Baue **self-hosted Infrastructure** mit Docker, Ansible, ZFS
- 🤖 Entwickle **KI-Agenten** für Telegram (Server-Steuerung, tägliche Briefings)
- 🏠 Betreibe ein **30+ Service Homelab** auf Enterprise-Niveau
- 🚀 Creator von **Bootstreep** — Privacy-First Homelab in einem Befehl
- 🇩🇪 Deutschland

</td>
<td width="40%" align="center">

**Current Status**

```
🟢 Homelab:    v4.2.0 LIVE
🤖 KI-Agent:   LiteLLM Gateway + 14 CMDs
📊 Monitoring: Grafana + Prometheus + Loki
🔐 Security:   CrowdSec + Authentik + WAF
💾 Backup:    GPG-verschlüsselt + ZFS Snapshots
```

</td>
</tr>
</table>

---

## Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/Shell-12100E?style=for-the-badge&logo=gnubash&logoColor=white" alt="Shell">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
  <img src="https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white" alt="Rust">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tauri-24C8DB?style=for-the-badge&logo=tauri&logoColor=white" alt="Tauri">
  <img src="https://img.shields.io/badge/Ansible-EE0000?style=for-the-badge&logo=ansible&logoColor=white" alt="Ansible">
  <img src="https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black" alt="Linux">
  <img src="https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white" alt="Grafana">
  <img src="https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white" alt="Prometheus">
  <img src="https://img.shields.io/badge/Tailscale-242424?style=for-the-badge&logo=tailscale&logoColor=white" alt="Tailscale">
  <img src="https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white" alt="Ubuntu">
  <img src="https://img.shields.io/badge/ZFS-2A6670?style=for-the-badge&logo=linux&logoColor=white" alt="ZFS">
</p>

---

## Featured Projects

<table>
<tr>
<td width="50%" valign="top">

### ⚡ Bootstreep Homelab
*Enterprise Homelab · Ein-Klick-Bootstrap · v4.2*

- **30+ gehärtete Docker-Services** — Pi-hole, Nextcloud, Jellyfin, Vaultwarden, MinIO
- **Lokale KI** — Ollama via LiteLLM-Gateway, ChromaDB RAG, Open WebUI
- **Monitoring** — Grafana 11, Prometheus, Loki, cAdvisor, Node Exporter
- **Security** — CrowdSec WAF, Authentik SSO, Netzwerk-Isolation, UFW, Fail2Ban
- **DevSecOps CI** — 8 CI-Jobs, Gitleaks, Trivy, Pinned Tags, Env-Check
- **Backup & DR** — GPG-verschlüsselt, ZFS Snapshots, 8 DR-Szenarien

`Shell` `Docker` `Ansible` `Python` `Grafana` `CrowdSec`

[![Read More](https://img.shields.io/badge/View-Repo-6C5CE7?style=flat-square)](https://github.com/braeuningsamuel-cmyk/bootstreep-homelab)

</td>
<td width="50%" valign="top">

### 🖥️ Bootstreep Dashboard
*Desktop-App für Homelab-Control (Tauri)*

- Tauri 2.x (Rust + Vanilla JS) — nativ, schnell, klein
- Docker-Container-Management + System-Monitoring
- Port-Checker, Terminal, File-Manager
- Verbindung zu authentifizierten Endpoints

`TypeScript` `Rust` `Tauri` `Docker`

[![Read More](https://img.shields.io/badge/View-Repo-6C5CE7?style=flat-square)](https://github.com/braeuningsamuel-cmyk/bootstreep-dashboard)

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 🤖 Telegram AI-Agent
*Server-Steuerung per Chat · Lokale KI*

- 14 Befehle (`/status`, `/restart`, `/ask`, `/briefing`, ...)
- LiteLLM-Gateway (OpenAI-kompatibel, kein Cloud-API-Key nötig)
- Tägliche Briefings (Wetter, News, Aktien, E-Mail)
- Command-Whitelist, `shell=False`, Authenticated-only

`Python` `Telegram` `LiteLLM` `Ollama`

[![Read More](https://img.shields.io/badge/View-Repo-6C5CE7?style=flat-square)](https://github.com/braeuningsamuel-cmyk/bootstreep-homelab/tree/main/ai-agent)

</td>
<td width="50%" valign="top">

### 🛡️ Home Lab Guardian
*Security-Monitoring + Intrusion Detection*

- Anomalie-Erkennung in Logs und Metriken
- Automatische Alerting-Pipelines
- Integration mit CrowdSec und Grafana
- Privacy-First: komplett lokal, keine Telemetrie

`Docker` `Python` `Security` `Grafana`

[![Read More](https://img.shields.io/badge/View-Repo-6C5CE7?style=flat-square)](https://github.com/braeuningsamuel-cmyk/home-lab-guardian)

</td>
</tr>
</table>

### 📦 Weitere Repos

| Repo | Beschreibung |
|------|-------------|
| [home-lab-guardian](https://github.com/braeuningsamuel-cmyk/home-lab-guardian) | Security-Monitoring für Homelabs |
| [bootstreep-dashboard](https://github.com/braeuningsamuel-cmyk/bootstreep-dashboard) | Tauri Desktop-App |

---

## GitHub Stats

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=braeuningsamuel-cmyk&show_icons=true&theme=radical&hide_border=true&bg_color=0d1117&title_color=6C5CE7&icon_color=6C5CE7&text_color=c9d1d9&count_private=true" height="180" alt="Stats">
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=braeuningsamuel-cmyk&layout=compact&theme=radical&hide_border=true&bg_color=0d1117&title_color=6C5CE7&text_color=c9d1d9" height="180" alt="Languages">
</p>

<p align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=braeuningsamuel-cmyk&bg_color=0d1117&color=6C5CE7&line=6C5CE7&point=ffffff&area_color=6C5CE7&area=true&hide_border=true&custom_title=Activity%20Graph" width="95%" alt="Activity">
</p>

---

## Let's Connect

<p align="center">
  <a href="https://github.com/braeuningsamuel-cmyk">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="https://github.com/braeuningsamuel-cmyk/bootstreep-homelab/security/advisories">
    <img src="https://img.shields.io/badge/Report-Security-6C5CE7?style=for-the-badge&logo=security&logoColor=white" alt="Security">
  </a>
</p>

<p align="center">
  <code>🔑 PGP: 4F5E 6B8A 1C2D 3E4F 5A6B 7C8D 9E0F 1A2B 3C4D 5E6F</code>
</p>

---

<p align="center">
  <img src="https://komarev.com/ghpvc/?username=braeuningsamuel-cmyk&color=6C5CE7&style=for-the-badge&label=PROFILE+VIEWS" alt="Views">
</p>

<p align="center">
  <i>Privacy-First · Local AI · Enterprise Architecture</i>
</p>
