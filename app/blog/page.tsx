import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Server, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Guides and documentation for production-grade homelab infrastructure. Proxmox, self-hosting, zero-trust networking, and AI workloads.',
};

const POSTS = [
  {
    slug: 'proxmox-homelab-setup-2026',
    title: 'Proxmox Homelab Setup 2026: Complete Beginner Guide',
    description: 'Step-by-step guide to setting up a production-grade Proxmox homelab. Hardware recommendations, network configuration, and your first LXC containers.',
    date: '2026-07-17',
    readTime: '12 min read',
    tags: ['Proxmox', 'Beginner', 'Tutorial'],
  },
  {
    slug: 'zero-trust-home-network-twingate',
    title: 'Zero Trust Home Network with Twingate: No VPN Required',
    description: 'How to implement zero-trust architecture for your homelab using Twingate. Secure remote access without traditional VPN complexity.',
    date: '2026-07-10',
    readTime: '8 min read',
    tags: ['Security', 'Twingate', 'Networking'],
  },
  {
    slug: 'lxc-vs-vm-proxmox-when-to-use',
    title: 'LXC vs VM in Proxmox: When to Use Each (Real Examples)',
    description: 'Practical comparison of LXC containers vs VMs in Proxmox with real use cases from a production homelab running 13+ services.',
    date: '2026-07-05',
    readTime: '10 min read',
    tags: ['Proxmox', 'LXC', 'VM'],
  },
  {
    slug: 'home-assistant-proxmox-setup',
    title: 'Home Assistant on Proxmox: Complete Setup Guide 2026',
    description: 'Deploy Home Assistant on Proxmox with VM or LXC. Includes Zigbee, Z-Wave, backups, and production configuration.',
    date: '2026-06-28',
    readTime: '15 min read',
    tags: ['Home Assistant', 'Smart Home', 'Automation'],
  },
  {
    slug: 'ollama-proxmox-gpu-passthrough',
    title: 'Self-Hosted AI: Ollama on Proxmox with GPU Passthrough',
    description: 'Run local LLMs with Ollama on Proxmox. GPU passthrough setup for NVIDIA, privacy-first AI inference.',
    date: '2026-06-20',
    readTime: '12 min read',
    tags: ['AI', 'Ollama', 'LLM', 'GPU'],
  },
  {
    slug: 'proxmox-backup-server-guide',
    title: 'Proxmox Backup Server: Complete Guide for Homelabs',
    description: 'Set up Proxmox Backup Server for automated VM/container backups. Deduplication, encryption, remote replication.',
    date: '2026-06-15',
    readTime: '10 min read',
    tags: ['Proxmox', 'Backup', 'PBS', 'Disaster Recovery'],
  },
  {
    slug: 'nginx-proxy-manager-vs-traefik',
    title: 'Nginx Proxy Manager vs Traefik: Which for Homelab?',
    description: 'Compare Nginx Proxy Manager and Traefik for homelab reverse proxy. Setup, SSL, performance comparison.',
    date: '2026-06-10',
    readTime: '8 min read',
    tags: ['Nginx', 'Traefik', 'Reverse Proxy', 'SSL'],
  },
  {
    slug: 'best-mini-pc-proxmox-2026',
    title: 'Mini PC for Proxmox: Best Hardware 2026',
    description: 'Best mini PCs for Proxmox homelab in 2026. Lenovo, Dell, Intel NUC compared. Power efficiency, performance, value.',
    date: '2026-06-05',
    readTime: '10 min read',
    tags: ['Hardware', 'Mini PC', 'Buying Guide'],
  },
  {
    slug: 'docker-proxmox-lxc-vs-vm',
    title: 'Docker on Proxmox: LXC vs VM for Containers',
    description: 'Run Docker on Proxmox in LXC or VM. Pros, cons, performance comparison, and production recommendations.',
    date: '2026-05-28',
    readTime: '8 min read',
    tags: ['Docker', 'Proxmox', 'Containers'],
  },
  {
    slug: 'gitea-proxmox-self-hosted-git',
    title: 'Gitea on Proxmox: Self-Hosted Git in 10 Minutes',
    description: 'Deploy Gitea on Proxmox for self-hosted Git. Docker setup, SSH configuration, CI/CD integration.',
    date: '2026-05-20',
    readTime: '7 min read',
    tags: ['Gitea', 'Git', 'DevOps', 'CI/CD'],
  },
  {
    slug: 'prometheus-grafana-proxmox-monitoring',
    title: 'Prometheus + Grafana on Proxmox: Monitoring Stack Setup',
    description: 'Complete monitoring stack with Prometheus and Grafana on Proxmox. Metrics, dashboards, alerts for homelab.',
    date: '2026-05-15',
    readTime: '12 min read',
    tags: ['Prometheus', 'Grafana', 'Monitoring'],
  },
  {
    slug: 'cloudflare-tunnel-vs-twingate',
    title: 'Cloudflare Tunnel vs Twingate: Remote Access Comparison',
    description: 'Compare Cloudflare Tunnel and Twingate for homelab remote access. Security, setup, pricing, use cases.',
    date: '2026-05-10',
    readTime: '9 min read',
    tags: ['Cloudflare', 'Twingate', 'Security', 'Remote Access'],
  },
  {
    slug: 'zfs-proxmox-storage-guide',
    title: 'ZFS on Proxmox: Complete Storage Guide',
    description: 'ZFS storage configuration for Proxmox. RAID levels, compression, snapshots, best practices for homelab.',
    date: '2026-05-05',
    readTime: '11 min read',
    tags: ['ZFS', 'Proxmox', 'Storage', 'RAID'],
  },
];

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-[color:var(--bg-abyss)] text-[color:var(--foreground)]">
      {/* Header */}
      <header className="border-b border-red-900/40 bg-[color:var(--bg-abyss)]/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-[1360px] mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="rt-mono text-xs text-[color:var(--red-ink)] hover:underline">
            ← INFRA.LAB
          </a>
          <span className="rt-mono text-xs text-[color:var(--foreground-dim)]">
            DOCUMENTATION & GUIDES
          </span>
        </div>
      </header>
      
      {/* Hero */}
      <section className="max-w-[1360px] mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-6 rt-meta">
          <Server className="w-4 h-4 text-[color:var(--red-ink)]" />
          <span className="text-[color:var(--red-ink)]">INFRA.LAB</span>
          <span className="text-[color:var(--foreground-mute)]">// Technical Blog</span>
        </div>
        
        <h1 className="rt-display text-4xl md:text-5xl font-bold mb-6">
          Guides & <span className="text-transparent bg-clip-text bg-gradient-to-br from-red-400 via-red-500 to-rose-700">Documentation</span>
        </h1>
        
        <p className="text-xl text-[color:var(--foreground-dim)] max-w-3xl mb-12">
          Real-world homelab documentation. Production-grade architectures for self-hosting, 
          AI workloads, and zero-trust networking.
        </p>
      </section>
      
      {/* Posts List */}
      <section className="max-w-[1360px] mx-auto px-6 pb-24">
        <div className="grid gap-6">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block p-6 border border-red-900/30 hover:border-red-700/60 bg-[color:var(--bg-void)]/50 hover:bg-[color:var(--bg-void)] transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                <h2 className="text-2xl font-bold group-hover:text-[color:var(--red-ink)] transition-colors">
                  {post.title}
                </h2>
                <ArrowRight className="w-5 h-5 text-[color:var(--foreground-dim)] group-hover:text-[color:var(--red-ink)] group-hover:translate-x-1 transition-all" />
              </div>
              
              <p className="text-[color:var(--foreground-dim)] mb-4">
                {post.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 rt-mono text-xs">
                <span className="flex items-center gap-1.5 text-[color:var(--foreground-mute)]">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
                <span className="text-[color:var(--foreground-mute)]">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-red-900/20 text-[color:var(--red-ink)] rt-label"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
