'use client';

import React, { useEffect, useState } from 'react';
import {
    Server,
    Cloud,
    Laptop,
    Database,
    Activity,
    Shield,
    Eye,
    Zap,
    Container,
    HardDrive,
    Video,
    Home,
    Box,
    GitBranch,
    Layers,
    Terminal,
    Lock,
    Cpu,
    MemoryStick,
    LucideIcon,
} from 'lucide-react';

interface CPUDataPoint {
    time: number;
    cpu: number;
    io: number;
}

interface ServiceType {
    name: string;
    icon: LucideIcon;
    type: 'docker' | 'database';
}

interface ContainerNode {
    id: string;
    name: string;
    status: 'running' | 'stopped';
    services: ServiceType[];
    section: string;
    sectionIcon: LucideIcon;
}

interface SimpleNodeData {
    id: string;
    name: string;
    status?: 'running' | 'stopped';
    icon: LucideIcon;
    description?: string;
}

interface StorageNodeData {
    id: string;
    name: string;
    type: string;
    icon: LucideIcon;
}

interface CloudNodeData {
    id: string;
    name: string;
    icon: LucideIcon;
}

const cloudNodes: CloudNodeData[] = [
    { id: 'github', name: 'GitHub Repos', icon: GitBranch },
    { id: 'netlify', name: 'Netlify Hosting', icon: Cloud },
    { id: 'laptop', name: 'Laptop / Code Editor', icon: Laptop },
];

const containers: ContainerNode[] = [
    {
        id: 'lxc102',
        name: 'LXC 102: twingate-connector53',
        status: 'running',
        section: 'ZERO-TRUST ACCESS',
        sectionIcon: Lock,
        services: [
            { name: 'Twingate Connector', icon: Shield, type: 'docker' },
            { name: 'Zero Trust Network', icon: Lock, type: 'docker' },
        ],
    },
    {
        id: 'lxc103',
        name: 'LXC 103: srv-kong-gateway',
        status: 'running',
        section: 'GATEWAY & PROXY',
        sectionIcon: Shield,
        services: [
            { name: 'Kong API Gateway', icon: Shield, type: 'docker' },
            { name: 'Konga Manager', icon: Layers, type: 'docker' },
            { name: 'Portainer Agent :9001', icon: Container, type: 'docker' },
            { name: 'Postgres 13', icon: Database, type: 'database' },
        ],
    },
    {
        id: 'lxc120',
        name: 'LXC 120: Monitoring30',
        status: 'running',
        section: 'MONITORING & OPS',
        sectionIcon: Activity,
        services: [
            { name: 'n8n Automations', icon: Zap, type: 'docker' },
            { name: 'Cloudflare Tunnel', icon: Shield, type: 'docker' },
            { name: 'Grafana 12.3.2', icon: Activity, type: 'docker' },
            { name: 'Prometheus', icon: Activity, type: 'docker' },
            { name: 'Promtail Agent', icon: Activity, type: 'docker' },
            { name: 'Uptime Kuma', icon: Eye, type: 'docker' },
            { name: 'Dozzle Logs', icon: Activity, type: 'docker' },
            { name: 'Postgres 16', icon: Database, type: 'database' },
        ],
    },
    {
        id: 'lxc105',
        name: 'LXC 105: DataBaseandBI',
        status: 'running',
        section: 'DATA & BI',
        sectionIcon: Database,
        services: [
            { name: 'Metabase', icon: Activity, type: 'docker' },
            { name: 'Postgres Main', icon: Database, type: 'database' },
        ],
    },
    {
        id: 'lxc110',
        name: 'LXC 110: srv-chatwoot-10',
        status: 'running',
        section: 'CUSTOMER SUPPORT',
        sectionIcon: Activity,
        services: [
            { name: 'Chatwoot', icon: Activity, type: 'docker' },
            { name: 'Redis', icon: Database, type: 'database' },
            { name: 'Postgres', icon: Database, type: 'database' },
        ],
    },
    {
        id: 'lxc132',
        name: 'LXC 132: srv-loki-32',
        status: 'running',
        section: 'CENTRAL LOGS',
        sectionIcon: Activity,
        services: [{ name: 'Grafana Loki :3100', icon: Activity, type: 'docker' }],
    },
    {
        id: 'lxc167',
        name: 'LXC 167: srv-openproject-67',
        status: 'running',
        section: 'PROJECT MANAGEMENT',
        sectionIcon: Box,
        services: [
            { name: 'OpenProject', icon: Box, type: 'docker' },
            { name: 'Postgres', icon: Database, type: 'database' },
        ],
    },
    {
        id: 'lxc300',
        name: 'LXC 300: dev-gitlab66',
        status: 'running',
        section: 'VERSION CONTROL & CI/CD',
        sectionIcon: GitBranch,
        services: [
            { name: 'GitLab CE', icon: GitBranch, type: 'docker' },
            { name: 'GitLab Runner', icon: Terminal, type: 'docker' },
            { name: 'Redis Cache', icon: Database, type: 'database' },
        ],
    },
];

const vms: SimpleNodeData[] = [
    { id: 'vm100', name: 'VM 100: CasaOSMedia105', status: 'running', icon: Server },
    { id: 'vm200', name: 'VM 200: homeassistant119', status: 'running', icon: Home },
    { id: 'vm210', name: 'VM 210: Win', status: 'running', icon: Server },
    { id: 'vm243', name: 'VM 243: ollamaServer', status: 'running', icon: Terminal },
];

const storages: StorageNodeData[] = [
    { id: 'localnetwork', name: 'localnetwork (nosotros)', type: 'network', icon: HardDrive },
    { id: 'entretenimiento', name: 'entretenimiento (nosotros)', type: 'storage', icon: HardDrive },
    { id: 'local', name: 'local (nosotros)', type: 'storage', icon: HardDrive },
    { id: 'ssd', name: 'ssd (nosotros)', type: 'storage', icon: HardDrive },
];

const others: SimpleNodeData[] = [
    {
        id: 'lxc101',
        name: 'LXC 101: Omada Controller',
        status: 'running',
        icon: Activity,
        description: 'Network Infrastructure',
    },
    {
        id: 'lxc104',
        name: 'LXC 104: Recording NVR',
        status: 'running',
        icon: Video,
        description: 'Video Surveillance',
    },
];

const proxmoxStats = {
    hostname: 'nosotros',
    uptime: '19:39:33',
    cpuPct: 2.0,
    cpuModel: 'AMD Ryzen 7 5700G · 16 cores · 1 socket',
    loadAverage: '0.40 / 0.97 / 1.10',
    ramPct: 58.82,
    ramUsed: '13.39 GiB',
    ramTotal: '22.77 GiB',
    hdPct: 13.85,
    hdUsed: '31.21 GiB',
    hdTotal: '225.31 GiB',
    swapPct: 10.57,
    swapUsed: '865.84 MiB',
    swapTotal: '8.00 GiB',
    kernelVersion: '6.17.9-1-pve (2026-01-12)',
    bootMode: 'EFI',
    managerVersion: 'pve-manager/9.1.5',
    ioDelay: '0.00%',
    ksmSharing: '0 B',
};

const HomelabDiagram = () => {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const [selectedNode, setSelectedNode] = useState<string | null>(null);
    const [cpuData, setCpuData] = useState<CPUDataPoint[]>([]);

    useEffect(() => {
        const seed = () =>
            Array.from({ length: 50 }, (_, i) => ({
                time: i,
                cpu: 1.5 + Math.random() * 1.5,
                io: Math.random() * 0.5,
            }));
        setCpuData(seed());
        const id = setInterval(() => {
            setCpuData((prev) => {
                const next = [...prev.slice(1)];
                next.push({
                    time: prev[prev.length - 1].time + 1,
                    cpu: 1.5 + Math.random() * 1.5,
                    io: Math.random() * 0.5,
                });
                return next;
            });
        }, 2000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="space-y-14">
            {/* Header */}
            <header className="grid grid-cols-12 gap-8 items-end">
                <div className="col-span-12 md:col-span-8">
                    <div className="rt-meta mb-4">// NODE MAP · PROXMOX VE</div>
                    <h2 className="rt-display text-5xl md:text-6xl">
                        {proxmoxStats.hostname}
                        <span className="text-[color:var(--red-ink)]">.</span>
                    </h2>
                    <div className="rt-mono text-xs text-[color:var(--foreground-mute)] mt-3">
                        {proxmoxStats.managerVersion} · kernel {proxmoxStats.kernelVersion} · boot {proxmoxStats.bootMode}
                    </div>
                </div>
                <div className="col-span-12 md:col-span-4 rt-mono text-xs md:text-right space-y-1">
                    <div className="text-[color:var(--foreground-mute)]">UPTIME</div>
                    <div className="text-[color:var(--red-ink)] text-lg">{proxmoxStats.uptime}</div>
                    <div className="text-[color:var(--foreground-mute)] mt-2">LOAD-AVG</div>
                    <div className="text-[color:var(--foreground-dim)]">{proxmoxStats.loadAverage}</div>
                </div>
            </header>

            <div className="rt-redline" />

            {/* Telemetry grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-px bg-red-900/40 border border-red-900/40">
                <TelemetryCard
                    icon={Cpu}
                    label="CPU"
                    pct={proxmoxStats.cpuPct}
                    primary={`${proxmoxStats.cpuPct.toFixed(2)}%`}
                    secondary="of 16 cores"
                    meta={proxmoxStats.cpuModel}
                />
                <TelemetryCard
                    icon={MemoryStick}
                    label="MEMORY"
                    pct={proxmoxStats.ramPct}
                    primary={`${proxmoxStats.ramPct.toFixed(2)}%`}
                    secondary={`${proxmoxStats.ramUsed} / ${proxmoxStats.ramTotal}`}
                    meta={`swap ${proxmoxStats.swapPct}% · ${proxmoxStats.swapUsed} / ${proxmoxStats.swapTotal}`}
                />
                <TelemetryCard
                    icon={HardDrive}
                    label="STORAGE"
                    pct={proxmoxStats.hdPct}
                    primary={`${proxmoxStats.hdPct.toFixed(2)}%`}
                    secondary={`${proxmoxStats.hdUsed} / ${proxmoxStats.hdTotal}`}
                    meta={`io-delay ${proxmoxStats.ioDelay} · ksm ${proxmoxStats.ksmSharing}`}
                />
            </section>

            {/* CPU chart */}
            <section>
                <SectionTitle index="00" meta="REAL-TIME" label="CPU · IO delay" />
                <CPUChart data={cpuData} />
            </section>

            {/* Cloud layer */}
            <section>
                <SectionTitle index="01" meta="INGRESS" label="Public web & dev flow" />
                <div className="rt-panel p-6 flex flex-wrap items-center gap-3">
                    {cloudNodes.map((c, idx) => (
                        <React.Fragment key={c.id}>
                            <CloudChip data={c} />
                            {idx < cloudNodes.length - 1 && (
                                <div className="flex items-center gap-1 text-[color:var(--red-ink)]/50 rt-mono text-xs">
                                    <span className="h-px w-6 bg-[color:var(--red-ink)]/40" />
                                    →
                                    <span className="h-px w-6 bg-[color:var(--red-ink)]/40" />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </section>

            {/* LXC rack */}
            <section>
                <SectionTitle
                    index="02"
                    meta={`${containers.length} LXC`}
                    label="Container rack"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-red-900/40 border border-red-900/40">
                    {containers.map((c) => (
                        <ContainerCard
                            key={c.id}
                            data={c}
                            hovered={hoveredNode === c.id}
                            selected={selectedNode === c.id}
                            onHover={setHoveredNode}
                            onSelect={setSelectedNode}
                        />
                    ))}
                </div>
            </section>

            {/* VMs */}
            <section>
                <SectionTitle index="03" meta={`${vms.length} VMs`} label="Virtual machines" />
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-px bg-red-900/40 border border-red-900/40">
                    {vms.map((vm) => (
                        <SimpleRow key={vm.id} data={vm} />
                    ))}
                </div>
            </section>

            {/* Storage */}
            <section>
                <SectionTitle index="04" meta="ZFS" label="Storage & network" />
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-px bg-red-900/40 border border-red-900/40">
                    {storages.map((s) => (
                        <StorageRow key={s.id} data={s} />
                    ))}
                </div>
            </section>

            {/* Network infra / surveillance */}
            <section>
                <SectionTitle index="05" meta="OPS" label="Network infrastructure & surveillance" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-red-900/40 border border-red-900/40">
                    {others.map((o) => (
                        <SimpleRow key={o.id} data={o} />
                    ))}
                </div>
            </section>

            {/* Legend */}
            <footer className="rt-panel p-5">
                <div className="rt-meta text-[color:var(--red-ink)] mb-4">// LEGEND</div>
                <div className="flex flex-wrap gap-x-8 gap-y-3 rt-mono text-xs text-[color:var(--foreground-dim)]">
                    <LegendItem dot="emerald" label="Running" />
                    <LegendItem dot="mute" label="Stopped" />
                    <LegendItem swatch="var(--red-core)" label="Docker service" />
                    <LegendItem swatch="var(--red-deep)" label="Database" />
                    <LegendItem icon={HardDrive} label="Storage node" />
                </div>
            </footer>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────
   PRESENTATIONAL COMPONENTS
   ───────────────────────────────────────────────────────────── */

const SectionTitle = ({
    index,
    meta,
    label,
}: {
    index: string;
    meta: string;
    label: string;
}) => (
    <div className="flex items-end justify-between mb-4">
        <div className="flex items-baseline gap-4">
            <span className="rt-display text-4xl text-[color:var(--foreground-mute)]/40">
                {index}
            </span>
            <h3 className="rt-display text-2xl md:text-3xl text-[color:var(--foreground)]">
                {label}
            </h3>
        </div>
        <span className="rt-meta text-[color:var(--red-ink)]">// {meta}</span>
    </div>
);

const TelemetryCard = ({
    icon: Icon,
    label,
    pct,
    primary,
    secondary,
    meta,
}: {
    icon: LucideIcon;
    label: string;
    pct: number;
    primary: string;
    secondary: string;
    meta: string;
}) => (
    <div className="bg-[color:var(--bg-panel)] p-6">
        <div className="flex items-center justify-between rt-meta mb-4">
            <span className="flex items-center gap-2">
                <Icon className="w-3.5 h-3.5 text-[color:var(--red-ink)]" />
                {label}
            </span>
            <span className="text-[color:var(--foreground-mute)]">{pct.toFixed(1)}%</span>
        </div>
        <div className="rt-display text-5xl text-[color:var(--foreground)] leading-none">
            {primary}
        </div>
        <div className="rt-mono text-xs text-[color:var(--foreground-dim)] mt-2">
            {secondary}
        </div>
        {/* bar */}
        <div className="mt-5 h-1 bg-[color:var(--bg-abyss)] relative overflow-hidden">
            <div
                className="h-full bg-[color:var(--red-core)]"
                style={{ width: `${Math.min(pct, 100)}%` }}
            />
            <div
                className="absolute top-0 left-0 h-full w-px bg-[color:var(--red-ink)] shadow-[0_0_6px_1px_rgba(255,59,59,0.8)]"
                style={{ left: `${Math.min(pct, 100)}%` }}
            />
        </div>
        <div className="rt-mono text-[10px] text-[color:var(--foreground-mute)] mt-3 truncate">
            {meta}
        </div>
    </div>
);

const CPUChart = ({ data }: { data: CPUDataPoint[] }) => {
    const maxValue = 3;
    const height = 180;
    const width = 1000;
    const padding = { left: 40, right: 12, top: 14, bottom: 14 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    if (data.length === 0) return null;

    return (
        <div className="rt-panel rt-corner-tl p-5">
            <div className="flex items-center justify-between mb-3 rt-mono text-xs">
                <span className="rt-meta text-[color:var(--red-ink)]">// live trace</span>
                <div className="flex gap-4 text-[color:var(--foreground-dim)]">
                    <span className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[color:var(--red-core)]" />
                        CPU
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-amber-500" />
                        IO delay
                    </span>
                </div>
            </div>

            <svg
                width="100%"
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="none"
                className="w-full"
            >
                {[0, 0.5, 1, 1.5, 2, 2.5, 3].map((v) => {
                    const y = padding.top + chartHeight - (v / maxValue) * chartHeight;
                    return (
                        <g key={v}>
                            <text
                                x={padding.left - 6}
                                y={y + 3}
                                fontSize="9"
                                fontFamily="monospace"
                                fill="#8a7e78"
                                textAnchor="end"
                            >
                                {v.toFixed(1)}
                            </text>
                            <line
                                x1={padding.left}
                                y1={y}
                                x2={width - padding.right}
                                y2={y}
                                stroke="#3b0a0a"
                                strokeWidth="1"
                                vectorEffect="non-scaling-stroke"
                            />
                        </g>
                    );
                })}

                <defs>
                    <linearGradient id="cpuGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ff3b3b" stopOpacity="0.9" />
                        <stop offset="60%" stopColor="#dc2626" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0.05" />
                    </linearGradient>
                    <linearGradient id="ioGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#92400e" stopOpacity="0.1" />
                    </linearGradient>
                </defs>

                {/* CPU area */}
                <path
                    d={`M ${padding.left} ${padding.top + chartHeight} ${data
                        .map((d, i) => {
                            const x = padding.left + (i / (data.length - 1)) * chartWidth;
                            const y = padding.top + chartHeight - (d.cpu / maxValue) * chartHeight;
                            return `L ${x} ${y}`;
                        })
                        .join(' ')} L ${padding.left + chartWidth} ${padding.top + chartHeight} Z`}
                    fill="url(#cpuGrad)"
                    vectorEffect="non-scaling-stroke"
                />
                {/* CPU stroke */}
                <path
                    d={`M ${data
                        .map((d, i) => {
                            const x = padding.left + (i / (data.length - 1)) * chartWidth;
                            const y = padding.top + chartHeight - (d.cpu / maxValue) * chartHeight;
                            return `${i === 0 ? '' : 'L'} ${x} ${y}`;
                        })
                        .join(' ')}`}
                    fill="none"
                    stroke="#ff3b3b"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                />
                {/* IO area */}
                <path
                    d={`M ${padding.left} ${padding.top + chartHeight} ${data
                        .map((d, i) => {
                            const x = padding.left + (i / (data.length - 1)) * chartWidth;
                            const y = padding.top + chartHeight - (d.io / maxValue) * chartHeight;
                            return `L ${x} ${y}`;
                        })
                        .join(' ')} L ${padding.left + chartWidth} ${padding.top + chartHeight} Z`}
                    fill="url(#ioGrad)"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
        </div>
    );
};

const CloudChip = ({ data }: { data: CloudNodeData }) => (
    <div className="inline-flex items-center gap-2 px-3 py-2 border border-red-900/60 bg-[color:var(--bg-abyss)]/60 hover:border-[color:var(--red-ink)] transition-colors">
        <data.icon className="w-4 h-4 text-[color:var(--red-ink)]" />
        <span className="rt-mono text-xs text-[color:var(--foreground-dim)]">{data.name}</span>
    </div>
);

const ContainerCard = ({
    data,
    hovered,
    selected,
    onHover,
    onSelect,
}: {
    data: ContainerNode;
    hovered: boolean;
    selected: boolean;
    onHover: (id: string | null) => void;
    onSelect: (id: string | null) => void;
}) => {
    const [, ctId] = data.name.match(/(\d{3})/) ?? [];
    const title = data.name.replace(/^LXC \d+: /, '');
    const Section = data.sectionIcon;
    return (
        <div
            onMouseEnter={() => onHover(data.id)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onSelect(selected ? null : data.id)}
            className={`bg-[color:var(--bg-panel)] p-5 cursor-pointer transition-colors ${
                hovered || selected ? 'bg-[color:var(--bg-elev)]' : ''
            }`}
        >
            {/* Header row */}
            <div className="flex items-center justify-between rt-meta mb-3">
                <span className="flex items-center gap-2 text-[color:var(--red-ink)]">
                    <Section className="w-3 h-3" />
                    {data.section}
                </span>
                <span className="flex items-center gap-1.5">
                    <span
                        className={`w-1.5 h-1.5 rounded-full ${
                            data.status === 'running' ? 'bg-emerald-400 rt-pulse-dot' : 'bg-gray-500'
                        }`}
                    />
                    <span
                        className={
                            data.status === 'running'
                                ? 'text-emerald-400'
                                : 'text-[color:var(--foreground-mute)]'
                        }
                    >
                        {data.status}
                    </span>
                </span>
            </div>

            {/* Title */}
            <div className="flex items-baseline gap-3 mb-4">
                <span className="rt-mono text-[11px] text-[color:var(--foreground-mute)]">CT-{ctId}</span>
                <h4 className="rt-display text-xl leading-tight text-[color:var(--foreground)]">{title}</h4>
            </div>

            {/* Services list */}
            <ul className="space-y-1.5">
                {data.services.map((s, i) => (
                    <li
                        key={i}
                        className="flex items-center justify-between px-2 py-1.5 bg-[color:var(--bg-abyss)]/60 border border-red-900/30"
                    >
                        <span className="flex items-center gap-2 rt-mono text-xs text-[color:var(--foreground-dim)]">
                            <s.icon className="w-3 h-3 text-[color:var(--red-ink)]" />
                            {s.name}
                        </span>
                        <span
                            className={`rt-mono text-[9px] tracking-[0.18em] uppercase ${
                                s.type === 'database'
                                    ? 'text-[color:var(--rose-ink)]'
                                    : 'text-[color:var(--foreground-mute)]'
                            }`}
                        >
                            {s.type}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const SimpleRow = ({ data }: { data: SimpleNodeData }) => (
    <div className="bg-[color:var(--bg-panel)] px-4 py-4 flex items-center gap-3 hover:bg-[color:var(--bg-elev)] transition-colors">
        <div className="w-9 h-9 border border-red-900/50 flex items-center justify-center bg-[color:var(--bg-abyss)]">
            <data.icon className="w-4 h-4 text-[color:var(--red-ink)]" />
        </div>
        <div className="flex-1 min-w-0">
            <div className="rt-mono text-[11px] text-[color:var(--foreground-mute)] truncate">
                {data.name}
            </div>
            {data.description && (
                <div className="rt-mono text-[10px] text-[color:var(--foreground-mute)]/70 mt-0.5">
                    {data.description}
                </div>
            )}
        </div>
        <span
            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                data.status === 'running' ? 'bg-emerald-400 rt-pulse-dot' : 'bg-gray-500'
            }`}
        />
    </div>
);

const StorageRow = ({ data }: { data: StorageNodeData }) => (
    <div className="bg-[color:var(--bg-panel)] px-4 py-4 flex items-center gap-3 hover:bg-[color:var(--bg-elev)] transition-colors">
        <data.icon className="w-4 h-4 text-[color:var(--red-ink)] flex-shrink-0" />
        <span className="rt-mono text-xs text-[color:var(--foreground-dim)] truncate flex-1">
            {data.name}
        </span>
        <span className="rt-mono text-[9px] tracking-[0.18em] uppercase text-[color:var(--foreground-mute)]">
            {data.type}
        </span>
    </div>
);

const LegendItem = ({
    dot,
    swatch,
    icon: Icon,
    label,
}: {
    dot?: 'emerald' | 'mute';
    swatch?: string;
    icon?: LucideIcon;
    label: string;
}) => (
    <span className="flex items-center gap-2">
        {dot === 'emerald' && <span className="w-2 h-2 rounded-full bg-emerald-400 rt-pulse-dot" />}
        {dot === 'mute' && <span className="w-2 h-2 rounded-full bg-gray-500" />}
        {swatch && <span className="w-3 h-3" style={{ background: swatch }} />}
        {Icon && <Icon className="w-3.5 h-3.5 text-[color:var(--red-ink)]" />}
        {label}
    </span>
);

export default HomelabDiagram;
