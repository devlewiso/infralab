---
title: "Proxmox Homelab Setup 2026: Complete Beginner Guide"
description: "Step-by-step guide to setting up a production-grade Proxmox homelab. Hardware recommendations, network configuration, and your first LXC containers."
date: "2026-07-17"
updated: "2026-07-17"
tags: ["Proxmox", "Beginner", "Tutorial", "Homelab", "Self-Hosting"]
author: "neuralcodelab"
readTime: "12 min read"
---

# Proxmox Homelab Setup 2026: Complete Beginner Guide

**Last updated:** July 17, 2026 | **Reading time:** 12 minutes

---

## Introduction: Why Self-Hosting Still Matters in 2026

Cloud services are convenient, but they come with recurring costs, vendor lock-in, and limited control. A home lab running **Proxmox VE** gives you the opposite: full ownership of your infrastructure, zero monthly fees beyond electricity, and the freedom to experiment without worrying about billing surprises.

This guide walks you through setting up a production-grade Proxmox homelab from scratch. We'll cover hardware selection, installation, networking, storage, and your first containers. By the end, you'll have a functional infrastructure capable of running 10+ services simultaneously.

> **This is not theoretical.** The infrastructure documented here runs 13 production services across 4 orchestrated boot layers, with 99.9% uptime targets and sub-5-minute MTTR. Every recommendation comes from real operational experience.

---

## Table of Contents

1. [Hardware Requirements](#hardware-requirements)
2. [Installing Proxmox VE](#installing-proxmox-ve)
3. [Initial Configuration](#initial-configuration)
4. [Network Setup](#network-setup)
5. [Storage Configuration](#storage-configuration)
6. [Your First LXC Container](#your-first-lxc-container)
7. [Your First Virtual Machine](#your-first-virtual-machine)
8. [Next Steps](#next-steps)

---

## Hardware Requirements

You don't need enterprise-grade servers to start. Here's what actually matters:

### Minimum Specs (Getting Started)

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| CPU | 4 cores | 8+ cores (AMD Ryzen 5/7 or Intel i5/i7 12th gen+) |
| RAM | 16 GB | 32-64 GB DDR4/DDR5 |
| Storage | 256 GB SSD | 1 TB NVMe + HDD for bulk storage |
| Network | 1 GbE | 2.5 GbE or 10 GbE (optional) |
| PSU | 300W | 500W+ 80+ Bronze |

### Hardware Options by Budget

#### Option 1: Budget Build (~$200-300)

- **CPU:** AMD Ryzen 5 5600G (6 cores, 12 threads) - $120
- **Motherboard:** B550M micro-ATX - $80
- **RAM:** 32 GB DDR4-3200 (2x16GB) - $50
- **Storage:** 500 GB NVMe SSD - $40
- **Case + PSU:** Basic micro-ATX kit - $60

**Total:** ~$350 | **Power draw:** ~40W idle

#### Option 2: Mini PC (Best Value)

Refurbished enterprise mini PCs offer incredible value:

- **Lenovo ThinkCentre M720q** - $150-200 (refurbished)
- **Dell OptiPlex 7060 Micro** - $180-250 (refurbished)
- **HP ProDesk 600 G4 Mini** - $160-220 (refurbished)

Look for:
- Intel i5-8500T or better (8th gen+)
- 16-32 GB RAM (upgradeable)
- 256 GB+ SSD (add your own NVMe)

**Total:** ~$200-300 | **Power draw:** 10-15W idle

#### Option 3: Enthusiast Build (~$600-1000)

- **CPU:** AMD Ryzen 7 7700 or Intel i7-13700 - $300-350
- **Motherboard:** B650 or Z790 with 2.5 GbE - $150-200
- **RAM:** 64 GB DDR5-5600 - $120
- **Storage:** 2 TB NVMe Gen4 + 4 TB HDD - $200
- **Case:** Fractal Design Node 804 - $100
- **PSU:** 650W 80+ Gold - $80

**Total:** ~$850-950 | **Power draw:** 50-70W idle

### Key Considerations

**Power Efficiency:** A homelab runs 24/7. A 50W system at $0.12/kWh costs ~$52/year in electricity. A 15W mini PC costs ~$16/year. The mini PC pays for itself in 3 years.

**RAM is King:** Proxmox itself uses ~2 GB. Every container needs 512 MB-2 GB. Every VM needs 2-8 GB minimum. 32 GB is the sweet spot for beginners.

**Storage Speed:** NVMe makes a noticeable difference for VM responsiveness. Use SATA SSDs or HDDs for bulk storage (backups, media files).

---

## Installing Proxmox VE

### Step 1: Download the ISO

Download Proxmox VE from the official site:

```
https://pve.proxmox.com/wiki/Downloads
```

Get the latest stable version (currently 8.x). **Do not** use the no-subscription repository for production—stick with stable.

### Step 2: Create Bootable USB

**On Linux:**
```bash
# Identify your USB device (BE CAREFUL - this erases everything)
lsblk

# Write ISO to USB (replace /dev/sdX with your USB device)
sudo dd if=proxmox-ve_8.x-1.iso of=/dev/sdX bs=4M status=progress conv=fsync
```

**On Windows:**
Use [Rufus](https://rufus.ie/) in DD Image mode (not ISO mode).

**On macOS:**
```bash
# Convert ISO to IMG
hdiutil convert proxmox-ve_8.x-1.iso -format UDRW -o proxmox.img

# Write to USB (replace /dev/diskN with your USB device)
sudo dd if=proxmox.img of=/dev/rdiskN bs=1m
```

### Step 3: Boot and Install

1. Insert USB and boot your hardware
2. Enter BIOS/UEFI (usually F2, F12, or Del during boot)
3. Enable virtualization: **Intel VT-x** or **AMD-V**
4. Disable Secure Boot (Proxmox doesn't support it)
5. Set USB as first boot device
6. Save and exit

The Proxmox installer will load. Follow these steps:

1. **Select "Install Proxmox VE"** from the menu
2. **Accept the EULA**
3. **Select Target Disk** - Choose your SSD/NVMe
4. **Configure Locale** - Usually en_US.UTF-8, US keyboard
5. **Set Password** - This is the root password. Make it strong.
6. **Configure Network:**
   - **Hostname:** `pve.yourdomain.local` (or just `pve` for local)
   - **IP Address:** Static IP (e.g., `192.168.1.100`)
   - **Gateway:** Your router IP (e.g., `192.168.1.1`)
   - **DNS:** Use your router or public DNS (e.g., `1.1.1.1`, `8.8.8.8`)

7. **Confirm and Install**

Installation takes 5-10 minutes. When complete, you'll see:

```
Installation finished successfully.
Please reboot to start Proxmox VE.
```

Remove the USB and reboot.

---

## Initial Configuration

### Access the Web Interface

After reboot, access Proxmox from another computer:

```
https://192.168.1.100:8006
```

You'll see a certificate warning—this is normal. Add an exception and proceed.

**Login:**
- Username: `root`
- Password: (what you set during installation)
- Realm: Linux PAM standard authentication

### Remove the Enterprise Repository

By default, Proxmox enables the enterprise repository (requires paid subscription). For homelab use, switch to the no-subscription repository:

```bash
# SSH into your Proxmox host or use the Shell in the web UI
nano /etc/apt/sources.list.d/pve-enterprise.list
```

Comment out the enterprise repo:
```
# deb https://enterprise.proxmox.com/debian/pve bookworm pve-enterprise
```

Add the no-subscription repo:
```bash
nano /etc/apt/sources.list
```

Add this line:
```
deb http://download.proxmox.com/debian/pve bookworm pve-no-subscription
```

Update package lists:
```bash
apt update && apt dist-upgrade -y
```

### Install Essential Tools

```bash
apt install -y vim htop iftop iotop tmux
```

---

## Network Setup

### Understanding Proxmox Networking

Proxmox uses Linux bridges to connect VMs and containers to your physical network. The default bridge is `vmbr0`.

**Default Configuration:**
```
vmbr0 (Bridge)
  ├── Physical NIC (eno1, eth0, etc.)
  ├── VMs/Containers
  └── Proxmox Host
```

### Configure Multiple Network Interfaces (Optional)

If you have multiple NICs, you can separate traffic:

**vmbr0** - Management and general traffic
**vmbr1** - VM/Container traffic
**vmbr2** - Storage/Backup traffic

Edit network configuration:
```bash
nano /etc/network/interfaces
```

Example with 2 NICs:
```
auto lo
iface lo inet loopback

auto eno1
iface eno1 inet manual

auto vmbr0
iface vmbr0 inet static
    address 192.168.1.100/24
    gateway 192.168.1.1
    bridge-ports eno1
    bridge-stp off
    bridge-fd 0

auto eno2
iface eno2 inet manual

auto vmbr1
iface vmbr1 inet static
    address 10.0.0.1/24
    bridge-ports eno2
    bridge-stp off
    bridge-fd 0
    post-up echo 1 > /proc/sys/net/ipv4/ip_forward
    post-up iptables -t nat -A POSTROUTING -s '10.0.0.0/24' -o vmbr0 -j MASQUERADE
    post-down iptables -t nat -D POSTROUTING -s '10.0.0.0/24' -o vmbr0 -j MASQUERADE
```

This creates a NAT network on vmbr1 for isolated VMs.

### VLAN Configuration (Advanced)

For network segmentation (recommended for production):

```
auto vmbr0
iface vmbr0 inet static
    address 192.168.1.100/24
    gateway 192.168.1.1
    bridge-ports eno1
    bridge-stp off
    bridge-fd 0
    bridge-vlan-raw-device eno1

auto vmbr0.10
iface vmbr0.10 inet manual
    vlan-raw-device vmbr0
    vlan-id 10

auto vmbr0.20
iface vmbr0.20 inet manual
    vlan-raw-device vmbr0
    vlan-id 20
```

---

## Storage Configuration

### Understanding Proxmox Storage

Proxmox supports multiple storage types:

| Type | Use Case | Performance |
|------|----------|-------------|
| **Directory** | General purpose, ISOs, backups | Good |
| **LVM-Thin** | VM disks, snapshots | Excellent |
| **ZFS** | Data integrity, compression, snapshots | Best (uses more RAM) |
| **NFS/CIFS** | Network storage, backups | Depends on network |

### Default Storage Setup

After installation, you have:
- **local** - Directory storage (ISOs, templates, backups)
- **local-lvm** - LVM-Thin for VM disks

### Adding ZFS (Recommended for Advanced Users)

ZFS provides data integrity, compression, and snapshots. **Requires 8 GB+ RAM.**

```bash
# Install ZFS
apt install -y proxmox-ve zfsutils-linux

# Create a ZFS pool (replace sdX with your disks)
zpool create -o ashift=12 tank mirror /dev/sda /dev/sdb

# Add to Proxmox
pvesm add zfspool tank -sparse 1
```

### Adding Network Storage (NFS)

For backups or shared storage:

```bash
# Install NFS client
apt install -y nfs-common

# Create mount point
mkdir -p /mnt/nfs-backup

# Add to fstab
echo "192.168.1.50:/volume1/backups /mnt/nfs-backup nfs defaults 0 0" >> /etc/fstab

# Mount
mount -a

# Add to Proxmox
pvesm add nfs backup --path /mnt/nfs-backup --server 192.168.1.50 --export /volume1/backups
```

---

## Your First LXC Container

LXC containers are lightweight (share the host kernel) and boot in seconds.

### Create an LXC Container

1. Click **Create CT** in the web UI
2. **General:**
   - CT ID: 100 (auto-increments)
   - Hostname: `web-server`
   - Password: (set a strong password)

3. **Template:**
   - Click **Download** if no templates exist
   - Download Ubuntu 24.04 or Debian 12
   - Select the template

4. **Disk:**
   - Size: 8-16 GB (containers use less space)
   - Storage: local-lvm

5. **CPU:**
   - Cores: 2
   - CPU Type: Host (best performance)

6. **Memory:**
   - Memory: 1024 MB
   - Swap: 512 MB

7. **Network:**
   - Bridge: vmbr0
   - IP: Static (e.g., 192.168.1.101) or DHCP

8. **Confirm and Create**

### Start and Access the Container

```bash
# Start from web UI or CLI
pct start 100

# Console access
pct enter 100

# Or SSH
ssh root@192.168.1.101
```

### Install Services in the Container

```bash
# Update
apt update && apt upgrade -y

# Install Docker (example)
curl -fsSL https://get.docker.com | sh

# Install a service
docker run -d --name nginx -p 80:80 nginx
```

---

## Your First Virtual Machine

VMs provide full isolation with their own kernel.

### Create a VM

1. Click **Create VM** in the web UI
2. **General:**
   - VM ID: 100
   - Name: `ubuntu-server`

3. **OS:**
   - Upload an ISO (Ubuntu Server, Debian, etc.)
   - Or use an existing ISO from storage

4. **System:**
   - QEMU Agent: ✓ (for better integration)
   - Disk: VirtIO SCSI
   - SCSI Controller: VirtIO SCSI single

5. **Disk:**
   - Size: 32-64 GB
   - Storage: local-lvm
   - Discard: ✓ (for SSDs)

6. **CPU:**
   - Cores: 2-4
   - Type: Host

7. **Memory:**
   - Memory: 2048-4096 MB
   - Ballooning: ✓ (optional)

8. **Network:**
   - Bridge: vmbr0
   - Model: VirtIO (best performance)

9. **Confirm and Create**

### Install the OS

1. Select the VM and click **Start**
2. Click **Console** to see the installation
3. Follow the OS installer
4. After installation, install QEMU guest agent:

```bash
# Ubuntu/Debian
apt install -y qemu-guest-agent

# Enable the agent
systemctl enable qemu-guest-agent
systemctl start qemu-guest-agent
```

---

## Next Steps

### Essential Services to Deploy

Now that you have a working Proxmox setup, here are services worth running:

**Infrastructure:**
- **Pi-hole** or **AdGuard Home** - Network-wide ad blocking
- **Cloudflare Tunnel** - Secure remote access without port forwarding
- **Nginx Proxy Manager** - Reverse proxy with SSL
- **Gitea** or **GitLab** - Self-hosted Git

**Monitoring:**
- **Prometheus + Grafana** - Metrics and dashboards
- **Uptime Kuma** - Service monitoring
- **Loki** - Log aggregation

**Productivity:**
- **Nextcloud** - File sync and sharing
- **Vaultwarden** - Password manager (Bitwarden-compatible)
- **Jellyfin** or **Plex** - Media server

**Development:**
- **Gitea** - Git server
- **Drone CI** or **Gitea Actions** - CI/CD
- **Registry** - Docker registry

### Backup Strategy

**Never skip backups.** Proxmox has built-in backup:

1. Go to **Datacenter → Backup**
2. Click **Add**
3. Configure:
   - Storage: Your backup storage (NFS, ZFS, etc.)
   - Schedule: Daily at 2 AM
   - Mode: Snapshot (for running VMs)
   - Compression: ZSTD (best balance)

### Learning Resources

- [Proxmox Wiki](https://pve.proxmox.com/wiki/Main_Page) - Official documentation
- [r/Proxmox](https://reddit.com/r/Proxmox) - Community support
- [r/Homelab](https://reddit.com/r/Homelab) - Inspiration and ideas
- [Self-Hosted Show](https://selfhosted.show) - Podcast about self-hosting

---

## Conclusion

You now have a production-grade Proxmox homelab capable of running dozens of services. The key takeaways:

1. **Start small** - A mini PC with 32 GB RAM is enough for most use cases
2. **Use LXC for simple services** - They're lighter and faster
3. **Use VMs for isolation** - When you need a different kernel or full isolation
4. **Backup everything** - Automate backups from day one
5. **Document your setup** - Future you will thank present you

The infrastructure documented here runs 13 services across 4 orchestrated boot layers with 99.9% uptime. It's not about having the most powerful hardware—it's about thoughtful architecture and operational discipline.

**What will you build first?**

---

*Found this guide helpful? Share it or leave a comment. Questions? Drop them below.*
