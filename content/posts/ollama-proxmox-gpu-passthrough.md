---
title: "Self-Hosted AI: Ollama on Proxmox with GPU Passthrough"
description: "Run local LLMs with Ollama on Proxmox. GPU passthrough setup for NVIDIA, privacy-first AI inference."
date: "2026-06-20"
tags: ["AI", "Ollama", "LLM", "Proxmox", "GPU"]
author: "neuralcodelab"
readTime: "12 min read"
---

# Self-Hosted AI: Ollama on Proxmox with GPU Passthrough

**Last updated:** June 20, 2026 | **Reading time:** 12 minutes

---

## Why Self-Host AI?

Cloud AI services (ChatGPT, Claude, etc.) are convenient but:

- ❌ Your data leaves your network
- ❌ Rate limits and usage caps
- ❌ Monthly costs add up
- ❌ No control over models

**Ollama** solves this. Run LLMs locally with complete privacy.

---

## Hardware Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| GPU | GTX 1060 6GB | RTX 3090/4090 |
| RAM | 16 GB | 32-64 GB |
| Storage | 50 GB SSD | 500 GB NVMe |

**GPU VRAM determines model size:**
- 6 GB → 7B models
- 12 GB → 13B models
- 24 GB → 70B models (quantized)

---

## Step 1: Enable IOMMU on Proxmox

Edit GRUB:
```bash
nano /etc/default/grub
```

For Intel:
```
GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on iommu=pt"
```

For AMD:
```
GRUB_CMDLINE_LINUX_DEFAULT="quiet amd_iommu=on"
```

Update GRUB and reboot:
```bash
update-grub
reboot
```

---

## Step 2: Verify GPU Passthrough

```bash
# List PCI devices
lspci -nn | grep -i nvidia

# Example output:
# 01:00.0 VGA compatible controller [0300]: NVIDIA Corporation [10de]
```

---

## Step 3: Create VM for Ollama

```bash
# Create VM
qm create 243 --name ollama-server --memory 16384 --cores 8

# Import Ubuntu ISO and install
# ... standard installation ...

# Add GPU passthrough
qm set 243 --hostpci0 01:00,pcie=1
```

---

## Step 4: Install Ollama

```bash
# Inside VM
curl -fsSL https://ollama.com/install.sh | sh

# Pull models
ollama pull llama3.2:3b
ollama pull mistral:7b
ollama pull llama3.1:8b
```

---

## Step 5: Docker Deployment (Alternative)

```bash
docker run -d \
  -v ollama:/root/.ollama \
  -p 11434:11434 \
  --gpus all \
  --name ollama \
  ollama/ollama
```

---

## Model Recommendations

| Use Case | Model | VRAM | Speed |
|----------|-------|------|-------|
| Chat | Llama 3.2 3B | 4 GB | Fast |
| Code | CodeLlama 7B | 8 GB | Medium |
| Writing | Mistral 7B | 8 GB | Medium |
| Analysis | Llama 3.1 70B | 40 GB | Slow |

---

## Privacy Benefits

- No data sent to cloud
- Full audit logs
- Custom fine-tuning possible
- Works offline

**This is how AI should be: yours, private, controllable.**
