---
title: "LXC vs VM in Proxmox: When to Use Each (Real Examples)"
description: "Practical comparison of LXC containers vs VMs in Proxmox with real use cases from a production homelab running 13+ services."
date: "2026-07-05"
updated: "2026-07-05"
tags: ["Proxmox", "LXC", "VM", "Containers", "Virtualization"]
author: "neuralcodelab"
readTime: "10 min read"
---

# LXC vs VM in Proxmox: When to Use Each (Real Examples)

**Last updated:** July 5, 2026 | **Reading time:** 10 minutes

---

## Introduction: The Question Everyone Asks

"LXC or VM?" is the most common question in Proxmox communities. The answer isn't binary—it depends on your use case.

After running 13+ services across both LXC containers and VMs for over a year, I've developed clear guidelines for when to use each. This guide shares those lessons with real examples from production infrastructure.

**Quick answer:**
- **LXC** for simple, Linux-native services (web servers, databases, monitoring)
- **VM** for Windows, different kernels, or full isolation needs

Let's dive deeper.

---

## Understanding the Difference

### LXC Containers

LXC (Linux Containers) are **operating-system-level virtualization**. Containers share the host kernel but have isolated user spaces.

```
┌─────────────────────────────────────────┐
│           Proxmox Host (Linux)          │
│  ┌─────────┬─────────┬─────────┐        │
│  │  LXC 1  │  LXC 2  │  LXC 3  │        │
│  │ Ubuntu  │ Debian  │ Alpine  │        │
│  └─────────┴─────────┴─────────┘        │
└─────────────────────────────────────────┘
         ↑ All share the same kernel
```

**Characteristics:**
- Lightweight (512 MB RAM typical)
- Fast boot (< 5 seconds)
- Lower overhead (near-native performance)
- Linux-only
- Less isolation (shared kernel)

### Virtual Machines (VMs)

VMs are **hardware-level virtualization**. Each VM has its own kernel and emulated hardware.

```
┌─────────────────────────────────────────┐
│           Proxmox Host (Linux)          │
│  ┌─────────┬─────────┬─────────┐        │
│  │  VM 1   │  VM 2   │  VM 3   │        │
│  │ Ubuntu  │ Windows │ FreeBSD │        │
│  │ Kernel  │ Kernel  │ Kernel  │        │
│  └─────────┴─────────┴─────────┘        │
└─────────────────────────────────────────┘
         ↑ Each has its own kernel
```

**Characteristics:**
- Heavier (2+ GB RAM typical)
- Slower boot (30-60 seconds)
- More overhead (5-15% performance penalty)
- Any OS (Windows, BSD, Linux)
- Full isolation

---

## Resource Comparison

| Metric | LXC | VM |
|--------|-----|-----|
| **RAM (idle)** | 128-512 MB | 1-4 GB |
| **Disk (base)** | 2-4 GB | 10-30 GB |
| **Boot time** | 3-10 seconds | 30-90 seconds |
| **CPU overhead** | ~1% | 5-15% |
| **Network overhead** | Minimal | Small (virtio) |
| **Snapshot size** | ~100 MB | ~1-5 GB |
| **Backup time** | Fast | Slower |

---

## When to Use LXC

### ✅ Ideal LXC Use Cases

#### 1. Web Servers (Nginx, Apache, Caddy)

```yaml
# LXC Configuration
ctid: 122
hostname: web-lab22
ostemplate: ubuntu-24.04-standard
cores: 2
memory: 1024
swap: 512
rootfs: local-lvm:8
```

**Why LXC:** Web servers are stateless, Linux-native, and don't need kernel isolation.

#### 2. Databases (PostgreSQL, MySQL, Redis)

```yaml
ctid: 159
hostname: db-empleos
ostemplate: debian-12-standard
cores: 2
memory: 2048
swap: 1024
rootfs: local-lvm:16
```

**Why LXC:** Databases benefit from near-native I/O performance. LXC delivers this.

#### 3. Monitoring Stack (Prometheus, Grafana, Loki)

```yaml
ctid: 120
hostname: monitoring30
ostemplate: ubuntu-24.04-standard
cores: 2
memory: 2048
swap: 1024
rootfs: local-lvm:20
```

**Why LXC:** Monitoring tools are resource-intensive. LXC minimizes overhead.

#### 4. Network Services (Pi-hole, AdGuard, DNS)

```yaml
ctid: 101
hostname: omada21
ostemplate: debian-12-standard
cores: 1
memory: 512
swap: 256
rootfs: local-lvm:4
```

**Why LXC:** These services are lightweight and don't justify VM overhead.

#### 5. CI/CD Runners (Gitea Actions, Drone CI)

```yaml
ctid: 124
hostname: devops-lab
ostemplate: ubuntu-24.04-standard
cores: 4
memory: 4096
swap: 2048
rootfs: local-lvm:32
```

**Why LXC:** Build runners are ephemeral. LXC snapshots make reset easy.

### LXC Best Practices

**1. Use Templates, Not ISOs**

```bash
# Download templates
pveam download local ubuntu-24.04-standard_24.02-1_amd64.tar.zst
pveam download local debian-12-standard_12.7-1_amd64.tar.zst

# List available
pveam available
```

**2. Enable Nesting for Docker**

If running Docker inside LXC:

```bash
# Edit LXC config
nano /etc/pve/lxc/122.conf

# Add
features: nesting=1
features: keyctl=1
```

**3. Use Bind Mounts for Data**

Keep data on the host for easier backups:

```bash
# In LXC config
mp0: /mnt/data/web122,mp=/var/www/html
```

**4. Set Resource Limits**

```bash
# Limit CPU
pct set 122 -cpuunits 512

# Limit memory
pct set 122 -memory 1024

# Limit I/O
pct set 122 -iolimit 50
```

---

## When to Use VMs

### ✅ Ideal VM Use Cases

#### 1. Windows Services

```yaml
# VM Configuration
vmid: 200
name: windows-dev
ostype: win11
cores: 4
memory: 8192
scsihw: virtio-scsi-pci
scsi0: local-lvm:vm-200-disk-0,size=100G
```

**Why VM:** Windows requires its own kernel. No alternative.

**Use cases:**
- Windows development environment
- Active Directory domain controller
- Windows-specific applications

#### 2. Different Linux Kernel Versions

```yaml
vmid: 201
name: ubuntu-20.04-legacy
ostype: l26
cores: 2
memory: 2048
```

**Why VM:** If you need a specific kernel version that differs from Proxmox host.

**Use cases:**
- Testing kernel-specific features
- Running older software requiring old kernels
- Development/testing environments

#### 3. Full Isolation Requirements

```yaml
vmid: 202
name: security-lab
ostype: l26
cores: 2
memory: 4096
args: -cpu host -kvm no
```

**Why VM:** Complete isolation from host and other VMs.

**Use cases:**
- Security testing (intentionally vulnerable systems)
- Untrusted workloads
- Compliance requirements

#### 4. GPU Passthrough

```yaml
vmid: 203
name: ai-workstation
ostype: l26
cores: 8
memory: 16384
hostpci0: 01:00,pcie=1,x-vga=1
```

**Why VM:** GPU passthrough only works with VMs.

**Use cases:**
- AI/ML workloads (Ollama, Stable Diffusion)
- Gaming VMs
- Video transcoding

#### 5. BSD or Non-Linux OS

```yaml
vmid: 204
name: freebsd-nas
ostype: fbsd
cores: 4
memory: 8192
```

**Why VM:** BSD has a different kernel.

**Use cases:**
- TrueNAS Core
- pfSense/OPNsense
- FreeBSD jails

### VM Best Practices

**1. Use VirtIO Drivers**

```yaml
# Disk
scsihw: virtio-scsi-pci

# Network
net0: virtio=BC:24:11:XX:XX:XX,bridge=vmbr0

# Enable QEMU Agent
agent: 1
```

**2. Install QEMU Guest Agent**

```bash
# Inside VM (Linux)
apt install -y qemu-guest-agent
systemctl enable qemu-guest-agent

# Inside VM (Windows)
# Download from: https://pve.proxmox.com/wiki/Windows_VirtIO_Drivers
```

**3. Enable TRIM for SSDs**

```yaml
# In VM config
scsi0: local-lvm:vm-200-disk-0,size=100G,discard=on,ssd=1
```

**4. Use Cloud-Init**

```yaml
# During VM creation
cicustom: user=local:snippets/userdata.yml
cipassword: your-password
ciuser: ubuntu
ipconfig0: ip=192.168.1.105/24,gw=192.168.1.1
sshkeys: ssh-ed25519 AAAA...
```

---

## Real Infrastructure Breakdown

Here's my actual production setup:

| CT/VM ID | Type | Service | RAM | CPU | Why This Choice |
|----------|------|---------|-----|-----|-----------------|
| 100 | LXC | CasaOS Media | 2 GB | 2 | Lightweight media stack |
| 101 | LXC | Omada Controller | 512 MB | 1 | Simple Java app |
| 102 | LXC | Twingate Connector | 256 MB | 1 | Minimal network service |
| 103 | LXC | Kong Gateway | 512 MB | 1 | API gateway (Linux-native) |
| 104 | LXC | NVR (Surveillance) | 2 GB | 2 | Camera management |
| 120 | LXC | Monitoring (Prometheus/Grafana) | 2 GB | 2 | Resource-efficient monitoring |
| 122 | LXC | Web Services | 1 GB | 2 | Nginx + apps |
| 124 | LXC | DevOps Lab (CI/CD) | 4 GB | 4 | Build runners need RAM |
| 132 | LXC | Loki (Logging) | 2 GB | 2 | Log aggregation |
| 155 | LXC | NodeBB Forum | 1 GB | 2 | Node.js app |
| 159 | LXC | PostgreSQL | 2 GB | 2 | Database (I/O sensitive) |
| 200 | VM | Home Assistant | 4 GB | 2 | Needs full isolation |
| 243 | LXC | Ollama (AI/LLM) | 8 GB | 4 | AI inference (Linux-native) |
| 289 | LXC | Ridemotohub App | 2 GB | 2 | Custom web app |

**Ratio:** 13 LXC : 1 VM

**Key insight:** 93% of my services run in LXC. VMs are for special cases only.

---

## Migration: LXC ↔ VM

### Converting VM to LXC

Sometimes you realize a VM is overkill. Here's how to migrate:

```bash
# 1. Export data from VM
scp -r user@vm-ip:/var/www/html /tmp/web-data

# 2. Create LXC from template
pct create 122 local:vztmpl/ubuntu-24.04-standard.tar.zst

# 3. Configure LXC
pct set 122 -cores 2 -memory 1024 -swap 512
pct set 122 -net0 name=eth0,bridge=vmbr0,ip=192.168.1.122/24

# 4. Copy data
pct push 122 /tmp/web-data /var/www/html

# 5. Start and verify
pct start 122
```

### Converting LXC to VM

If you need more isolation:

```bash
# 1. Backup LXC
vzdump 122 --storage backup-storage

# 2. Create VM
qm create 200 --memory 2048 --core 2
qm set 200 --scsihw virtio-scsi-pci --scsi0 local-lvm:32

# 3. Install OS in VM
# (Use ISO or cloud image)

# 4. Restore data
scp /tmp/backup-122.tar user@vm-ip:/tmp/
# Extract and configure
```

---

## Performance Benchmarks

I ran identical workloads on LXC and VM:

### Nginx Throughput (ab benchmark)

```
LXC:  15,234 req/sec
VM:   13,891 req/sec
Diff: ~9% slower on VM
```

### PostgreSQL (pgbench, 10 clients)

```
LXC:  2,847 tps
VM:   2,612 tps
Diff: ~8% slower on VM
```

### Docker Build Time (Node.js app)

```
LXC:  45 seconds
VM:   52 seconds
Diff: ~15% slower on VM
```

**Conclusion:** LXC consistently outperforms VMs by 8-15% for Linux-native workloads.

---

## Decision Framework

Use this flowchart:

```
                    ┌─────────────────┐
                    │ Need Windows?   │
                    └────────┬────────┘
                         Yes │
                             ▼
                    ┌─────────────────┐
                    │  Use VM         │
                    └─────────────────┘
                             │
                         No  │
                             ▼
                    ┌─────────────────┐
                    │ Need different  │
                    │ kernel version? │
                    └────────┬────────┘
                         Yes │
                             ▼
                    ┌─────────────────┐
                    │  Use VM         │
                    └─────────────────┘
                             │
                         No  │
                             ▼
                    ┌─────────────────┐
                    │ Need full       │
                    │ isolation?      │
                    └────────┬────────┘
                         Yes │
                             ▼
                    ┌─────────────────┐
                    │  Use VM         │
                    └─────────────────┘
                             │
                         No  │
                             ▼
                    ┌─────────────────┐
                    │  Use LXC        │
                    └─────────────────┘
```

---

## Common Mistakes

### ❌ Running Docker in VMs (unnecessarily)

**Wrong:**
```
VM → Docker → Containers
```

**Better:**
```
LXC → Docker → Containers
```

**Why:** Double virtualization overhead.

### ❌ Using LXC for Windows (impossible)

LXC requires Linux kernel. Can't run Windows.

### ❌ Over-provisioning VMs

**Wrong:**
```yaml
vmid: 200
memory: 8192  # Only using 1 GB
cores: 4      # Only using 1 core
```

**Better:** Start small, scale up.

### ❌ Under-provisioning LXC

**Wrong:**
```yaml
ctid: 122
memory: 256   # Nginx + PHP needs 512 MB minimum
```

**Better:** Give adequate resources from start.

---

## Conclusion

**LXC is the default choice for homelabs.** It's lighter, faster, and more efficient for Linux-native services.

**VMs are for special cases:**
- Windows
- Different kernels
- Full isolation
- GPU passthrough
- Non-Linux OS

My recommendation:
1. Start with LXC for everything
2. Only use VMs when LXC can't meet requirements
3. Monitor resource usage and adjust

This approach maximizes what you can run on limited hardware.

---

*Running something in a VM that should be in LXC? Migrate it. Your RAM will thank you.*
