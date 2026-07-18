---
title: "Home Assistant on Proxmox: Complete Setup Guide 2026"
description: "Deploy Home Assistant on Proxmox with VM or LXC. Includes Zigbee, Z-Wave, backups, and production configuration."
date: "2026-06-28"
tags: ["Home Assistant", "Proxmox", "Smart Home", "Automation"]
author: "neuralcodelab"
readTime: "15 min read"
---

# Home Assistant on Proxmox: Complete Setup Guide 2026

**Last updated:** June 28, 2026 | **Reading time:** 15 minutes

---

## Why Run Home Assistant on Proxmox?

Home Assistant is the gold standard for self-hosted home automation. Running it on Proxmox gives you:

- **Easy backups** - Snapshot before updates
- **Hardware passthrough** - Zigbee/Z-Wave USB sticks
- **Resource efficiency** - Share host resources
- **High availability** - Migrate between nodes
- **Isolation** - Separate from other services

This guide covers both VM and LXC deployment methods.

---

## Method 1: VM (Recommended)

### Prerequisites

- Proxmox VE 8.x installed
- Home Assistant OS image
- USB Zigbee/Z-Wave adapter (optional)

### Step 1: Download Home Assistant OS

```bash
# Download latest image
cd /var/lib/vz/dump
wget https://github.com/home-assistant/operating-system/releases/download/11.2/haos_ova-11.2.qcow2.xz

# Extract
unxz haos_ova-11.2.qcow2.xz
```

### Step 2: Create the VM

```bash
# Create VM with defaults
qm create 200 --name homeassistant --memory 4096 --net0 virtio,bridge=vmbr0

# Import disk
qm importdisk 200 haos_ova-11.2.qcow2 local-lvm

# Attach disk
qm set 200 --scsihw virtio-scsi-pci --scsi0 local-lvm:vm-200-disk-0

# Set boot order
qm set 200 --boot c --bootdisk scsi0

# Add serial console
qm set 200 --serial0 socket --vga serial0
```

### Step 3: USB Passthrough (Zigbee/Z-Wave)

```bash
# Find USB device
lsusb

# Example output:
# Bus 001 Device 004: ID 1a86:7523 QinHeng Electronics

# Add to VM config
qm set 200 --usb0 host=1a86:7523
```

### Step 4: Start and Access

```bash
qm start 200
```

Access Home Assistant at `http://homeassistant.local:8123`

---

## Method 2: LXC (Lightweight)

### Create Container

```bash
# Create from Ubuntu template
pct create 200 local:vztmpl/ubuntu-24.04-standard.tar.zst \
  --cores 2 \
  --memory 2048 \
  --swap 1024 \
  --rootfs local-lvm:8 \
  --net0 name=eth0,bridge=vmbr0,ip=dhcp \
  --hostname homeassistant
```

### Install Docker

```bash
pct enter 200

# Inside container
curl -fsSL https://get.docker.com | sh
```

### Run Home Assistant Container

```bash
docker run -d \
  --name homeassistant \
  --privileged \
  --restart=unless-stopped \
  -e TZ=America/Guatemala \
  -v /opt/hass/config:/config \
  --device=/dev/ttyUSB0:/dev/ttyUSB0 \
  -p 8123:8123 \
  ghcr.io/home-assistant/home-assistant:stable
```

---

## Backup Strategy

### Proxmox Backup Schedule

```bash
# Via CLI
pvesm set backup --compression zstd

# Create backup job
pvescheduler config --backup '0 2 * * *' --storage backup-storage
```

### Home Assistant Snapshots

Configure in Home Assistant:
- **Settings** → **System** → **Backups**
- Enable automatic backups
- Set retention: 7 daily, 4 weekly, 12 monthly

---

## Production Tips

1. **Static IP** - Assign in Proxmox or router
2. **Domain** - Use DuckDNS or custom domain
3. **SSL** - Let's Encrypt via Nginx Proxy Manager
4. **External access** - Twingate or Cloudflare Tunnel
5. **UPS integration** - NUT for graceful shutdowns

---

*Home Assistant + Proxmox is a match made in homelab heaven. The backup capabilities alone make it worth it.*
