---
title: "Mini PC for Proxmox: Best Hardware 2026"
description: "Best mini PCs for Proxmox homelab in 2026. Lenovo, Dell, Intel NUC compared. Power efficiency, performance, value."
date: "2026-06-05"
tags: ["Hardware", "Mini PC", "Proxmox", "Buying Guide"]
author: "neuralcodelab"
readTime: "10 min read"
---

# Mini PC for Proxmox: Best Hardware 2026

**Last updated:** June 5, 2026 | **Reading time:** 10 minutes

---

## Why Mini PCs for Homelab?

Mini PCs offer:
- **Power efficiency** - 10-15W idle vs 50W+ desktop
- **Space savings** - Fit anywhere
- **Quiet operation** - No loud fans
- **Cost effective** - Refurbished deals

---

## Top Picks 2026

### Best Overall: Lenovo ThinkCentre M720q

| Spec | Value |
|------|-------|
| CPU | i5-8500T (6 cores) |
| RAM | Up to 32 GB DDR4 |
| Storage | 2x M.2 NVMe + 2.5" SATA |
| Network | 1 GbE |
| Price | $180-220 (refurbished) |

**Pros:** Expandable, reliable, great Linux support
**Cons:** Only 1 GbE

### Best Value: Dell OptiPlex 7060 Micro

| Spec | Value |
|------|-------|
| CPU | i5-8500T (6 cores) |
| RAM | Up to 32 GB DDR4 |
| Storage | M.2 NVMe + 2.5" SATA |
| Network | 1 GbE |
| Price | $160-200 (refurbished) |

**Pros:** Cheapest 8th gen option
**Cons:** Single M.2 slot

### Best Performance: Intel NUC 13 Pro

| Spec | Value |
|------|-------|
| CPU | i7-1360P (12 cores) |
| RAM | Up to 64 GB DDR5 |
| Storage | 2x M.2 NVMe |
| Network | 2.5 GbE |
| Price | $500-600 (new) |

**Pros:** Latest hardware, 2.5 GbE
**Cons:** Expensive, overkill for most

### Budget King: HP ProDesk 600 G4 Mini

| Spec | Value |
|------|-------|
| CPU | i5-8500T (6 cores) |
| RAM | Up to 32 GB DDR4 |
| Storage | M.2 + 2.5" SATA |
| Network | 1 GbE |
| Price | $150-180 (refurbished) |

**Pros:** Cheapest entry point
**Cons:** Build quality varies

---

## What to Look For

### CPU Generation

**8th gen Intel minimum** (i5-8500T or better). Why?
- 6 cores vs 4 cores in 7th gen
- Officially supports Windows 11 (resale value)
- Better IOMMU for passthrough

### RAM

- **16 GB minimum** - Proxmox + a few VMs
- **32 GB recommended** - Comfortable headroom
- **64 GB enthusiast** - Run everything

### Storage

- **M.2 NVMe for Proxmox boot** - 256 GB minimum
- **2.5" SATA for VM storage** - Add your own SSD
- **Dual M.2 bonus** - Separate OS and VMs

### Network

- **1 GbE sufficient** for most
- **2.5/10 GbE** if you have NAS or heavy traffic

---

## Power Consumption Comparison

| Model | Idle | Load | Annual Cost* |
|-------|------|------|--------------|
| M720q | 12W | 65W | $13 |
| 7060 Micro | 11W | 60W | $12 |
| NUC 13 Pro | 18W | 95W | $20 |
| Desktop (i7) | 50W | 200W | $55 |

*At $0.12/kWh

**Mini PCs save $40+/year in electricity vs desktop.**

---

## Where to Buy

### Refurbished (Best Value)
- eBay (search "Lenovo M720q i5")
- ServerSupply
- TechMikeNY
- Local IT liquidators

### New (If Budget Allows)
- Amazon
- Newegg
- Intel directly (for NUC)

---

## My Setup

I run **2x Lenovo M720q** in cluster:
- Node 1: 32 GB RAM, 1 TB NVMe (primary)
- Node 2: 32 GB RAM, 512 GB NVMe (backup)

**Total cost:** ~$400 | **Total power:** 24W idle

This runs 20+ services with room to grow.

---

*Don't overspend. A $200 refurbished Mini PC handles 90% of homelab use cases.*
