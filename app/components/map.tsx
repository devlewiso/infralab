'use client';

import React, { useState } from 'react';
import { Server, Shield, Database, Network, Activity, Zap, Globe, HardDrive, Radio, Camera, Laptop, Smartphone, Monitor, Boxes, Brain } from 'lucide-react';
import { layers } from './data';

interface MapProps {
    onServiceSelect: (service: any) => void;
}

const Map = ({ onServiceSelect }: MapProps) => {
    const [animationPhase, setAnimationPhase] = useState<number>(0);
    const [hoveredService, setHoveredService] = useState<number | null>(null);

    // Helper map for icons
    const IconMap: { [key: string]: any } = {
        Network: Network,
        Shield: Shield,
        Activity: Activity,
        Database: Database,
        Zap: Zap,
        Globe: Globe,
        Brain: Activity, // Brain is not imported in data.ts but used in layers as icon component, checking data.ts
        HardDrive: HardDrive
    };

    // We need to re-map the icons from data.ts because they are stored as components there
    // but here we are importing them again. Actually, in data.ts they are imported from lucide-react.
    // So layers[i].icon is the component itself.

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold mb-2">Interactive Architecture Map</h2>
                    <p className="text-slate-400">Visual representation of the layered boot sequence</p>
                </div>
                <button
                    onClick={() => {
                        setAnimationPhase(0);
                        setTimeout(() => setAnimationPhase(1), 300);
                        setTimeout(() => setAnimationPhase(2), 2500);
                        setTimeout(() => setAnimationPhase(3), 4500);
                        setTimeout(() => setAnimationPhase(4), 6500);
                        setTimeout(() => setAnimationPhase(0), 8500);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all flex items-center gap-2"
                >
                    <Zap className="w-4 h-4" />
                    Animate Boot Sequence
                </button>
            </div>

            <div className="relative bg-slate-900/50 border border-slate-700 rounded-xl p-4 md:p-8 overflow-x-auto">
                <div className="min-w-[600px] md:min-w-[800px] relative" style={{ minHeight: '900px' }}>
                    {/* Proxmox Host Node */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10">
                        <div className="bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-slate-600 rounded-xl p-6 shadow-2xl">
                            <div className="flex items-center gap-3 mb-2">
                                <Server className="w-8 h-8 text-blue-400" />
                                <h3 className="text-xl font-bold">🖥️ Proxmox Host</h3>
                            </div>
                            <p className="text-sm text-slate-400 font-mono">nosotros</p>
                        </div>
                        {/* Connection line to Layer 1 */}
                        <div className="absolute top-full left-1/2 w-0.5 h-16 transform -translate-x-1/2">
                            <div className={`absolute inset-0 bg-gradient-to-b from-slate-600 to-amber-500/50 transition-all duration-1000 ${animationPhase >= 1 ? 'opacity-100' : 'opacity-50'
                                }`} />
                            {animationPhase >= 1 && (
                                <div className="absolute inset-0 bg-amber-400/30 animate-pulse" style={{
                                    animation: 'flowDown 2s ease-in-out infinite'
                                }} />
                            )}
                        </div>
                    </div>

                    {/* Layer 1: Infra Base */}
                    <div className="absolute top-32 left-0 right-0">
                        <div className="mb-4 text-center">
                            <h3 className="text-2xl font-bold text-amber-400 mb-2">🥇 Capa 1: Infra Base</h3>
                            <p className="text-sm text-slate-400">Foundation layer - Secure access, network control, monitoring</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { id: 101, name: 'Ommada21', desc: 'Network Controller', icon: Network },
                                { id: 102, name: 'twingate-connector', desc: 'Zero Trust Access', icon: Shield },
                                { id: 120, name: 'Monitoring30', desc: 'Monitoring', icon: Activity }
                            ].map((service, idx) => (
                                <div
                                    key={service.id}
                                    onMouseEnter={() => setHoveredService(service.id)}
                                    onMouseLeave={() => setHoveredService(null)}
                                    onClick={() => {
                                        const foundService = layers[0].services.find(s => s.id === service.id);
                                        if (foundService) onServiceSelect(foundService);
                                    }}
                                    className={`relative bg-gradient-to-br from-amber-500/20 to-orange-600/20 border-2 rounded-xl p-4 cursor-pointer transition-all transform hover:scale-105 ${animationPhase >= 1 ? 'border-amber-500 shadow-lg shadow-amber-500/20' : 'border-slate-700'
                                        } ${hoveredService === service.id ? 'ring-2 ring-amber-400' : ''}`}
                                    style={{
                                        animationDelay: `${idx * 200}ms`,
                                        animation: animationPhase >= 1 ? 'pulse 1s ease-in-out' : 'none'
                                    }}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <service.icon className="w-5 h-5 text-amber-400" />
                                        <span className="font-mono text-xs text-slate-400">{service.id}</span>
                                    </div>
                                    <h4 className="font-bold text-sm mb-1">{service.name}</h4>
                                    <p className="text-xs text-slate-400">{service.desc}</p>
                                    {hoveredService === service.id && (
                                        <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                                            Click for details
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        {/* Connection line to Layer 2 */}
                        <div className="absolute bottom-0 left-1/2 w-0.5 h-16 transform -translate-x-1/2">
                            <div className={`absolute inset-0 bg-gradient-to-b from-amber-500/50 to-blue-500/50 transition-all duration-1000 ${animationPhase >= 2 ? 'opacity-100' : 'opacity-50'
                                }`} />
                            {animationPhase >= 2 && (
                                <div className="absolute inset-0 bg-blue-400/30 animate-pulse" style={{
                                    animation: 'flowDown 2s ease-in-out infinite'
                                }} />
                            )}
                        </div>
                    </div>

                    {/* Layer 2: Servicios Core */}
                    <div className="absolute top-[420px] left-0 right-0">
                        <div className="mb-4 text-center">
                            <h3 className="text-2xl font-bold text-blue-400 mb-2">🥈 Capa 2: Servicios Core</h3>
                            <p className="text-sm text-slate-400">Data & Backend layer - Databases and backend systems</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { id: 159, name: 'dbEmpleosdelatlantico', desc: 'Database', icon: Database },
                                { id: 155, name: 'nodebb', desc: 'Forum Backend', icon: Network },
                                { id: 124, name: 'devops-lab', desc: 'Dev / CI Lab', icon: Zap }
                            ].map((service, idx) => (
                                <div
                                    key={service.id}
                                    onMouseEnter={() => setHoveredService(service.id)}
                                    onMouseLeave={() => setHoveredService(null)}
                                    onClick={() => {
                                        const foundService = layers[1].services.find(s => s.id === service.id);
                                        if (foundService) onServiceSelect(foundService);
                                    }}
                                    className={`relative bg-gradient-to-br from-blue-500/20 to-indigo-600/20 border-2 rounded-xl p-4 cursor-pointer transition-all transform hover:scale-105 ${animationPhase >= 2 ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-slate-700'
                                        } ${hoveredService === service.id ? 'ring-2 ring-blue-400' : ''}`}
                                    style={{
                                        animationDelay: `${idx * 200}ms`,
                                        animation: animationPhase >= 2 ? 'pulse 1s ease-in-out' : 'none'
                                    }}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <service.icon className="w-5 h-5 text-blue-400" />
                                        <span className="font-mono text-xs text-slate-400">{service.id}</span>
                                    </div>
                                    <h4 className="font-bold text-sm mb-1">{service.name}</h4>
                                    <p className="text-xs text-slate-400">{service.desc}</p>
                                    {hoveredService === service.id && (
                                        <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                                            Click for details
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        {/* Connection line to Layer 3 */}
                        <div className="absolute bottom-0 left-1/2 w-0.5 h-16 transform -translate-x-1/2">
                            <div className={`absolute inset-0 bg-gradient-to-b from-blue-500/50 to-purple-500/50 transition-all duration-1000 ${animationPhase >= 3 ? 'opacity-100' : 'opacity-50'
                                }`} />
                            {animationPhase >= 3 && (
                                <div className="absolute inset-0 bg-purple-400/30 animate-pulse" style={{
                                    animation: 'flowDown 2s ease-in-out infinite'
                                }} />
                            )}
                        </div>
                    </div>

                    {/* Layer 3: Apps / Web */}
                    <div className="absolute top-[620px] left-0 right-0">
                        <div className="mb-4 text-center">
                            <h3 className="text-2xl font-bold text-purple-400 mb-2">🥉 Capa 3: Apps / Web</h3>
                            <p className="text-sm text-slate-400">Application layer - Web services, AI workloads, custom platforms</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { id: 122, name: 'web-lab22', desc: 'Web Services', icon: Globe },
                                { id: 243, name: 'ollamaServer', desc: 'AI / LLM', icon: Brain }, // Brain icon was not in lucide-react list above, imported now? No, using Activity as fallback if needed but Brain is in lucide-react. I'll import Brain.
                                { id: 289, name: 'ridemotohub', desc: 'App Platform', icon: Network }
                            ].map((service, idx) => (
                                <div
                                    key={service.id}
                                    onMouseEnter={() => setHoveredService(service.id)}
                                    onMouseLeave={() => setHoveredService(null)}
                                    onClick={() => {
                                        const foundService = layers[2].services.find(s => s.id === service.id);
                                        if (foundService) onServiceSelect(foundService);
                                    }}
                                    className={`relative bg-gradient-to-br from-purple-500/20 to-pink-600/20 border-2 rounded-xl p-4 cursor-pointer transition-all transform hover:scale-105 ${animationPhase >= 3 ? 'border-purple-500 shadow-lg shadow-purple-500/20' : 'border-slate-700'
                                        } ${hoveredService === service.id ? 'ring-2 ring-purple-400' : ''}`}
                                    style={{
                                        animationDelay: `${idx * 200}ms`,
                                        animation: animationPhase >= 3 ? 'pulse 1s ease-in-out' : 'none'
                                    }}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <service.icon className="w-5 h-5 text-purple-400" />
                                        <span className="font-mono text-xs text-slate-400">{service.id}</span>
                                    </div>
                                    <h4 className="font-bold text-sm mb-1">{service.name}</h4>
                                    <p className="text-xs text-slate-400">{service.desc}</p>
                                    {hoveredService === service.id && (
                                        <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                                            Click for details
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        {/* Connection line to Layer 4 */}
                        <div className="absolute bottom-0 left-1/2 w-0.5 h-16 transform -translate-x-1/2">
                            <div className={`absolute inset-0 bg-gradient-to-b from-purple-500/50 to-emerald-500/50 transition-all duration-1000 ${animationPhase >= 4 ? 'opacity-100' : 'opacity-50'
                                }`} />
                            {animationPhase >= 4 && (
                                <div className="absolute inset-0 bg-emerald-400/30 animate-pulse" style={{
                                    animation: 'flowDown 2s ease-in-out infinite'
                                }} />
                            )}
                        </div>
                    </div>

                    {/* Layer 4: Usuario / Media */}
                    <div className="absolute top-[820px] left-0 right-0">
                        <div className="mb-4 text-center">
                            <h3 className="text-2xl font-bold text-emerald-400 mb-2">🟦 Capa 4: Usuario / Media</h3>
                            <p className="text-sm text-slate-400">User-facing layer - Media, automation, security</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { id: 100, name: 'CasaOSMedia105', desc: 'Media Server', icon: HardDrive },
                                { id: 200, name: 'homeassistant119', desc: 'Home Automation', icon: Activity },
                                { id: 104, name: 'NVR69', desc: 'Video Surveillance', icon: Shield }
                            ].map((service, idx) => (
                                <div
                                    key={service.id}
                                    onMouseEnter={() => setHoveredService(service.id)}
                                    onMouseLeave={() => setHoveredService(null)}
                                    onClick={() => {
                                        const foundService = layers[3].services.find(s => s.id === service.id);
                                        if (foundService) onServiceSelect(foundService);
                                    }}
                                    className={`relative bg-gradient-to-br from-emerald-500/20 to-teal-600/20 border-2 rounded-xl p-4 cursor-pointer transition-all transform hover:scale-105 ${animationPhase >= 4 ? 'border-emerald-500 shadow-lg shadow-emerald-500/20' : 'border-slate-700'
                                        } ${hoveredService === service.id ? 'ring-2 ring-emerald-400' : ''}`}
                                    style={{
                                        animationDelay: `${idx * 200}ms`,
                                        animation: animationPhase >= 4 ? 'pulse 1s ease-in-out' : 'none'
                                    }}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <service.icon className="w-5 h-5 text-emerald-400" />
                                        <span className="font-mono text-xs text-slate-400">{service.id}</span>
                                    </div>
                                    <h4 className="font-bold text-sm mb-1">{service.name}</h4>
                                    <p className="text-xs text-slate-400">{service.desc}</p>
                                    {hoveredService === service.id && (
                                        <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                                            Click for details
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="mt-8 bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4">Map Legend</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-amber-500 rounded"></div>
                        <span className="text-slate-300">Layer 1: Foundation services boot first</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <span className="text-slate-300">Layer 2: Core services depend on Layer 1</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-purple-500 rounded"></div>
                        <span className="text-slate-300">Layer 3: Applications depend on Layers 1-2</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                        <span className="text-slate-300">Layer 4: User services depend on all layers</span>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-700">
                    <p className="text-slate-400 text-sm">
                        💡 <strong>Tip:</strong> Click on any service to view details. Hover to highlight connections.
                        Use &quot;Animate Boot Sequence&quot; to see the startup flow.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Map;

