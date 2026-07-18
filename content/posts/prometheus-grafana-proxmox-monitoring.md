---
title: "Prometheus + Grafana on Proxmox: Monitoring Stack Setup"
description: "Complete monitoring stack with Prometheus and Grafana on Proxmox. Metrics, dashboards, alerts for homelab."
date: "2026-05-15"
tags: ["Prometheus", "Grafana", "Monitoring", "Proxmox"]
author: "neuralcodelab"
readTime: "12 min read"
---

# Prometheus + Grafana on Proxmox: Monitoring Stack Setup

**Last updated:** May 15, 2026 | **Reading time:** 12 minutes

---

## Why Monitor Your Homelab?

"You can't improve what you don't measure."

Monitoring helps you:
- Detect issues before they become outages
- Understand resource usage patterns
- Plan capacity upgrades
- Debug performance problems

---

## Architecture

```
┌─────────────┐
│  Proxmox    │
│  Host       │
└──────┬──────┘
       │ node-exporter
       ▼
┌─────────────┐
│  Prometheus │◄── Scrape metrics
└──────┬──────┘
       │ Query
       ▼
┌─────────────┐
│   Grafana   │◄── Dashboards
└─────────────┘
```

---

## Step 1: Deploy Stack (Docker Compose)

```yaml
version: '3'
services:
  prometheus:
    image: prom/prometheus:v2.52.0
    container_name: prometheus
    restart: unless-stopped
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus-data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'

  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    restart: unless-stopped
    ports:
      - "3000:3000"
    volumes:
      - grafana-data:/var/lib/grafana
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin123

  node-exporter:
    image: prom/node-exporter:latest
    container_name: node-exporter
    restart: unless-stopped
    ports:
      - "9100:9100"
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    command:
      - '--path.procfs=/host/proc'
      - '--path.sysfs=/host/sys'

volumes:
  prometheus-data:
  grafana-data:
```

---

## Step 2: Prometheus Config

```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']

  - job_name: 'proxmox'
    static_configs:
      - targets: ['192.168.1.100:9200']  # Proxmox exporter
```

---

## Step 3: Grafana Dashboards

Import these dashboard IDs:
- **1860** - Node Exporter Full
- **10777** - Proxmox VE
- **2** - System Metrics

Access: `http://your-ip:3000`
Login: `admin` / `admin123`

---

## Step 4: Alerts

```yaml
# alerting.yml
groups:
  - name: homelab-alerts
    rules:
      - alert: HighCPU
        expr: 100 - (avg by(instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
        for: 5m
        annotations:
          summary: "High CPU on {{ $labels.instance }}"

      - alert: HighMemory
        expr: (1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100 > 85
        for: 5m
        annotations:
          summary: "High memory on {{ $labels.instance }}"
```

---

## Proxmox-Specific Metrics

Install `pve-exporter` on Proxmox host:

```bash
pip3 install prometheus-pve-exporter
```

Then scrape `https://proxmox-ip:9200/pve`.

---

*Monitoring is infrastructure insurance. Set it up day one.*
