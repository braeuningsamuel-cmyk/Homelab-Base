// =============================================================================
// Homelab Data Source
// -----------------------------------------------------------------------------
// All data the dashboard renders goes through this module. Today it returns
// mock data so the UI is fully usable. To wire a real backend (e.g. an agent
// running on your hosts, Glances/Netdata/Proxmox API, etc.), replace the
// bodies of getHosts / getContainers / getServices / getNetworkDevices with
// `fetch(...)` calls — the rest of the app stays the same.
// =============================================================================

import type { Container, Host, NetworkDevice, Service } from "./types";

const MOCK_HOSTS: Host[] = [
  {
    id: "proxmox-01",
    name: "proxmox-01",
    hostname: "pve.lab.local",
    os: "Proxmox VE 8.2",
    ip: "10.0.0.10",
    status: "online",
    uptimeSeconds: 60 * 60 * 24 * 47 + 3600 * 5,
    cpu: { usage: 34, cores: 16, model: "AMD Ryzen 9 5950X" },
    memory: { usedGb: 42.1, totalGb: 64 },
    disk: { usedGb: 1840, totalGb: 4000 },
    network: { rxMbps: 124, txMbps: 38 },
    loadAvg: [1.42, 1.18, 0.95],
  },
  {
    id: "nas-01",
    name: "truenas",
    hostname: "nas.lab.local",
    os: "TrueNAS Scale 24.04",
    ip: "10.0.0.20",
    status: "online",
    uptimeSeconds: 60 * 60 * 24 * 112,
    cpu: { usage: 18, cores: 8, model: "Intel Xeon E-2246G" },
    memory: { usedGb: 28.5, totalGb: 32 },
    disk: { usedGb: 18400, totalGb: 32000 },
    network: { rxMbps: 220, txMbps: 410 },
    loadAvg: [0.85, 0.72, 0.61],
  },
  {
    id: "docker-01",
    name: "docker-01",
    hostname: "docker.lab.local",
    os: "Debian 12",
    ip: "10.0.0.30",
    status: "warning",
    uptimeSeconds: 60 * 60 * 24 * 8,
    cpu: { usage: 78, cores: 8, model: "Intel i7-10700" },
    memory: { usedGb: 27.4, totalGb: 32 },
    disk: { usedGb: 380, totalGb: 500 },
    network: { rxMbps: 48, txMbps: 22 },
    loadAvg: [4.21, 3.85, 3.12],
  },
  {
    id: "pi-01",
    name: "raspberry-pi",
    hostname: "pi.lab.local",
    os: "Raspberry Pi OS",
    ip: "10.0.0.40",
    status: "online",
    uptimeSeconds: 60 * 60 * 24 * 201,
    cpu: { usage: 12, cores: 4, model: "ARM Cortex-A76" },
    memory: { usedGb: 2.1, totalGb: 8 },
    disk: { usedGb: 24, totalGb: 128 },
    network: { rxMbps: 4, txMbps: 2 },
    loadAvg: [0.15, 0.12, 0.10],
  },
  {
    id: "gpu-01",
    name: "gpu-node",
    hostname: "gpu.lab.local",
    os: "Ubuntu 24.04",
    ip: "10.0.0.50",
    status: "offline",
    uptimeSeconds: 0,
    cpu: { usage: 0, cores: 24, model: "AMD Threadripper 3960X" },
    memory: { usedGb: 0, totalGb: 128 },
    disk: { usedGb: 920, totalGb: 2000 },
    network: { rxMbps: 0, txMbps: 0 },
    loadAvg: [0, 0, 0],
  },
];

const MOCK_CONTAINERS: Container[] = [
  { id: "c1", name: "plex", image: "plexinc/pms-docker:latest", host: "docker-01", status: "running", cpu: 22, memMb: 1840, ports: ["32400:32400"], uptimeSeconds: 60 * 60 * 24 * 6 },
  { id: "c2", name: "nextcloud", image: "nextcloud:29", host: "docker-01", status: "running", cpu: 8, memMb: 920, ports: ["8080:80"], uptimeSeconds: 60 * 60 * 24 * 6 },
  { id: "c3", name: "postgres", image: "postgres:16", host: "docker-01", status: "running", cpu: 4, memMb: 410, ports: ["5432:5432"], uptimeSeconds: 60 * 60 * 24 * 12 },
  { id: "c4", name: "traefik", image: "traefik:v3", host: "docker-01", status: "running", cpu: 2, memMb: 92, ports: ["80:80", "443:443"], uptimeSeconds: 60 * 60 * 24 * 30 },
  { id: "c5", name: "home-assistant", image: "homeassistant/home-assistant", host: "docker-01", status: "running", cpu: 14, memMb: 720, ports: ["8123:8123"], uptimeSeconds: 60 * 60 * 24 * 4 },
  { id: "c6", name: "grafana", image: "grafana/grafana:11", host: "docker-01", status: "running", cpu: 3, memMb: 180, ports: ["3000:3000"], uptimeSeconds: 60 * 60 * 24 * 15 },
  { id: "c7", name: "prometheus", image: "prom/prometheus", host: "docker-01", status: "running", cpu: 6, memMb: 340, ports: ["9090:9090"], uptimeSeconds: 60 * 60 * 24 * 15 },
  { id: "c8", name: "pihole", image: "pihole/pihole:latest", host: "pi-01", status: "running", cpu: 1, memMb: 120, ports: ["53:53", "80:80"], uptimeSeconds: 60 * 60 * 24 * 88 },
  { id: "c9", name: "jellyfin", image: "jellyfin/jellyfin", host: "docker-01", status: "restarting", cpu: 0, memMb: 0, ports: ["8096:8096"], uptimeSeconds: 0 },
  { id: "c10", name: "old-wordpress", image: "wordpress:5", host: "docker-01", status: "stopped", cpu: 0, memMb: 0, ports: [], uptimeSeconds: 0 },
  { id: "c11", name: "vaultwarden", image: "vaultwarden/server", host: "docker-01", status: "running", cpu: 1, memMb: 64, ports: ["8200:80"], uptimeSeconds: 60 * 60 * 24 * 42 },
  { id: "c12", name: "uptime-kuma", image: "louislam/uptime-kuma", host: "pi-01", status: "running", cpu: 2, memMb: 140, ports: ["3001:3001"], uptimeSeconds: 60 * 60 * 24 * 60 },
];

const MOCK_SERVICES: Service[] = [
  { id: "s1", name: "Plex", category: "Media", url: "http://10.0.0.30:32400", icon: "🎬", status: "online", description: "Media-Streaming für Filme & Serien" },
  { id: "s2", name: "Jellyfin", category: "Media", url: "http://10.0.0.30:8096", icon: "📺", status: "warning", description: "Open-Source Media-Server" },
  { id: "s3", name: "Nextcloud", category: "Storage", url: "http://10.0.0.30:8080", icon: "☁️", status: "online", description: "Privater Cloud-Speicher" },
  { id: "s4", name: "TrueNAS", category: "Storage", url: "http://10.0.0.20", icon: "💾", status: "online", description: "Network Attached Storage" },
  { id: "s5", name: "Pi-hole", category: "Network", url: "http://10.0.0.40", icon: "🛡️", status: "online", description: "Netzwerk-weiter Ad-Blocker" },
  { id: "s6", name: "Traefik", category: "Network", url: "http://10.0.0.30:8081", icon: "🔀", status: "online", description: "Reverse Proxy" },
  { id: "s7", name: "Home Assistant", category: "Automation", url: "http://10.0.0.30:8123", icon: "🏠", status: "online", description: "Smart-Home-Steuerung" },
  { id: "s8", name: "Proxmox", category: "Development", url: "https://10.0.0.10:8006", icon: "🖥️", status: "online", description: "Virtualisierungs-Plattform" },
  { id: "s9", name: "Vaultwarden", category: "Development", url: "http://10.0.0.30:8200", icon: "🔐", status: "online", description: "Self-hosted Password-Manager" },
  { id: "s10", name: "Grafana", category: "Monitoring", url: "http://10.0.0.30:3000", icon: "📊", status: "online", description: "Metriken & Dashboards" },
  { id: "s11", name: "Prometheus", category: "Monitoring", url: "http://10.0.0.30:9090", icon: "🔥", status: "online", description: "Metriken-Datenbank" },
  { id: "s12", name: "Uptime Kuma", category: "Monitoring", url: "http://10.0.0.40:3001", icon: "📡", status: "online", description: "Status-Monitoring" },
];

const MOCK_NETWORK: NetworkDevice[] = [
  { id: "n1", name: "UniFi Dream Machine", ip: "10.0.0.1", mac: "74:AC:B9:00:11:22", type: "Router", status: "online", latencyMs: 0.4, lastSeen: "now" },
  { id: "n2", name: "UniFi Switch 24", ip: "10.0.0.2", mac: "74:AC:B9:00:11:23", type: "Switch", status: "online", latencyMs: 0.6, lastSeen: "now" },
  { id: "n3", name: "UniFi AP U6 Pro", ip: "10.0.0.3", mac: "74:AC:B9:00:11:24", type: "AP", status: "online", latencyMs: 1.2, lastSeen: "now" },
  { id: "n4", name: "proxmox-01", ip: "10.0.0.10", mac: "AA:BB:CC:00:01:10", type: "Server", status: "online", latencyMs: 0.3, lastSeen: "now" },
  { id: "n5", name: "truenas", ip: "10.0.0.20", mac: "AA:BB:CC:00:01:20", type: "Server", status: "online", latencyMs: 0.5, lastSeen: "now" },
  { id: "n6", name: "docker-01", ip: "10.0.0.30", mac: "AA:BB:CC:00:01:30", type: "Server", status: "warning", latencyMs: 2.8, lastSeen: "now" },
  { id: "n7", name: "raspberry-pi", ip: "10.0.0.40", mac: "AA:BB:CC:00:01:40", type: "Server", status: "online", latencyMs: 1.1, lastSeen: "now" },
  { id: "n8", name: "gpu-node", ip: "10.0.0.50", mac: "AA:BB:CC:00:01:50", type: "Server", status: "offline", latencyMs: null, lastSeen: "vor 2h" },
  { id: "n9", name: "ESP32 Sensor", ip: "10.0.0.101", mac: "24:0A:C4:00:00:01", type: "IoT", status: "online", latencyMs: 8.4, lastSeen: "now" },
  { id: "n10", name: "Shelly Plug", ip: "10.0.0.102", mac: "24:0A:C4:00:00:02", type: "IoT", status: "online", latencyMs: 12.1, lastSeen: "now" },
  { id: "n11", name: "MacBook Pro", ip: "10.0.0.201", mac: "FF:EE:DD:00:00:01", type: "Client", status: "online", latencyMs: 3.2, lastSeen: "now" },
  { id: "n12", name: "iPhone", ip: "10.0.0.202", mac: "FF:EE:DD:00:00:02", type: "Client", status: "online", latencyMs: 4.8, lastSeen: "now" },
];

// Simulate slight network latency so the UI feels real.
const delay = <T,>(value: T, ms = 120): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

export async function getHosts(): Promise<Host[]> {
  // TODO: replace with `fetch("/api/agent/hosts").then(r => r.json())`
  return delay(MOCK_HOSTS);
}

export async function getContainers(): Promise<Container[]> {
  return delay(MOCK_CONTAINERS);
}

export async function getServices(): Promise<Service[]> {
  return delay(MOCK_SERVICES);
}

export async function getNetworkDevices(): Promise<NetworkDevice[]> {
  return delay(MOCK_NETWORK);
}
