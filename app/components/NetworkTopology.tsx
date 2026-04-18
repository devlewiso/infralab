'use client';

import React, { useState } from 'react';
import { Network, Globe, Radio, Camera, Laptop, Smartphone, Monitor, Boxes, ArrowRight } from 'lucide-react';

const NetworkTopology = () => {
    const [hoveredService, setHoveredService] = useState<number | null>(null);

    return (
        <div className="space-y-14">
            {/* Header */}
            <header className="grid grid-cols-12 gap-8 items-end">
                <div className="col-span-12 md:col-span-8">
                    <div className="rt-meta mb-4">// NETWORK // 03</div>
                    <h2 className="rt-display text-5xl md:text-6xl">
                        Cerebro<span className="text-[color:var(--red-ink)]">.</span>
                    </h2>
                    <div className="rt-mono text-xs text-[color:var(--foreground-mute)] mt-3">
                        TP-Link Omada · Starlink ISP · Zero-Trust Edge
                    </div>
                </div>
                <div className="col-span-12 md:col-span-4 rt-mono text-xs md:text-right space-y-1">
                    <div className="text-[color:var(--foreground-mute)]">INFRASTRUCTURE</div>
                    <div className="text-[color:var(--red-ink)]">SG3428</div>
                    <div className="text-[color:var(--foreground-mute)] mt-2">STATUS</div>
                    <div className="text-emerald-400">OPERATIONAL</div>
                </div>
            </header>

            <div className="rt-redline" />

            {/* Topology Diagram */}
            <section className="rt-panel rt-corner-tl p-6 overflow-x-auto">
                <div className="min-w-[900px] md:min-w-[1100px] relative" style={{ minHeight: '720px' }}>

                    {/* Internet / Starlink */}
                    <div className="absolute top-0 left-[40px]" style={{ zIndex: 1 }}>
                        <div className="bg-[color:var(--bg-elev)] border border-[color:var(--red-ink)]/50 p-4 relative group">
                            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[color:var(--red-ink)]" />
                            <div className="flex items-center gap-3 mb-2">
                                <Globe className="w-8 h-8 text-[color:var(--red-ink)]" />
                                <div>
                                    <h3 className="rt-display text-lg">Internet</h3>
                                    <div className="rt-mono text-xs text-[color:var(--foreground-mute)]">Starlink Mini</div>
                                </div>
                            </div>
                            <div className="mt-2 rt-mono text-xs text-emerald-400 inline-flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                CONNECTED
                            </div>
                        </div>
                        {/* Connection: Internet → ER605 */}
                        <div className="absolute left-1/2 top-full -translate-x-1/2 flex flex-col items-center">
                            <div className="w-px h-6 bg-[color:var(--red-core)] relative">
                                <div className="absolute w-1.5 h-1.5 bg-[color:var(--red-ink)] rounded-full -left-[3px] animate-pulse" style={{ animation: 'moveDown 1.5s infinite' }}></div>
                            </div>
                            <div className="rt-mono text-xs text-[color:var(--red-ink)] px-2 py-0.5 border border-[color:var(--red-ink)]/30 bg-[color:var(--bg-elev)]">
                                1000FDX
                            </div>
                            <div className="w-px h-4 bg-[color:var(--red-core)]" />
                        </div>
                    </div>

                    {/* ER605 Router */}
                    <div className="absolute top-[140px] left-[40px]" style={{ zIndex: 1 }}>
                        <div
                            onMouseEnter={() => setHoveredService(605)}
                            onMouseLeave={() => setHoveredService(null)}
                            className={`bg-[color:var(--bg-elev)] border p-4 cursor-pointer transition-all hover:scale-[1.02] relative ${hoveredService === 605 ? 'border-[color:var(--red-ink)] shadow-[0_0_20px_rgba(255,59,59,0.2)]' : 'border-[color:var(--red-ink)]/30'
                                }`}
                        >
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[color:var(--red-ink)]" />
                            <div className="flex items-center gap-3 mb-2">
                                <Network className="w-7 h-7 text-[color:var(--red-ink)]" />
                                <div>
                                    <div className="rt-mono text-[10px] text-[color:var(--foreground-mute)]">GATEWAY</div>
                                    <div className="rt-display text-lg">ER605</div>
                                    <div className="rt-mono text-xs text-[color:var(--foreground-mute)]">WAN1</div>
                                </div>
                            </div>
                            <div className="mt-2 rt-mono text-xs text-[color:var(--red-ink)]">
                                Port #1 ← Internet
                            </div>
                        </div>
                        {/* Connection: ER605 → Cerebro */}
                        <div className="absolute left-full top-1/2 -translate-y-1/2 flex items-center">
                            <div className="h-px w-[280px] bg-[color:var(--red-core)] relative">
                                <div className="absolute w-1.5 h-1.5 bg-[color:var(--red-ink)] rounded-full top-1/2 -translate-y-1/2 animate-pulse" style={{ animation: 'moveRight 2s infinite' }}></div>
                                <div className="absolute top-3 left-1/2 -translate-x-1/2 rt-mono text-xs text-[color:var(--red-ink)] whitespace-nowrap">
                                    Port #5 → Port #1
                                </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-[color:var(--red-ink)] -ml-1" />
                        </div>
                    </div>

                    {/* Cerebro SG3428 Switch - Central Hub */}
                    <div className="absolute top-[120px] left-[380px]" style={{ zIndex: 1 }}>
                        <div
                            onMouseEnter={() => setHoveredService(3428)}
                            onMouseLeave={() => setHoveredService(null)}
                            className={`bg-[color:var(--bg-panel)] border-2 p-5 cursor-pointer transition-all hover:scale-[1.02] relative ${hoveredService === 3428 ? 'border-[color:var(--red-ink)] shadow-[0_0_30px_rgba(255,59,59,0.25)]' : 'border-[color:var(--red-deep)]'
                                }`}
                        >
                            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[color:var(--red-ink)]" />
                            <div className="flex items-center gap-3 mb-3">
                                <Boxes className="w-8 h-8 text-[color:var(--red-ink)]" />
                                <div>
                                    <div className="rt-display text-2xl">Cerebro</div>
                                    <div className="rt-mono text-xs text-[color:var(--foreground-mute)]">SG3428 · Core Switch</div>
                                </div>
                            </div>
                            <div className="rt-mono text-xs text-[color:var(--red-ink)] space-y-1 bg-[color:var(--bg-elev)] p-3 border border-[color:var(--red-ink)]/20">
                                <div>← Port #1: ER605</div>
                                <div>→ Port #4: Omada Controller</div>
                                <div>→ Port #24: Antenitas</div>
                            </div>
                        </div>

                        {/* Connection: Cerebro → Omada Controller (Top Right) */}
                        <div className="absolute left-full top-[20px] flex items-center">
                            <svg width="200" height="80" className="overflow-visible">
                                <defs>
                                    <linearGradient id="redGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#dc2626" />
                                        <stop offset="100%" stopColor="#ff3b3b" />
                                    </linearGradient>
                                </defs>
                                <path d="M 0 40 Q 80 0 180 30" stroke="url(#redGrad1)" strokeWidth="1.5" fill="none" strokeDasharray="4,4">
                                    <animate attributeName="stroke-dashoffset" values="0;-16" dur="1s" repeatCount="indefinite" />
                                </path>
                                <circle r="3" fill="#ff3b3b">
                                    <animateMotion dur="2s" repeatCount="indefinite">
                                        <mpath href="#pathOmada" />
                                    </animateMotion>
                                </circle>
                                <path id="pathOmada" d="M 0 40 Q 80 0 180 30" fill="none" />
                                <text x="80" y="15" fill="#ff3b3b" fontSize="10" fontFamily="var(--font-mono)">1000FDX</text>
                            </svg>
                        </div>

                        {/* Connection: Cerebro → Antenitas (Right) */}
                        <div className="absolute left-full top-[90px] flex items-center">
                            <svg width="240" height="120" className="overflow-visible">
                                <defs>
                                    <linearGradient id="redGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#dc2626" />
                                        <stop offset="100%" stopColor="#ff3b3b" />
                                    </linearGradient>
                                </defs>
                                <path d="M 0 20 Q 120 60 220 100" stroke="url(#redGrad2)" strokeWidth="2" fill="none">
                                    <animate attributeName="stroke-dashoffset" values="0;-16" dur="1s" repeatCount="indefinite" />
                                </path>
                                <circle r="3" fill="#ff3b3b">
                                    <animateMotion dur="1.5s" repeatCount="indefinite">
                                        <mpath href="#pathAntenitas" />
                                    </animateMotion>
                                </circle>
                                <path id="pathAntenitas" d="M 0 20 Q 120 60 220 100" fill="none" />
                                <text x="80" y="80" fill="#ff3b3b" fontSize="10" fontFamily="var(--font-mono)">Port #24</text>
                            </svg>
                        </div>

                        {/* Connection: Cerebro → Client Group 7 (Down) */}
                        <div className="absolute left-1/2 top-full -translate-x-1/2 flex flex-col items-center">
                            <svg width="40" height="140" className="overflow-visible">
                                <line x1="20" y1="0" x2="20" y2="130" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4,4">
                                    <animate attributeName="stroke-dashoffset" values="0;-16" dur="1s" repeatCount="indefinite" />
                                </line>
                                <circle r="3" fill="#ff3b3b">
                                    <animateMotion dur="1.5s" repeatCount="indefinite">
                                        <mpath href="#pathClient7" />
                                    </animateMotion>
                                </circle>
                                <path id="pathClient7" d="M 20 0 L 20 130" fill="none" />
                            </svg>
                        </div>
                    </div>

                    {/* Omada Controller */}
                    <div className="absolute top-[80px] right-[80px]" style={{ zIndex: 1 }}>
                        <div
                            onMouseEnter={() => setHoveredService(101)}
                            onMouseLeave={() => setHoveredService(null)}
                            className={`bg-[color:var(--bg-elev)] border p-4 cursor-pointer transition-all hover:scale-[1.02] relative ${hoveredService === 101 ? 'border-[color:var(--rose-ink)] shadow-[0_0_15px_rgba(251,113,133,0.3)]' : 'border-[color:var(--rose-ink)]/40'
                                }`}
                        >
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[color:var(--rose-ink)]" />
                            <div className="flex items-center gap-2 mb-2">
                                <Monitor className="w-6 h-6 text-[color:var(--rose-ink)]" />
                                <div>
                                    <div className="rt-label text-sm">Omada Controller</div>
                                </div>
                            </div>
                            <div className="rt-mono text-xs text-[color:var(--rose-ink)]">
                                Port #4 ← Cerebro
                            </div>
                        </div>
                    </div>

                    {/* Antenitas EAP225-Outdoor */}
                    <div className="absolute top-[280px] left-[820px]" style={{ zIndex: 1 }}>
                        <div
                            onMouseEnter={() => setHoveredService(225)}
                            onMouseLeave={() => setHoveredService(null)}
                            className={`bg-[color:var(--bg-elev)] border p-4 cursor-pointer transition-all hover:scale-[1.02] relative ${hoveredService === 225 ? 'border-[color:var(--amber-warn)] shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'border-[color:var(--amber-warn)]/40'
                                }`}
                        >
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[color:var(--amber-warn)]" />
                            <div className="flex items-center gap-2 mb-2">
                                <Radio className="w-6 h-6 text-[color:var(--amber-warn)]" />
                                <div>
                                    <div className="rt-label text-sm">Antenitas</div>
                                    <div className="rt-mono text-xs text-[color:var(--foreground-mute)]">EAP225-Outdoor</div>
                                </div>
                            </div>
                            <div className="rt-mono text-xs text-[color:var(--amber-warn)] space-y-1">
                                <div>Port #24 ← Cerebro</div>
                                <div className="text-[color:var(--amber-warn)]/70">📶 6(b/g/n), 36(a/n/ac)</div>
                            </div>
                        </div>

                        {/* WiFi Connections from Antenitas */}
                        <div className="absolute left-1/2 top-full -translate-x-1/2 flex flex-col items-center">
                            <svg width="180" height="200" className="overflow-visible" style={{ marginLeft: '-40px' }}>
                                {/* WiFi → Client Group 6 */}
                                <path d="M 90 0 Q 60 80 40 120" stroke="#f59e0b" strokeWidth="1.5" fill="none" strokeDasharray="3,3">
                                    <animate attributeName="stroke-dashoffset" values="0;-12" dur="0.8s" repeatCount="indefinite" />
                                </path>
                                <circle r="2.5" fill="#f59e0b">
                                    <animateMotion dur="1s" repeatCount="indefinite">
                                        <mpath href="#pathWifi1" />
                                    </animateMotion>
                                </circle>
                                <path id="pathWifi1" d="M 90 0 Q 60 80 40 120" fill="none" />

                                {/* WiFi → Camera Group 4 */}
                                <path d="M 90 0 Q 120 100 100 180" stroke="#f59e0b" strokeWidth="1.5" fill="none" strokeDasharray="3,3">
                                    <animate attributeName="stroke-dashoffset" values="0;-12" dur="0.8s" repeatCount="indefinite" />
                                </path>
                                <circle r="2.5" fill="#f59e0b">
                                    <animateMotion dur="1.2s" repeatCount="indefinite">
                                        <mpath href="#pathWifi2" />
                                    </animateMotion>
                                </circle>
                                <path id="pathWifi2" d="M 90 0 Q 120 100 100 180" fill="none" />
                            </svg>
                        </div>
                    </div>

                    {/* Client Group 7 - Direct from Cerebro */}
                    <div className="absolute top-[420px] left-[380px]" style={{ zIndex: 1 }}>
                        <div
                            onMouseEnter={() => setHoveredService(7)}
                            onMouseLeave={() => setHoveredService(null)}
                            className={`bg-[color:var(--bg-elev)] border p-4 cursor-pointer transition-all hover:scale-[1.02] relative ${hoveredService === 7 ? 'border-[color:var(--red-ink)] shadow-[0_0_15px_rgba(255,59,59,0.2)]' : 'border-[color:var(--red-ink)]/30'
                                }`}
                        >
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[color:var(--red-ink)]" />
                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex gap-1">
                                    <Laptop className="w-5 h-5 text-[color:var(--red-ink)]" />
                                    <Smartphone className="w-5 h-5 text-[color:var(--red-ink)]" />
                                </div>
                                <div>
                                    <div className="rt-label text-sm">Client Group</div>
                                </div>
                                <div className="w-7 h-7 rounded-full bg-[color:var(--red-core)] text-white flex items-center justify-center text-sm font-bold rt-mono">
                                    7
                                </div>
                            </div>
                            <div className="rt-mono text-xs text-[color:var(--red-ink)]">
                                🔌 Wired (Cerebro)
                            </div>
                        </div>
                    </div>

                    {/* Client Group 6 - WiFi from Antenitas */}
                    <div className="absolute top-[480px] right-[140px]" style={{ zIndex: 1 }}>
                        <div
                            onMouseEnter={() => setHoveredService(6)}
                            onMouseLeave={() => setHoveredService(null)}
                            className={`bg-[color:var(--bg-elev)] border p-4 cursor-pointer transition-all hover:scale-[1.02] relative ${hoveredService === 6 ? 'border-[color:var(--rose-ink)] shadow-[0_0_15px_rgba(251,113,133,0.25)]' : 'border-[color:var(--rose-ink)]/30'
                                }`}
                        >
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[color:var(--rose-ink)]" />
                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex gap-1">
                                    <Laptop className="w-5 h-5 text-[color:var(--rose-ink)]" />
                                    <Smartphone className="w-5 h-5 text-[color:var(--rose-ink)]" />
                                </div>
                                <div>
                                    <div className="rt-label text-sm">Client Group</div>
                                </div>
                                <div className="w-7 h-7 rounded-full bg-[color:var(--rose-ink)] text-white flex items-center justify-center text-sm font-bold rt-mono">
                                    6
                                </div>
                            </div>
                            <div className="rt-mono text-xs text-[color:var(--amber-warn)]">
                                📶 WiFi (Antenitas)
                            </div>
                        </div>
                    </div>

                    {/* Camera Group 4 - WiFi from Antenitas */}
                    <div className="absolute top-[580px] right-[100px]" style={{ zIndex: 1 }}>
                        <div
                            onMouseEnter={() => setHoveredService(4)}
                            onMouseLeave={() => setHoveredService(null)}
                            className={`bg-[color:var(--bg-elev)] border p-4 cursor-pointer transition-all hover:scale-[1.02] relative ${hoveredService === 4 ? 'border-[color:var(--blood)] shadow-[0_0_15px_rgba(153,27,27,0.3)]' : 'border-[color:var(--blood)]/40'
                                }`}
                        >
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[color:var(--blood)]" />
                            <div className="flex items-center gap-2 mb-2">
                                <Camera className="w-6 h-6 text-[color:var(--blood)]" />
                                <div>
                                    <div className="rt-label text-sm">Camera Group</div>
                                </div>
                                <div className="w-7 h-7 rounded-full bg-[color:var(--blood)] text-white flex items-center justify-center text-sm font-bold rt-mono">
                                    4
                                </div>
                            </div>
                            <div className="rt-mono text-xs text-[color:var(--amber-warn)]">
                                📶 WiFi (Antenitas)
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Network Details */}
            <section className="grid md:grid-cols-2 gap-px bg-red-900/40 border border-red-900/40">
                <div className="bg-[color:var(--bg-panel)] p-6">
                    <div className="flex items-center justify-between mb-5">
                        <div className="rt-meta text-[color:var(--red-ink)]">// HARDWARE</div>
                        <Network className="w-5 h-5 text-[color:var(--red-ink)]" />
                    </div>
                    <div className="space-y-4 rt-mono text-sm">
                        <div className="flex justify-between items-center py-2 border-b border-[color:var(--red-ink)]/10">
                            <span className="text-[color:var(--foreground-mute)]">ISP</span>
                            <span className="text-[color:var(--foreground)]">Starlink Mini</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-[color:var(--red-ink)]/10">
                            <span className="text-[color:var(--foreground-mute)]">Router</span>
                            <span className="text-[color:var(--foreground)]">TP-Link ER605</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-[color:var(--red-ink)]/10">
                            <span className="text-[color:var(--foreground-mute)]">Switch</span>
                            <span className="text-[color:var(--foreground)]">SG3428 (Cerebro)</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-[color:var(--red-ink)]/10">
                            <span className="text-[color:var(--foreground-mute)]">Controller</span>
                            <span className="text-[color:var(--foreground)]">Omada Controller</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-[color:var(--foreground-mute)]">Access Point</span>
                            <span className="text-[color:var(--foreground)]">EAP225-Outdoor</span>
                        </div>
                    </div>
                </div>

                <div className="bg-[color:var(--bg-panel)] p-6">
                    <div className="flex items-center justify-between mb-5">
                        <div className="rt-meta text-[color:var(--red-ink)]">// TOPOLOGY</div>
                        <ArrowRight className="w-5 h-5 text-[color:var(--red-ink)]" />
                    </div>
                    <div className="space-y-4 rt-mono text-sm">
                        <div className="flex justify-between items-center py-2 border-b border-[color:var(--red-ink)]/10">
                            <span className="text-[color:var(--foreground-mute)]">Internet → ER605</span>
                            <span className="text-[color:var(--red-ink)]">1000FDX · Port #1</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-[color:var(--red-ink)]/10">
                            <span className="text-[color:var(--foreground-mute)]">ER605 → Cerebro</span>
                            <span className="text-[color:var(--red-ink)]">1000FDX · Port #5→#1</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-[color:var(--red-ink)]/10">
                            <span className="text-[color:var(--foreground-mute)]">Cerebro → Omada</span>
                            <span className="text-[color:var(--rose-ink)]">Port #4</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-[color:var(--red-ink)]/10">
                            <span className="text-[color:var(--foreground-mute)]">Cerebro → Antenitas</span>
                            <span className="text-[color:var(--amber-warn)]">Port #24</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-[color:var(--foreground-mute)]">Wi-Fi Standards</span>
                            <span className="text-[color:var(--amber-warn)]">6(b/g/n), 36(a/n/ac)</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Client Groups Info */}
            <section className="rt-panel rt-corner-tl p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="rt-meta text-[color:var(--red-ink)]">// CLIENT GROUPS</div>
                    <div className="rt-mono text-xs text-[color:var(--foreground-mute)]">3 GROUPS · 17 DEVICES</div>
                </div>

                <div className="grid md:grid-cols-3 gap-px bg-red-900/40 border border-red-900/40">
                    <div className="bg-[color:var(--bg-panel)] p-5 relative group">
                        <div className="absolute top-2 right-2 rt-mono text-[10px] text-[color:var(--foreground-mute)]/40">/01</div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-[color:var(--red-core)] text-white flex items-center justify-center rt-display text-lg">
                                7
                            </div>
                            <div>
                                <div className="rt-label text-[color:var(--foreground)]">Client Group 7</div>
                                <div className="rt-mono text-xs text-[color:var(--red-ink)]">WIRED</div>
                            </div>
                        </div>
                        <p className="text-sm text-[color:var(--foreground-dim)]">Direct connection to Cerebro switch</p>
                    </div>

                    <div className="bg-[color:var(--bg-panel)] p-5 relative group">
                        <div className="absolute top-2 right-2 rt-mono text-[10px] text-[color:var(--foreground-mute)]/40">/02</div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-[color:var(--rose-ink)] text-white flex items-center justify-center rt-display text-lg">
                                6
                            </div>
                            <div>
                                <div className="rt-label text-[color:var(--foreground)]">Client Group 6</div>
                                <div className="rt-mono text-xs text-[color:var(--rose-ink)]">WIFI</div>
                            </div>
                        </div>
                        <p className="text-sm text-[color:var(--foreground-dim)]">Wireless via Antenitas EAP225</p>
                    </div>

                    <div className="bg-[color:var(--bg-panel)] p-5 relative group">
                        <div className="absolute top-2 right-2 rt-mono text-[10px] text-[color:var(--foreground-mute)]/40">/03</div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-[color:var(--blood)] text-white flex items-center justify-center rt-display text-lg">
                                4
                            </div>
                            <div>
                                <div className="rt-label text-[color:var(--foreground)]">Camera Group 4</div>
                                <div className="rt-mono text-xs text-[color:var(--blood)]">SURVEILLANCE</div>
                            </div>
                        </div>
                        <p className="text-sm text-[color:var(--foreground-dim)]">Security cameras via Antenitas</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NetworkTopology;
