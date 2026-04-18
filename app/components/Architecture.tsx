'use client';

import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { layers, Service } from './data';

interface ArchitectureProps {
    onServiceSelect: (service: Service) => void;
}

const Architecture = ({ onServiceSelect }: ArchitectureProps) => {
    const [selectedLayer, setSelectedLayer] = useState<string | null>(layers[0].id);

    return (
        <div className="space-y-14">
            <header className="grid grid-cols-12 gap-8 items-end">
                <div className="col-span-12 md:col-span-8">
                    <div className="rt-meta mb-4">// ARCHITECTURE · BOOT SEQUENCE</div>
                    <h2 className="rt-display text-5xl md:text-6xl">
                        Layered<br />
                        <span className="text-[color:var(--red-ink)]">boot protocol.</span>
                    </h2>
                </div>
                <div className="col-span-12 md:col-span-4 rt-mono text-xs text-[color:var(--foreground-mute)] md:text-right leading-relaxed">
                    Each layer depends on the previous. Strict orchestration,
                    dependency resolution and graceful failure handling.
                </div>
            </header>

            <div className="rt-redline" />

            <div className="space-y-3">
                {layers.map((layer, idx) => {
                    const isOpen = selectedLayer === layer.id;
                    return (
                        <div
                            key={layer.id}
                            className={`rt-panel overflow-hidden transition-all ${
                                isOpen ? 'border-red-700/60' : ''
                            }`}
                        >
                            <button
                                onClick={() => setSelectedLayer(isOpen ? null : layer.id)}
                                className="w-full text-left px-6 py-5 flex items-center gap-6 group"
                            >
                                {/* Layer index */}
                                <div
                                    className={`rt-display text-6xl md:text-7xl leading-none transition-colors ${
                                        isOpen ? 'text-[color:var(--red-ink)]' : 'text-[color:var(--foreground-mute)]/40 group-hover:text-[color:var(--foreground-mute)]'
                                    }`}
                                >
                                    {String(idx).padStart(2, '0')}
                                </div>

                                {/* Icon + name */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 rt-meta mb-1.5">
                                        <layer.icon className="w-3 h-3 text-[color:var(--red-ink)]" />
                                        <span className="text-[color:var(--red-ink)]">BOOT LAYER {idx}</span>
                                        <span className="text-[color:var(--foreground-mute)]">/</span>
                                        <span className="text-[color:var(--foreground-mute)]">
                                            {layer.services.length} services
                                        </span>
                                    </div>
                                    <div className="rt-display text-2xl md:text-3xl text-[color:var(--foreground)]">
                                        {layer.name.replace(/^Capa \d+: /, '')}
                                    </div>
                                    <div className="rt-mono text-xs text-[color:var(--foreground-mute)] mt-2 max-w-2xl">
                                        {layer.purpose}
                                    </div>
                                </div>

                                <ChevronRight
                                    className={`w-5 h-5 text-[color:var(--foreground-mute)] transition-transform flex-shrink-0 ${
                                        isOpen ? 'rotate-90 text-[color:var(--red-ink)]' : ''
                                    }`}
                                />
                            </button>

                            {isOpen && (
                                <div className="border-t border-red-900/40 bg-[color:var(--bg-abyss)]/40">
                                    {layer.services.map((service, sIdx) => (
                                        <button
                                            key={service.id}
                                            onClick={() => onServiceSelect(service)}
                                            className={`w-full grid grid-cols-[100px_140px_1fr_100px] gap-4 items-center px-6 py-4 text-left hover:bg-[color:var(--bg-elev)]/60 transition-colors ${
                                                sIdx < layer.services.length - 1 ? 'border-b border-red-900/20' : ''
                                            }`}
                                        >
                                            <span className="rt-mono text-[11px] text-[color:var(--foreground-mute)]">
                                                CT-{service.id}
                                            </span>
                                            <span className="rt-mono text-[11px] text-[color:var(--red-ink)]/70">
                                                BOOT-{String(idx).padStart(2, '0')}.{String(sIdx + 1).padStart(2, '0')}
                                            </span>
                                            <div className="min-w-0">
                                                <div className="font-semibold text-[color:var(--foreground)] truncate">
                                                    {service.name}
                                                </div>
                                                <div className="text-xs text-[color:var(--foreground-mute)] truncate">
                                                    {service.desc}
                                                </div>
                                            </div>
                                            <span className="inline-flex items-center justify-center gap-1.5 rt-label text-[color:var(--emerald-ok)]">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 rt-pulse-dot" />
                                                {service.status}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Architecture;
