'use client';

import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { layers } from './data';

interface ArchitectureProps {
    onServiceSelect: (service: any) => void;
}

const Architecture = ({ onServiceSelect }: ArchitectureProps) => {
    const [selectedLayer, setSelectedLayer] = useState<string | null>(null);

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8">Layered Boot Architecture</h2>
            <div className="mb-8 bg-slate-800/30 border border-slate-700 rounded-lg p-6">
                <p className="text-slate-300 text-lg">
                    The infrastructure follows a strict boot orchestration pattern where each layer depends on the previous one.
                    This ensures proper service initialization, dependency resolution, and graceful failure handling.
                </p>
            </div>

            <div className="space-y-6">
                {layers.map((layer) => (
                    <div
                        key={layer.id}
                        className={`bg-slate-800/50 backdrop-blur border rounded-xl overflow-hidden transition-all cursor-pointer ${selectedLayer === layer.id ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-700 hover:border-slate-600'
                            }`}
                        onClick={() => setSelectedLayer(selectedLayer === layer.id ? null : layer.id)}
                    >
                        <div className={`bg-gradient-to-r ${layer.color} p-6 flex items-center justify-between`}>
                            <div className="flex items-center gap-4">
                                <div className="bg-white/20 backdrop-blur p-3 rounded-lg">
                                    <layer.icon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">{layer.name}</h3>
                                    <p className="text-white/80 mt-1">{layer.purpose}</p>
                                </div>
                            </div>
                            <ChevronRight className={`w-6 h-6 text-white transition-transform ${selectedLayer === layer.id ? 'rotate-90' : ''}`} />
                        </div>

                        {selectedLayer === layer.id && (
                            <div className="p-6 space-y-4">
                                {layer.services.map((service) => (
                                    <div
                                        key={service.id}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onServiceSelect(service);
                                        }}
                                        className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 hover:border-blue-500/50 transition-all cursor-pointer"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="flex items-center gap-3">
                                                    <span className="font-mono text-sm text-slate-500">CT {service.id}</span>
                                                    <h4 className="font-semibold text-lg">{service.name}</h4>
                                                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs font-semibold">
                                                        {service.status}
                                                    </span>
                                                </div>
                                                <p className="text-slate-400 mt-1">{service.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Architecture;
