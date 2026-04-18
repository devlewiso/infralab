import React from 'react';
import { AlertTriangle, Terminal } from 'lucide-react';

const intel = [
    'Container (CT) vs VM decisions based on isolation requirements and resource efficiency.',
    'Storage timing coordination for network-mounted volumes and boot dependencies.',
    'DNS and NTP synchronization handled at infrastructure layer before app startup.',
    'MTU optimization and network bridge configuration for performance.',
    'Controlled shutdown and recovery procedures for zero-data-loss guarantees.',
];

const stack = [
    {
        label: 'Infrastructure',
        items: ['Proxmox VE', 'LXC Containers', 'KVM / QEMU', 'ZFS Storage'],
    },
    {
        label: 'Networking',
        items: ['VLANs & segmentation', 'Twingate zero-trust', 'pfSense gateway', 'Internal DNS'],
    },
    {
        label: 'Operations',
        items: ['Prometheus + Grafana', 'Loki + Promtail', 'Uptime Kuma', 'Automated backups'],
    },
];

const Insights = () => {
    return (
        <div className="space-y-14">
            <header className="grid grid-cols-12 gap-8 items-end">
                <div className="col-span-12 md:col-span-8">
                    <div className="rt-meta mb-4">// INTEL · ARCHITECTURE NOTES</div>
                    <h2 className="rt-display text-5xl md:text-6xl">
                        Real-world<br />
                        <span className="text-[color:var(--red-ink)]">constraints.</span>
                    </h2>
                </div>
                <div className="col-span-12 md:col-span-4 rt-mono text-xs text-[color:var(--foreground-mute)] md:text-right flex md:justify-end items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span>CLASSIFIED · INTERNAL</span>
                </div>
            </header>

            <div className="rt-redline" />

            {/* Intel reports */}
            <div className="grid md:grid-cols-2 gap-5">
                {intel.map((note, idx) => (
                    <article
                        key={idx}
                        className="rt-panel p-6 group relative hover:border-red-700/50 transition-colors"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="rt-mono text-[11px] text-[color:var(--red-ink)] tracking-[0.22em]">
                                INTEL-{String(idx + 1).padStart(3, '0')}
                            </div>
                            <div className="rt-mono text-[10px] text-[color:var(--foreground-mute)] border border-red-900/40 px-1.5 py-0.5">
                                NOTE
                            </div>
                        </div>
                        <p className="text-[color:var(--foreground-dim)] leading-relaxed text-[15px]">
                            {note}
                        </p>
                        <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-[color:var(--red-ink)] transition-all duration-500" />
                    </article>
                ))}
            </div>

            {/* Stack manifest */}
            <section className="rt-panel rt-corner-tl">
                <div className="border-b border-red-900/40 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 rt-meta text-[color:var(--red-ink)]">
                        <Terminal className="w-3.5 h-3.5" />
                        STACK_MANIFEST.toml
                    </div>
                    <div className="rt-mono text-[11px] text-[color:var(--foreground-mute)]">
                        v 2026.04 · stable
                    </div>
                </div>
                <div className="grid md:grid-cols-3">
                    {stack.map((group, idx) => (
                        <div
                            key={group.label}
                            className={`p-8 ${idx < stack.length - 1 ? 'md:border-r' : ''} border-red-900/30`}
                        >
                            <div className="rt-label text-[color:var(--red-ink)] mb-5">
                                [{group.label.toLowerCase()}]
                            </div>
                            <ul className="space-y-3 rt-mono text-sm text-[color:var(--foreground-dim)]">
                                {group.items.map((item) => (
                                    <li key={item} className="flex items-center gap-2.5">
                                        <span className="text-[color:var(--red-ink)]/60">›</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Insights;
