'use client';

import React, { useEffect, useState } from 'react';
import { Server, ArrowUpRight, Activity, Shield, Cpu } from 'lucide-react';
import Architecture from './Architecture';
import Capabilities from './Capabilities';
import Insights from './Insights';
import Map from './map';
import Overview from './Overview';
import NetworkTopology from './NetworkTopology';
import { Service } from './data';

const TABS = ['overview', 'map', 'network', 'architecture', 'capabilities', 'insights'] as const;
type Tab = typeof TABS[number];

const HomelabShowcase = () => {
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [activeTab, setActiveTab] = useState<Tab>('overview');
    const [clock, setClock] = useState<string>('');

    useEffect(() => {
        const tick = () => {
            const now = new Date();
            setClock(
                now.toISOString().replace('T', ' ').slice(0, 19) + ' UTC'
            );
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="min-h-screen rt-vignette text-[color:var(--foreground)] rt-scanlines rt-grain relative">
            {/* Top operator bar */}
            <div className="sticky top-0 z-40 border-b border-red-900/40 bg-[color:var(--bg-abyss)]/90 backdrop-blur">
                <div className="max-w-[1360px] mx-auto px-6 h-9 flex items-center justify-between rt-mono text-[11px]">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-2">
                            <span className="inline-block w-2 h-2 rounded-full bg-red-500 rt-pulse-dot" />
                            <span className="text-[color:var(--foreground-dim)]">NODE</span>
                            <span className="text-[color:var(--red-ink)]">NOSOTROS-01</span>
                        </span>
                        <span className="hidden md:inline text-[color:var(--foreground-mute)]">/ PROXMOX VE 9.1.5</span>
                        <span className="hidden lg:inline text-[color:var(--foreground-mute)]">/ CLEARANCE: OPERATOR</span>
                    </div>
                    <div className="flex items-center gap-4 text-[color:var(--foreground-dim)]">
                        <span className="hidden sm:inline">{clock || '—— —— ——'}</span>
                        <span className="text-[color:var(--red-ink)]">●</span>
                        <span className="uppercase">online</span>
                    </div>
                </div>
            </div>

            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 rt-grid-bg opacity-50" />
                <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-red-600/10 blur-3xl" />
                <div className="absolute -bottom-40 -left-20 w-[460px] h-[460px] rounded-full bg-rose-700/10 blur-3xl" />

                <div className="relative max-w-[1360px] mx-auto px-6 pt-16 pb-24">
                    <div className="grid grid-cols-12 gap-8 items-end">
                        {/* Left — title */}
                        <div className="col-span-12 lg:col-span-8">
                            <div className="flex items-center gap-3 mb-8 rt-meta">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-px bg-[color:var(--red-core)]" />
                                    <Server className="w-3.5 h-3.5 text-[color:var(--red-ink)]" />
                                </div>
                                <span className="text-[color:var(--red-ink)]">INFRA.LAB</span>
                                <span className="text-[color:var(--foreground-mute)]">// Red Team Operations Center</span>
                            </div>

                            <h1 className="rt-display text-[clamp(3.4rem,9vw,7.5rem)] text-[color:var(--foreground)]">
                                Production-grade<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-br from-red-400 via-red-500 to-rose-700">
                                    homelab
                                </span>
                                <span className="text-[color:var(--red-ink)]">.</span>
                            </h1>

                            <div className="mt-8 max-w-2xl">
                                <p className="text-lg md:text-xl text-[color:var(--foreground-dim)] leading-relaxed">
                                    A private on-premise infrastructure engineered to experiment,
                                    validate and operate production-grade architectures for{' '}
                                    <span className="text-[color:var(--foreground)] font-semibold">AI</span>,{' '}
                                    <span className="text-[color:var(--foreground)] font-semibold">DevOps</span>, and{' '}
                                    <span className="text-[color:var(--foreground)] font-semibold">zero-trust access</span>.
                                </p>
                            </div>

                            <div className="mt-10 flex flex-wrap gap-3">
                                <button
                                    onClick={() => setActiveTab('architecture')}
                                    className="group inline-flex items-center gap-2 px-5 py-3 bg-[color:var(--red-core)] hover:bg-red-700 text-white rt-label transition-colors"
                                >
                                    Explore architecture
                                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </button>
                                <button
                                    onClick={() => setActiveTab('network')}
                                    className="inline-flex items-center gap-2 px-5 py-3 border border-red-900/60 hover:border-[color:var(--red-ink)] text-[color:var(--foreground-dim)] hover:text-white rt-label transition-colors"
                                >
                                    View topology
                                </button>
                                <div className="inline-flex items-center gap-2 px-4 py-3 rt-mono text-[11px] text-[color:var(--foreground-mute)] border-l border-red-900/50 ml-2">
                                    <span className="rt-cursor text-[color:var(--red-ink)]">root@infra:~$</span>
                                </div>
                            </div>
                        </div>

                        {/* Right — telemetry card */}
                        <div className="col-span-12 lg:col-span-4">
                            <div className="rt-panel rt-corner-tl p-5">
                                <div className="flex items-center justify-between rt-meta mb-4">
                                    <span className="text-[color:var(--red-ink)]">// TELEMETRY</span>
                                    <span className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 rt-pulse-dot" />
                                        live
                                    </span>
                                </div>
                                <Telemetry label="CPU LOAD" value="2.00" unit="% / 16 cores" icon={Cpu} />
                                <Telemetry label="MEMORY" value="13.39" unit="GiB / 22.77" icon={Activity} />
                                <Telemetry label="UPTIME" value="19:39:33" unit="stable" icon={Shield} />
                                <div className="mt-4 pt-4 border-t border-red-900/40">
                                    <div className="flex items-center justify-between rt-mono text-[11px]">
                                        <span className="text-[color:var(--foreground-mute)]">pve-manager</span>
                                        <span className="text-[color:var(--foreground-dim)]">9.1.5</span>
                                    </div>
                                    <div className="flex items-center justify-between rt-mono text-[11px] mt-1">
                                        <span className="text-[color:var(--foreground-mute)]">kernel</span>
                                        <span className="text-[color:var(--foreground-dim)]">6.17.9-1-pve</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ticker */}
                    <div className="mt-14 border-y border-red-900/40 py-3 overflow-hidden">
                        <div className="flex whitespace-nowrap rt-mono text-[11px] text-[color:var(--foreground-mute)] gap-12" style={{ animation: 'rt-ticker 60s linear infinite' }}>
                            {[...Array(2)].flatMap((_, i) =>
                                [
                                    'LXC-102 twingate-connector',
                                    'LXC-120 monitoring30',
                                    'VM-100 casaos-media',
                                    'LXC-300 dev-gitlab66',
                                    'LXC-103 kong-gateway',
                                    'VM-200 home-assistant',
                                    'LXC-243 ollama-server',
                                    'LXC-159 db-empleos',
                                    'LXC-132 srv-loki',
                                ].map((s, j) => (
                                    <span key={`${i}-${j}`} className="flex items-center gap-3">
                                        <span className="text-[color:var(--red-ink)]">▸</span>
                                        {s}
                                        <span className="text-emerald-400">OK</span>
                                    </span>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Tabs */}
            <nav className="sticky top-9 z-30 border-b border-red-900/40 bg-[color:var(--bg-abyss)]/95 backdrop-blur">
                <div className="max-w-[1360px] mx-auto px-6">
                    <div className="flex gap-1 overflow-x-auto">
                        {TABS.map((tab, idx) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`relative py-3 px-4 rt-label transition-colors whitespace-nowrap flex items-center gap-2 ${
                                    activeTab === tab
                                        ? 'text-[color:var(--red-ink)]'
                                        : 'text-[color:var(--foreground-mute)] hover:text-[color:var(--foreground-dim)]'
                                }`}
                            >
                                <span className="text-[10px] text-[color:var(--foreground-mute)]/70">
                                    {String(idx).padStart(2, '0')}
                                </span>
                                {tab}
                                {activeTab === tab && (
                                    <>
                                        <div className="absolute bottom-0 left-0 right-0 h-px bg-[color:var(--red-ink)]" />
                                        <div className="absolute bottom-0 left-0 w-8 h-px bg-[color:var(--red-ink)] shadow-[0_0_10px_2px_rgba(255,59,59,0.8)]" />
                                    </>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Content */}
            <main className="max-w-[1360px] mx-auto px-6 py-16">
                <div key={activeTab} className="rt-rise">
                    {activeTab === 'overview' && <Overview />}
                    {activeTab === 'map' && <Map onServiceSelect={setSelectedService} />}
                    {activeTab === 'network' && <NetworkTopology />}
                    {activeTab === 'architecture' && <Architecture onServiceSelect={setSelectedService} />}
                    {activeTab === 'capabilities' && <Capabilities />}
                    {activeTab === 'insights' && <Insights />}
                </div>
            </main>

            {/* Footer status bar */}
            <footer className="border-t border-red-900/40 mt-10">
                <div className="max-w-[1360px] mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-3 rt-mono text-[11px] text-[color:var(--foreground-mute)]">
                    <span>
                        <span className="text-[color:var(--red-ink)]">INFRA.LAB</span> · engineered at{' '}
                        <a className="underline underline-offset-4 hover:text-[color:var(--foreground-dim)]" href="https://neuralcodelab.com">
                            neuralcodelab.com
                        </a>
                    </span>
                    <span className="flex items-center gap-4">
                        <span>{clock}</span>
                        <span className="text-emerald-400">ALL SYSTEMS NOMINAL</span>
                    </span>
                </div>
            </footer>

            {/* Service dossier modal */}
            {selectedService && <ServiceDossier service={selectedService} onClose={() => setSelectedService(null)} />}
        </div>
    );
};

const Telemetry = ({
    label,
    value,
    unit,
    icon: Icon,
}: {
    label: string;
    value: string;
    unit: string;
    icon: React.ComponentType<{ className?: string }>;
}) => (
    <div className="flex items-center justify-between py-2.5 border-b border-red-900/20 last:border-b-0">
        <div className="flex items-center gap-2 rt-meta">
            <Icon className="w-3 h-3 text-[color:var(--red-ink)]" />
            {label}
        </div>
        <div className="rt-mono text-sm">
            <span className="text-[color:var(--foreground)] font-semibold">{value}</span>
            <span className="text-[color:var(--foreground-mute)] ml-2 text-[11px]">{unit}</span>
        </div>
    </div>
);

const ServiceDossier = ({
    service,
    onClose,
}: {
    service: Service;
    onClose: () => void;
}) => (
    <div
        className="fixed inset-0 bg-[color:var(--bg-abyss)]/85 backdrop-blur-sm flex items-center justify-center z-50 p-6"
        onClick={onClose}
    >
        <div
            className="rt-panel rt-corner-tl max-w-xl w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex items-start justify-between mb-6">
                <div>
                    <div className="rt-meta mb-2">// SERVICE DOSSIER</div>
                    <h3 className="rt-display text-3xl">{service.name}</h3>
                </div>
                <button
                    onClick={onClose}
                    className="rt-mono text-xs text-[color:var(--foreground-mute)] hover:text-[color:var(--red-ink)] border border-red-900/60 w-8 h-8 flex items-center justify-center"
                    aria-label="Close"
                >
                    ✕
                </button>
            </div>

            <div className="rt-redline mb-6" />

            <dl className="space-y-4 rt-mono text-sm">
                <div className="grid grid-cols-[110px_1fr] gap-4">
                    <dt className="rt-meta pt-0.5">CT/VM ID</dt>
                    <dd className="text-[color:var(--red-ink)]">#{service.id}</dd>
                </div>
                <div className="grid grid-cols-[110px_1fr] gap-4">
                    <dt className="rt-meta pt-0.5">Function</dt>
                    <dd className="text-[color:var(--foreground-dim)]">{service.desc}</dd>
                </div>
                <div className="grid grid-cols-[110px_1fr] gap-4">
                    <dt className="rt-meta pt-0.5">Status</dt>
                    <dd>
                        <span className="inline-flex items-center gap-2 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rt-label border border-emerald-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 rt-pulse-dot" />
                            {service.status}
                        </span>
                    </dd>
                </div>
            </dl>
        </div>
    </div>
);

export default HomelabShowcase;
