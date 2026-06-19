export type Status = "online" | "warning" | "offline";

export interface Host {
  id: string;
  name: string;
  hostname: string;
  os: string;
  ip: string;
  status: Status;
  uptimeSeconds: number;
  cpu: { usage: number; cores: number; model: string };
  memory: { usedGb: number; totalGb: number };
  disk: { usedGb: number; totalGb: number };
  network: { rxMbps: number; txMbps: number };
  loadAvg: [number, number, number];
}

export interface Container {
  id: string;
  name: string;
  image: string;
  host: string;
  status: "running" | "stopped" | "restarting" | "error";
  cpu: number;
  memMb: number;
  ports: string[];
  uptimeSeconds: number;
}

export interface Service {
  id: string;
  name: string;
  category: "Media" | "Storage" | "Network" | "Automation" | "Development" | "Monitoring";
  url: string;
  icon: string;
  status: Status;
  description: string;
}

export interface NetworkDevice {
  id: string;
  name: string;
  ip: string;
  mac: string;
  type: "Router" | "Switch" | "AP" | "Server" | "IoT" | "Client";
  status: Status;
  latencyMs: number | null;
  lastSeen: string;
}
