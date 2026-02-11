'use client';

import React, { useState } from 'react';
import { Server, Network, ChevronRight, Globe, Radio, Camera, Laptop, Smartphone, Monitor, Boxes } from 'lucide-react';
import Architecture from './Architecture';
import Capabilities from './capabilities';
import Insights from './Insights';
import Map from './map';
import Overview from './Overview';

const HomelabShowcase = () => {
    const [selectedService, setSelectedService] = useState<any>(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [hoveredService, setHoveredService] = useState<number | null>(null);




    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black text-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-rose-600/10" />
                <div className="relative max-w-7xl mx-auto px-6 py-20">
                    <div className="flex items-center gap-3 mb-6">
                        <Server className="w-8 h-8 text-red-400" />
                        <span className="text-red-400 font-mono text-sm tracking-wider">INFRASTRUCTURE LAB</span>
                    </div>
                    <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-red-400 via-rose-400 to-pink-400 bg-clip-text text-transparent">
                        Production-Grade Homelab
                    </h1>
                    <p className="text-2xl text-slate-300 mb-8 max-w-3xl">
                        A private on-premise infrastructure designed to experiment, validate, and operate
                        production-grade architectures for AI, DevOps, and secure access.
                    </p>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setActiveTab('architecture')}
                            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-all flex items-center gap-2"
                        >
                            Explore Architecture <ChevronRight className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setActiveTab('capabilities')}
                            className="px-6 py-3 border border-red-600 hover:border-red-400 rounded-lg font-semibold transition-all"
                        >
                            Key Capabilities
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex gap-8">
                        {['overview', 'map', 'network', 'architecture', 'capabilities', 'insights'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-4 px-2 font-semibold capitalize transition-all relative ${activeTab === tab ? 'text-red-400' : 'text-slate-500 hover:text-slate-300'
                                    }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-400" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                {activeTab === 'map' && (
                    <Map onServiceSelect={setSelectedService} />
                )}

                {activeTab === 'network' && (
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-bold mb-2">Intranet Network Topology</h2>
                                <p className="text-slate-400">TP-Link Omada Network Infrastructure - Starlink ISP</p>
                            </div>
                        </div>

                        <div className="relative bg-slate-900/50 border border-slate-700 rounded-xl p-6 md:p-8 overflow-x-auto">
                            <div className="min-w-[900px] md:min-w-[1100px] relative" style={{ minHeight: '720px' }}>

                                {/* Internet / Starlink */}
                                <div className="absolute top-0 left-[40px]" style={{ zIndex: 1 }}>
                                    <div className="bg-gradient-to-br from-blue-600/30 to-cyan-600/30 border-2 border-blue-500 rounded-xl p-4 shadow-lg shadow-blue-500/20">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Globe className="w-8 h-8 text-blue-400" />
                                            <div>
                                                <h3 className="text-lg font-bold">Internet</h3>
                                                <p className="text-xs text-slate-400">Starlink Mini</p>
                                            </div>
                                        </div>
                                        <div className="mt-2 px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs font-semibold inline-block">
                                            Connected
                                        </div>
                                    </div>
                                    {/* Connection: Internet → ER605 */}
                                    <div className="absolute left-1/2 top-full -translate-x-1/2 flex flex-col items-center">
                                        <div className="w-0.5 h-6 bg-gradient-to-b from-blue-500 to-green-500 relative">
                                            <div className="absolute w-2 h-2 bg-green-400 rounded-full -left-[3px] animate-pulse" style={{ animation: 'moveDown 1.5s infinite' }}></div>
                                        </div>
                                        <div className="bg-green-500/90 text-white text-xs px-2 py-0.5 rounded font-mono shadow-lg">
                                            1000FDX
                                        </div>
                                        <div className="w-0.5 h-4 bg-green-500"></div>
                                    </div>
                                </div>

                                {/* ER605 Router */}
                                <div className="absolute top-[140px] left-[40px]" style={{ zIndex: 1 }}>
                                    <div
                                        onMouseEnter={() => setHoveredService(605)}
                                        onMouseLeave={() => setHoveredService(null)}
                                        className={`bg-gradient-to-br from-slate-700/90 to-slate-800/90 border-2 rounded-xl p-4 shadow-xl cursor-pointer transition-all transform hover:scale-105 ${hoveredService === 605 ? 'border-green-500 ring-2 ring-green-500/30 shadow-green-500/20' : 'border-slate-600'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <Network className="w-7 h-7 text-green-400" />
                                            <div>
                                                <p className="text-xs font-mono text-slate-400">Gateway</p>
                                                <h3 className="text-lg font-bold">ER605</h3>
                                                <p className="text-xs text-slate-400">WAN1</p>
                                            </div>
                                        </div>
                                        <div className="mt-2 text-xs text-emerald-400 font-mono">
                                            Port #1 ← Internet
                                        </div>
                                    </div>
                                    {/* Connection: ER605 → Cerebro */}
                                    <div className="absolute left-full top-1/2 -translate-y-1/2 flex items-center">
                                        <div className="h-0.5 w-[280px] bg-gradient-to-r from-green-500 to-green-400 relative">
                                            <div className="absolute w-2 h-2 bg-green-300 rounded-full top-1/2 -translate-y-1/2 animate-pulse" style={{ animation: 'moveRight 2s infinite' }}></div>
                                            <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-green-500/90 text-white text-xs px-2 py-0.5 rounded font-mono shadow-lg whitespace-nowrap">
                                                Port #5 → Port #1
                                            </div>
                                        </div>
                                        <div className="w-3 h-3 border-t-2 border-r-2 border-green-400 rotate-45 -ml-1"></div>
                                    </div>
                                </div>

                                {/* Cerebro SG3428 Switch - Central Hub */}
                                <div className="absolute top-[120px] left-[380px]" style={{ zIndex: 1 }}>
                                    <div
                                        onMouseEnter={() => setHoveredService(3428)}
                                        onMouseLeave={() => setHoveredService(null)}
                                        className={`bg-gradient-to-br from-emerald-900/50 to-teal-900/50 border-2 rounded-xl p-5 shadow-xl cursor-pointer transition-all transform hover:scale-105 ${hoveredService === 3428 ? 'border-green-400 ring-2 ring-green-400/30 shadow-green-500/30' : 'border-green-600'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <Boxes className="w-8 h-8 text-green-400" />
                                            <div>
                                                <h3 className="text-xl font-bold">Cerebro</h3>
                                                <p className="text-sm text-slate-400">SG3428 - Core Switch</p>
                                            </div>
                                        </div>
                                        <div className="text-xs text-emerald-400 font-mono space-y-1 bg-slate-900/50 p-2 rounded">
                                            <div>← Port #1: ER605</div>
                                            <div>→ Port #4: Omada Controller</div>
                                            <div>→ Port #24: Antenitas</div>
                                        </div>
                                    </div>

                                    {/* Connection: Cerebro → Omada Controller (Top Right) */}
                                    <div className="absolute left-full top-[20px] flex items-center">
                                        <svg width="200" height="80" className="overflow-visible">
                                            <defs>
                                                <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="#22c55e" />
                                                    <stop offset="100%" stopColor="#a855f7" />
                                                </linearGradient>
                                            </defs>
                                            <path d="M 0 40 Q 80 0 180 30" stroke="url(#purpleGrad)" strokeWidth="2" fill="none" strokeDasharray="6,4">
                                                <animate attributeName="stroke-dashoffset" values="0;-20" dur="1s" repeatCount="indefinite" />
                                            </path>
                                            <circle r="4" fill="#a855f7">
                                                <animateMotion dur="2s" repeatCount="indefinite">
                                                    <mpath href="#pathOmada" />
                                                </animateMotion>
                                            </circle>
                                            <path id="pathOmada" d="M 0 40 Q 80 0 180 30" fill="none" />
                                            <text x="80" y="15" fill="#22c55e" fontSize="10" fontFamily="monospace">1000FDX</text>
                                        </svg>
                                    </div>

                                    {/* Connection: Cerebro → Antenitas (Right) */}
                                    <div className="absolute left-full top-[90px] flex items-center">
                                        <svg width="200" height="120" className="overflow-visible">
                                            <defs>
                                                <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="#22c55e" />
                                                    <stop offset="100%" stopColor="#f59e0b" />
                                                </linearGradient>
                                            </defs>
                                            <path d="M 0 20 Q 100 60 180 100" stroke="url(#amberGrad)" strokeWidth="3" fill="none">
                                                <animate attributeName="stroke-dashoffset" values="0;-20" dur="1s" repeatCount="indefinite" />
                                            </path>
                                            <circle r="4" fill="#f59e0b">
                                                <animateMotion dur="1.5s" repeatCount="indefinite">
                                                    <mpath href="#pathAntenitas" />
                                                </animateMotion>
                                            </circle>
                                            <path id="pathAntenitas" d="M 0 20 Q 100 60 180 100" fill="none" />
                                            <text x="70" y="80" fill="#22c55e" fontSize="10" fontFamily="monospace">Port #24</text>
                                        </svg>
                                    </div>

                                    {/* Connection: Cerebro → Client Group 7 (Down) */}
                                    <div className="absolute left-1/2 top-full -translate-x-1/2 flex flex-col items-center">
                                        <svg width="40" height="140" className="overflow-visible">
                                            <line x1="20" y1="0" x2="20" y2="130" stroke="#22c55e" strokeWidth="2" strokeDasharray="6,4">
                                                <animate attributeName="stroke-dashoffset" values="0;-20" dur="1s" repeatCount="indefinite" />
                                            </line>
                                            <circle r="4" fill="#22c55e">
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
                                        className={`bg-gradient-to-br from-purple-600/30 to-purple-800/30 border-2 rounded-xl p-4 shadow-lg cursor-pointer transition-all transform hover:scale-105 ${hoveredService === 101 ? 'border-purple-400 ring-2 ring-purple-400/30 shadow-purple-500/30' : 'border-purple-600'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <Monitor className="w-6 h-6 text-purple-400" />
                                            <div>
                                                <h4 className="text-sm font-bold">Omada Controller</h4>
                                            </div>
                                        </div>
                                        <div className="text-xs text-purple-300 font-mono">
                                            Port #4 ← Cerebro
                                        </div>
                                    </div>
                                </div>

                                {/* Antenitas EAP225-Outdoor */}
                                <div className="absolute top-[280px] right-[60px]" style={{ zIndex: 1 }}>
                                    <div
                                        onMouseEnter={() => setHoveredService(225)}
                                        onMouseLeave={() => setHoveredService(null)}
                                        className={`bg-gradient-to-br from-amber-600/30 to-orange-700/30 border-2 rounded-xl p-4 shadow-lg cursor-pointer transition-all transform hover:scale-105 ${hoveredService === 225 ? 'border-amber-400 ring-2 ring-amber-400/30 shadow-amber-500/30' : 'border-amber-600'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <Radio className="w-6 h-6 text-amber-400" />
                                            <div>
                                                <h4 className="text-sm font-bold">Antenitas</h4>
                                                <p className="text-xs text-slate-400">EAP225-Outdoor</p>
                                            </div>
                                        </div>
                                        <div className="text-xs text-amber-300 font-mono space-y-1">
                                            <div>Port #24 ← Cerebro</div>
                                            <div className="text-amber-400/70">📶 6(b/g/n), 36(a/n/ac)</div>
                                        </div>
                                    </div>

                                    {/* WiFi Connections from Antenitas */}
                                    <div className="absolute left-1/2 top-full -translate-x-1/2 flex flex-col items-center">
                                        <svg width="180" height="200" className="overflow-visible" style={{ marginLeft: '-40px' }}>
                                            {/* WiFi → Client Group 6 */}
                                            <path d="M 90 0 Q 60 80 40 120" stroke="#fbbf24" strokeWidth="2" fill="none" strokeDasharray="4,4">
                                                <animate attributeName="stroke-dashoffset" values="0;-16" dur="0.8s" repeatCount="indefinite" />
                                            </path>
                                            <circle r="3" fill="#fbbf24">
                                                <animateMotion dur="1s" repeatCount="indefinite">
                                                    <mpath href="#pathWifi1" />
                                                </animateMotion>
                                            </circle>
                                            <path id="pathWifi1" d="M 90 0 Q 60 80 40 120" fill="none" />

                                            {/* WiFi → Camera Group 4 */}
                                            <path d="M 90 0 Q 120 100 100 180" stroke="#fbbf24" strokeWidth="2" fill="none" strokeDasharray="4,4">
                                                <animate attributeName="stroke-dashoffset" values="0;-16" dur="0.8s" repeatCount="indefinite" />
                                            </path>
                                            <circle r="3" fill="#fbbf24">
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
                                        className={`bg-gradient-to-br from-cyan-600/30 to-blue-700/30 border-2 rounded-xl p-4 shadow-lg cursor-pointer transition-all transform hover:scale-105 ${hoveredService === 7 ? 'border-cyan-400 ring-2 ring-cyan-400/30 shadow-cyan-500/30' : 'border-cyan-600'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="flex gap-1">
                                                <Laptop className="w-5 h-5 text-cyan-400" />
                                                <Smartphone className="w-5 h-5 text-cyan-400" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold">Client Group</h4>
                                            </div>
                                            <div className="w-7 h-7 rounded-full bg-cyan-500 text-white flex items-center justify-center text-sm font-bold shadow-lg">
                                                7
                                            </div>
                                        </div>
                                        <div className="text-xs text-cyan-300 font-mono">
                                            🔌 Wired (Cerebro)
                                        </div>
                                    </div>
                                </div>

                                {/* Client Group 6 - WiFi from Antenitas */}
                                <div className="absolute top-[480px] right-[140px]" style={{ zIndex: 1 }}>
                                    <div
                                        onMouseEnter={() => setHoveredService(6)}
                                        onMouseLeave={() => setHoveredService(null)}
                                        className={`bg-gradient-to-br from-cyan-600/30 to-blue-700/30 border-2 rounded-xl p-4 shadow-lg cursor-pointer transition-all transform hover:scale-105 ${hoveredService === 6 ? 'border-cyan-400 ring-2 ring-cyan-400/30 shadow-cyan-500/30' : 'border-cyan-600'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="flex gap-1">
                                                <Laptop className="w-5 h-5 text-cyan-400" />
                                                <Smartphone className="w-5 h-5 text-cyan-400" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold">Client Group</h4>
                                            </div>
                                            <div className="w-7 h-7 rounded-full bg-cyan-500 text-white flex items-center justify-center text-sm font-bold shadow-lg">
                                                6
                                            </div>
                                        </div>
                                        <div className="text-xs text-amber-300 font-mono">
                                            📶 WiFi (Antenitas)
                                        </div>
                                    </div>
                                </div>

                                {/* Camera Group 4 - WiFi from Antenitas */}
                                <div className="absolute top-[580px] right-[100px]" style={{ zIndex: 1 }}>
                                    <div
                                        onMouseEnter={() => setHoveredService(4)}
                                        onMouseLeave={() => setHoveredService(null)}
                                        className={`bg-gradient-to-br from-red-600/30 to-rose-800/30 border-2 rounded-xl p-4 shadow-lg cursor-pointer transition-all transform hover:scale-105 ${hoveredService === 4 ? 'border-red-400 ring-2 ring-red-400/30 shadow-red-500/30' : 'border-red-600'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <Camera className="w-6 h-6 text-red-400" />
                                            <div>
                                                <h4 className="text-sm font-bold">Camera Group</h4>
                                            </div>
                                            <div className="w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-bold shadow-lg">
                                                4
                                            </div>
                                        </div>
                                        <div className="text-xs text-amber-300 font-mono">
                                            📶 WiFi (Antenitas)
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Network Details */}
                        <div className="mt-8 grid md:grid-cols-2 gap-6">
                            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Network className="w-5 h-5 text-blue-400" />
                                    Network Equipment
                                </h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">ISP:</span>
                                        <span className="text-slate-200 font-semibold">Starlink Mini</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Router:</span>
                                        <span className="text-slate-200 font-semibold">TP-Link ER605</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Switch:</span>
                                        <span className="text-slate-200 font-semibold">TP-Link SG3428 (Cerebro)</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Controller:</span>
                                        <span className="text-slate-200 font-semibold">Omada Controller</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Access Point:</span>
                                        <span className="text-slate-200 font-semibold">EAP225-Outdoor (Antenitas)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Network className="w-5 h-5 text-green-400" />
                                    Connection Details
                                </h3>
                                <div className="space-y-3 text-sm">
                                    <div>
                                        <span className="text-slate-400">Internet → ER605:</span>
                                        <span className="ml-2 text-green-400 font-mono">1000FDX (Port #1)</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400">ER605 → Cerebro:</span>
                                        <span className="ml-2 text-green-400 font-mono">1000FDX (Port #5 → #1)</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400">Cerebro → Omada Controller:</span>
                                        <span className="ml-2 text-green-400 font-mono">Port #4</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400">Cerebro → Antenitas:</span>
                                        <span className="ml-2 text-green-400 font-mono">Port #24</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400">Wi-Fi Standards:</span>
                                        <span className="ml-2 text-amber-400 font-mono">6(b/g/n), 36(a/n/ac)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Client Groups Info */}
                        <div className="mt-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-800/50 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4">Connected Groups</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-slate-800/50 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                                            7
                                        </div>
                                        <h4 className="font-semibold">Client Group 7</h4>
                                    </div>
                                    <p className="text-sm text-slate-400">Direct connection to Cerebro switch</p>
                                </div>
                                <div className="bg-slate-800/50 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                                            6
                                        </div>
                                        <h4 className="font-semibold">Client Group 6</h4>
                                    </div>
                                    <p className="text-sm text-slate-400">Wireless via Antenitas EAP225</p>
                                </div>
                                <div className="bg-slate-800/50 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold">
                                            4
                                        </div>
                                        <h4 className="font-semibold">Camera Group 4</h4>
                                    </div>
                                    <p className="text-sm text-slate-400">Security cameras via Antenitas</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'overview' && (
                    <Overview />
                )}

                {activeTab === 'architecture' && (
                    <Architecture onServiceSelect={setSelectedService} />
                )}

                {activeTab === 'capabilities' && (
                    <Capabilities />
                )}

                {activeTab === 'insights' && (
                    <Insights />
                )}
            </div>

            {/* Service Detail Modal */}
            {selectedService && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6"
                    onClick={() => setSelectedService(null)}
                >
                    <div
                        className="bg-slate-900 border border-slate-700 rounded-xl max-w-2xl w-full p-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold">{selectedService.name}</h3>
                            <button
                                onClick={() => setSelectedService(null)}
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <span className="text-slate-400">Container ID:</span>
                                <span className="ml-3 font-mono text-blue-400">{selectedService.id}</span>
                            </div>
                            <div>
                                <span className="text-slate-400">Description:</span>
                                <p className="mt-2 text-slate-300">{selectedService.desc}</p>
                            </div>
                            <div>
                                <span className="text-slate-400">Status:</span>
                                <span className="ml-3 px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded text-sm font-semibold">
                                    {selectedService.status}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomelabShowcase;
