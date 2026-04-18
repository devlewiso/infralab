import React from 'react';
import { Shield, Brain, Activity, Zap, ArrowUpRight, LucideIcon } from 'lucide-react';

interface Capability {
    code: string;
    icon: LucideIcon;
    title: string;
    desc: string;
    tech: string[];
}

const capabilities: Capability[] = [
    {
        code: 'OP-01',
        icon: Shield,
        title: 'Zero-trust architecture',
        desc: 'Twingate-based secure remote access with network segmentation and controlled gateways.',
        tech: ['Twingate', 'VLANs', 'Firewall rules'],
    },
    {
        code: 'OP-02',
        icon: Brain,
        title: 'Local AI inference',
        desc: 'Self-hosted LLM stack for privacy-first AI workloads without cloud dependencies.',
        tech: ['Ollama', 'LLaMA', 'Custom models'],
    },
    {
        code: 'OP-03',
        icon: Activity,
        title: 'Full observability',
        desc: 'Real-time monitoring, alerting and incident response with proper MTTR tracking.',
        tech: ['Prometheus', 'Grafana', 'Loki', 'Uptime Kuma'],
    },
    {
        code: 'OP-04',
        icon: Zap,
        title: 'Orchestrated boot',
        desc: 'Layered startup sequence ensuring dependency resolution and graceful recovery.',
        tech: ['Proxmox API', 'Systemd', 'Health checks'],
    },
];

const Capabilities = () => {
    return (
        <div className="space-y-12">
            <header className="grid grid-cols-12 gap-8 items-end">
                <div className="col-span-12 md:col-span-8">
                    <div className="rt-meta mb-4">// CAPABILITIES · 04</div>
                    <h2 className="rt-display text-5xl md:text-6xl">
                        Operational<br />
                        <span className="text-[color:var(--red-ink)]">primitives.</span>
                    </h2>
                </div>
                <div className="col-span-12 md:col-span-4 rt-mono text-xs text-[color:var(--foreground-mute)] md:text-right">
                    <span className="text-[color:var(--red-ink)]">▸</span> 4 primary ops,
                    cross-cutting concerns across all layers.
                </div>
            </header>

            <div className="rt-redline" />

            <div className="grid md:grid-cols-2 gap-px bg-red-900/40 border border-red-900/40">
                {capabilities.map((cap) => (
                    <article
                        key={cap.code}
                        className="group relative bg-[color:var(--bg-panel)] p-8 transition-all hover:bg-[color:var(--bg-elev)]"
                    >
                        {/* Code tag */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="rt-mono text-xs text-[color:var(--red-ink)] border border-red-900/60 px-2 py-1 rt-glitch-hover">
                                {cap.code}
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-[color:var(--foreground-mute)] group-hover:text-[color:var(--red-ink)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                        </div>

                        {/* Icon + title */}
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 border border-red-900/50 flex items-center justify-center bg-[color:var(--bg-abyss)]">
                                <cap.icon className="w-5 h-5 text-[color:var(--red-ink)]" />
                            </div>
                            <h3 className="rt-display text-3xl md:text-4xl leading-[0.95] pt-1">
                                {cap.title}
                            </h3>
                        </div>

                        {/* Description */}
                        <p className="text-[color:var(--foreground-dim)] mb-6 leading-relaxed">
                            {cap.desc}
                        </p>

                        {/* Tech chips */}
                        <div className="flex flex-wrap gap-1.5">
                            {cap.tech.map((t) => (
                                <span
                                    key={t}
                                    className="rt-mono text-[11px] px-2 py-1 text-[color:var(--foreground-dim)] border border-red-900/40 bg-[color:var(--bg-abyss)]"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>

                        {/* Bottom accent line */}
                        <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-[color:var(--red-ink)] transition-all duration-500" />
                    </article>
                ))}
            </div>
        </div>
    );
};

export default Capabilities;
