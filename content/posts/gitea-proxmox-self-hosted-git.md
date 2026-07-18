---
title: "Gitea on Proxmox: Self-Hosted Git in 10 Minutes"
description: "Deploy Gitea on Proxmox for self-hosted Git. Docker setup, SSH configuration, CI/CD integration."
date: "2026-05-20"
tags: ["Gitea", "Git", "Proxmox", "DevOps", "CI/CD"]
author: "neuralcodelab"
readTime: "7 min read"
---

# Gitea on Proxmox: Self-Hosted Git in 10 Minutes

**Last updated:** May 20, 2026 | **Reading time:** 7 minutes

---

## Why Self-Host Git?

- ✅ Full control over your code
- ✅ No vendor lock-in
- ✅ Private repos without cost limits
- ✅ Integrated CI/CD (Gitea Actions)
- ✅ Learn Git server administration

---

## Quick Deploy (Docker)

```yaml
# docker-compose.yml
version: '3'
services:
  gitea:
    image: gitea/gitea:latest
    container_name: gitea
    restart: unless-stopped
    ports:
      - "3000:3000"
      - "2222:22"
    volumes:
      - ./gitea-data:/data
      - /etc/timezone:/etc/timezone:ro
      - /etc/localtime:/etc/localtime:ro
    environment:
      - USER_UID=1000
      - USER_GID=1000
      - GITEA__database__DB_TYPE=sqlite3
```

```bash
docker compose up -d
```

Access: `http://your-ip:3000`

---

## Production Setup (PostgreSQL)

```yaml
services:
  postgres:
    image: postgres:16
    environment:
      - POSTGRES_USER=gitea
      - POSTGRES_PASSWORD=secure-password
      - POSTGRES_DB=gitea
    volumes:
      - postgres-data:/var/lib/postgresql/data

  gitea:
    depends_on:
      - postgres
    environment:
      - GITEA__database__DB_TYPE=postgres
      - GITEA__database__HOST=postgres:5432
      - GITEA__database__NAME=gitea
      - GITEA__database__USER=gitea
      - GITEA__database__PASSWD=secure-password
```

---

## SSH Configuration

### Option 1: Gitea handles SSH (port 2222)

```bash
# Clone repos
git clone ssh://git@your-ip:2222/username/repo.git
```

### Option 2: System SSH (port 22)

More complex but cleaner URLs. Requires SSH config on Proxmox host.

---

## Gitea Actions (CI/CD)

Enable in `app.ini`:
```
[actions]
ENABLED = true
```

Example workflow:
```yaml
name: CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: echo "Building..."
```

---

## Backup Strategy

```bash
# Dump database
pg_dump -U gitea gitea > gitea-backup.sql

# Backup Gitea data
tar -czf gitea-data.tar.gz ./gitea-data
```

---

*Gitea is GitHub/GitLab lite. Perfect for homelabs and small teams.*
