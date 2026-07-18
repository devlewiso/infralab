---
title: "Proxmox Backup Server: Complete Guide for Homelabs"
description: "Set up Proxmox Backup Server for automated VM/container backups. Deduplication, encryption, remote replication."
date: "2026-06-15"
tags: ["Proxmox", "Backup", "PBS", "Disaster Recovery"]
author: "neuralcodelab"
readTime: "10 min read"
---

# Proxmox Backup Server: Complete Guide for Homelabs

**Last updated:** June 15, 2026 | **Reading time:** 10 minutes

---

## Why PBS Over Standard Backups?

Proxmox Backup Server (PBS) offers:

- **Deduplication** - Save 60-80% storage
- **Incremental** - Only changed blocks
- **Encryption** - AES-256 at rest
- **Remote replication** - Offsite copies
- **Web UI** - Easy management

---

## Installation

### On Dedicated Hardware

```bash
# Download ISO
wget https://download.proxmox.com/iso/proxmox-backup-server_3.2-1.iso

# Flash to USB and boot
# Follow installer (similar to Proxmox VE)
```

### As LXC Container (Test Only)

```bash
# Not recommended for production
# Use VM or bare metal instead
```

---

## Initial Setup

1. Access `https://pbs-ip:8007`
2. Create admin password
3. Set up storage (ZFS recommended)
4. Add backup user

---

## Configure Proxmox VE → PBS

```bash
# In Proxmox web UI
# Datacenter → Storage → Add → Proxmox Backup Server

ID: pbs-main
Server: 192.168.1.50:8007
Datastore: main
Username: root@pam
Password: ********
```

---

## Backup Schedule

```bash
# Daily at 2 AM
0 2 * * *

# Weekly on Sunday at 3 AM
0 3 * * 0
```

---

## Retention Policies

| Policy | Keep |
|--------|------|
| Last daily | 7 backups |
| Last weekly | 4 backups |
| Last monthly | 12 backups |

---

## Remote Replication

```bash
# Sync to offsite location
pbs-client sync job add \
  --remote datastore offsite \
  --schedule '0 4 * * *'
```

**3-2-1 rule:** 3 copies, 2 media types, 1 offsite.

---

## Restore Testing

Test restores quarterly. A backup you haven't tested isn't a backup.
