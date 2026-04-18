import React from 'react';
import { CheckCircle2, CornerDownRight } from 'lucide-react';

const stats = [
    { value: '4', label: 'boot layers', sub: 'orchestrated startup', accent: 'var(--red-ink)' },
    { value: '13', label: 'services', sub: 'containers + VMs', accent: 'var(--rose-ink)' },
    { value: '100%', label: 'uptime target', sub: 'production SLA', accent: 'var(--red-ink)' },
    { value: '<5m', label: 'mean recovery', sub: 'MTTR guardrail', accent: 'var(--rose-ink)' },
];

const demonstrates = [
    'Systems thinking & architecture design',
    'Incident response & recovery procedures',
    'Infrastructure reliability engineering',
    'Real-world operational constraints',
];

const Overview = () => {
    return (
        <div className="space-y-14">
            {/* Briefing */}
            <header className="grid grid-cols-12 gap-8 items-end">
                <div className="col-span-12 md:col-span-8">
                    <div className="rt-meta mb-4">// BRIEFING · 01</div>
                    <h2 className="rt-display text-5xl md:text-6xl">
                        Not a hobby project.<br />
                        <span className="text-[color:var(--red-ink)]">A mission.</span>
                    </h2>
                </div>
                <div className="col-span-12 md:col-span-4 rt-mono text-xs text-[color:var(--foreground-mute)] md:text-right space-y-1">
                    <div>FILE-REF / OVERVIEW-001</div>
                    <div>STATUS / <span className="text-emerald-400">ACTIVE</span></div>
                    <div>OPERATOR / @devlewiso</div>
                </div>
            </header>

            <div className="rt-redline" />

            {/* Prose + sidebar */}
            <div className="grid grid-cols-12 gap-10">
                <div className="col-span-12 lg:col-span-8 space-y-6">
                    <p className="text-xl md:text-2xl leading-relaxed text-[color:var(--foreground-dim)]">
                        A production-grade infrastructure lab that demonstrates real-world
                        systems engineering, operational excellence and architectural depth.
                    </p>
                    <p className="text-base md:text-lg leading-relaxed text-[color:var(--foreground-mute)] max-w-2xl">
                        Every component is chosen deliberately. Every boot sequence is orchestrated.
                        Every failure scenario is planned for.
                    </p>

                    {/* Stats — telemetry style */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-red-900/40 mt-10 border border-red-900/40">
                        {stats.map((s) => (
                            <div key={s.label} className="bg-[color:var(--bg-panel)] p-5 relative group">
                                <div className="rt-display text-5xl md:text-6xl" style={{ color: s.accent }}>
                                    {s.value}
                                </div>
                                <div className="rt-label text-[color:var(--foreground-dim)] mt-3">
                                    {s.label}
                                </div>
                                <div className="rt-mono text-[11px] text-[color:var(--foreground-mute)] mt-1">
                                    {s.sub}
                                </div>
                                <div className="absolute top-2 right-2 rt-mono text-[10px] text-[color:var(--foreground-mute)]/40 group-hover:text-[color:var(--red-ink)]/60 transition-colors">
                                    /{String(stats.indexOf(s) + 1).padStart(2, '0')}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar — what this demonstrates */}
                <aside className="col-span-12 lg:col-span-4">
                    <div className="rt-panel rt-corner-tl p-6 h-full">
                        <div className="flex items-center justify-between mb-5">
                            <div className="rt-meta text-[color:var(--red-ink)]">// DEMONSTRATES</div>
                            <CornerDownRight className="w-3.5 h-3.5 text-[color:var(--foreground-mute)]" />
                        </div>
                        <ul className="space-y-3">
                            {demonstrates.map((item, idx) => (
                                <li key={item} className="flex items-start gap-3 group">
                                    <span className="rt-mono text-[10px] text-[color:var(--foreground-mute)] mt-1 min-w-[24px]">
                                        {String(idx + 1).padStart(2, '0')}
                                    </span>
                                    <CheckCircle2 className="w-4 h-4 text-[color:var(--red-ink)] mt-1 flex-shrink-0" />
                                    <span className="text-sm text-[color:var(--foreground-dim)] group-hover:text-[color:var(--foreground)] transition-colors">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 pt-5 border-t border-red-900/30">
                            <div className="rt-mono text-[11px] text-[color:var(--foreground-mute)] leading-relaxed">
                                <span className="text-[color:var(--red-ink)]">&gt;</span>{' '}
                                every_service.boot_order()
                                <br />
                                <span className="text-[color:var(--red-ink)]">&gt;</span>{' '}
                                every_failure.has_runbook()
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Overview;
