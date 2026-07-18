---
title: "ZFS on Proxmox: Complete Storage Guide"
description: "ZFS storage configuration for Proxmox. RAID levels, compression, snapshots, best practices for homelab."
date: "2026-05-05"
tags: ["ZFS", "Proxmox", "Storage", "RAID"]
author: "neuralcodelab"
readTime: "11 min read"
---

# ZFS on Proxmox: Complete Storage Guide

**Last updated:** May 5, 2026 | **Reading time:** 11 minutes

---

## Why ZFS?

ZFS is more than a filesystem—it's a volume manager with:

- ✅ Data integrity (checksums)
- ✅ Snapshots (instant, space-efficient)
- ✅ Compression (saves space, can improve speed)
- ✅ RAID (software, flexible)
- ✅ Self-healing (detects and fixes corruption)

---

## RAID Levels

| Level | Min Disks | Usable | Fault Tolerance |
|-------|-----------|--------|-----------------|
| **RAID0** | 2 | 100% | None |
| **RAID1** | 2 | 50% | 1 disk |
| **RAID10** | 4 | 50% | 1 per mirror |
| **RAIDZ1** | 3 | 67% | 1 disk |
| **RAIDZ2** | 4 | 50% | 2 disks |
| **RAIDZ3** | 5 | 40% | 3 disks |

**Recommendation:** RAIDZ2 for homelabs. Best balance of capacity and safety.

---

## Installation

### During Proxmox Install

1. Select "ZFS (RAID0)" or your preferred level
2. Choose disks
3. Set compression: `lz4` (fast) or `zstd` (better ratio)
4. Set ashift: `12` (for 4K sector drives)

### After Installation

```bash
# Create pool
zpool create -o ashift=12 tank mirror /dev/sda /dev/sdb

# Create dataset for VMs
zfs create tank/vms

# Add to Proxmox
pvesm add zfspool tank -sparse 1
```

---

## Compression

```bash
# Check compression
zfs get compression tank

# Enable compression
zfs set compression=zstd tank

# Compression ratios
# lz4: 1.5-2x (fastest)
# zstd: 2-3x (good balance)
# gzip: 3-4x (slowest)
```

**Recommendation:** `zstd` for most use cases.

---

## Snapshots

```bash
# Create snapshot
zfs snapshot tank/vms@before-update

# List snapshots
zfs list -t snapshot

# Restore snapshot
zfs rollback tank/vms@before-update

# Delete snapshot
zfs destroy tank/vms@before-update
```

### Automated Snapshots

```bash
# Install sanoid
apt install sanoid

# Configure
nano /etc/sanoid/sanoid.conf
```

Example config:
```
tank/vms:
    hourly = 4
    daily = 7
    weekly = 4
    monthly = 6
```

---

## ARC (Cache) Tuning

ZFS uses RAM as cache (ARC). Default: 50% of RAM.

```bash
# Check ARC usage
arc_summary

# Limit ARC to 8 GB
echo 8589934592 > /sys/module/zfs/parameters/zfs_arc_max

# Make permanent
echo "options zfs zfs_arc_max=8589934592" > /etc/modprobe.d/zfs.conf
```

**Rule:** ARC = 25-50% of RAM for homelabs.

---

## Scrub (Data Integrity Check)

```bash
# Start scrub
zpool scrub tank

# Check progress
zpool status tank

# Schedule monthly
echo "0 0 1 * * root zpool scrub tank" >> /etc/crontab
```

---

## Best Practices

1. **Use ECC RAM** if possible (not required but ideal)
2. **Don't mix drive sizes** in same vdev
3. **Don't use RAIDZ3** unless you have 8+ drives
4. **Always have backups** (ZFS is not a backup)
5. **Monitor SMART data** for drive health

---

*ZFS is the best filesystem for Proxmox. The data integrity alone is worth it.*
