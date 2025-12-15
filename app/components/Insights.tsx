import React from 'react';
import { AlertCircle } from 'lucide-react';

const Insights = () => {
    const architectureInsights = [
        'Container (CT) vs VM decisions based on isolation requirements and resource efficiency',
        'Storage timing coordination for network-mounted volumes and boot dependencies',
        'DNS and NTP synchronization handled at infrastructure layer before app startup',
        'MTU optimization and network bridge configuration for performance',
        'Controlled shutdown and recovery procedures for zero-data-loss guarantees'
    ];

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8">Architecture Insights</h2>
            <div className="space-y-6">
                <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                        <AlertCircle className="w-6 h-6 text-blue-400" />
                        Real-World Constraints
                    </h3>
                    <p className="text-slate-300 mb-6">
                        This infrastructure handles the same challenges you&apos;d find in production environments.
                        Every decision is documented, every tradeoff is intentional.
                    </p>
                </div>

                <div className="grid gap-4">
                    {architectureInsights.map((insight, idx) => (
                        <div
                            key={idx}
                            className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 hover:border-blue-500/30 transition-all"
                        >
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                                    {idx + 1}
                                </div>
                                <p className="text-slate-300 text-lg">{insight}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-800/50 rounded-xl p-8 mt-8">
                    <h3 className="text-2xl font-bold mb-4">Technical Stack</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <h4 className="font-semibold text-blue-400 mb-3">Infrastructure</h4>
                            <ul className="space-y-2 text-slate-300">
                                <li>• Proxmox VE</li>
                                <li>• LXC Containers</li>
                                <li>• KVM Virtual Machines</li>
                                <li>• ZFS Storage</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-purple-400 mb-3">Networking</h4>
                            <ul className="space-y-2 text-slate-300">
                                <li>• VLANs & Segmentation</li>
                                <li>• Twingate Zero-Trust</li>
                                <li>• pfSense Gateway</li>
                                <li>• Internal DNS</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-emerald-400 mb-3">Operations</h4>
                            <ul className="space-y-2 text-slate-300">
                                <li>• Prometheus Monitoring</li>
                                <li>• Grafana Dashboards</li>
                                <li>• Automated Backups</li>
                                <li>• Health Checks</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Insights;

