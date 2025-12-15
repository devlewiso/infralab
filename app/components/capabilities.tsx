import React from 'react';
import { Shield, Brain, Activity, Zap } from 'lucide-react';

const Capabilities = () => {
    const capabilities = [
        {
            icon: Shield,
            title: 'Zero-Trust Architecture',
            desc: 'Twingate-based secure remote access with network segmentation and controlled gateways',
            tech: ['Twingate', 'VLANs', 'Firewall Rules']
        },
        {
            icon: Brain,
            title: 'Local AI Inference',
            desc: 'Self-hosted LLM stack for privacy-first AI workloads without cloud dependencies',
            tech: ['Ollama', 'LLaMA', 'Custom Models']
        },
        {
            icon: Activity,
            title: 'Full Observability',
            desc: 'Real-time monitoring, alerting, and incident response with proper MTTR tracking',
            tech: ['Prometheus', 'Grafana', 'Custom Alerts']
        },
        {
            icon: Zap,
            title: 'Orchestrated Boot',
            desc: 'Layered startup sequence ensuring dependency resolution and graceful recovery',
            tech: ['Proxmox API', 'Systemd', 'Health Checks']
        }
    ];

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8">Key Capabilities</h2>
            <div className="grid md:grid-cols-2 gap-6">
                {capabilities.map((cap, idx) => (
                    <div
                        key={idx}
                        className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8 hover:border-blue-500/50 transition-all"
                    >
                        <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                            <cap.icon className="w-8 h-8 text-blue-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">{cap.title}</h3>
                        <p className="text-slate-300 mb-6">{cap.desc}</p>
                        <div className="flex flex-wrap gap-2">
                            {cap.tech.map((tech, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-full text-sm text-slate-300"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Capabilities;
