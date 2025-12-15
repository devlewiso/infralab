import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const Overview = () => {
    return (
        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
                <div>
                    <h2 className="text-3xl font-bold mb-4">Why This Matters</h2>
                    <div className="space-y-4 text-slate-300 text-lg">
                        <p>
                            This isn&apos;t a hobby project. It&apos;s a production-grade infrastructure lab that demonstrates
                            real-world systems engineering, operational excellence, and architectural depth.
                        </p>
                        <p>
                            Every component is chosen deliberately. Every boot sequence is orchestrated.
                            Every failure scenario is planned for.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
                        <div className="text-3xl font-bold text-blue-400 mb-2">4</div>
                        <div className="text-slate-400">Layered Startup Sequence</div>
                    </div>
                    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
                        <div className="text-3xl font-bold text-purple-400 mb-2">13</div>
                        <div className="text-slate-400">Orchestrated Services</div>
                    </div>
                    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
                        <div className="text-3xl font-bold text-emerald-400 mb-2">100%</div>
                        <div className="text-slate-400">Uptime Target</div>
                    </div>
                    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
                        <div className="text-3xl font-bold text-pink-400 mb-2">&lt;5min</div>
                        <div className="text-slate-400">Mean Time to Recovery</div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-800/50 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">What This Demonstrates</h3>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                            <span className="text-slate-300">Systems thinking & architecture design</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                            <span className="text-slate-300">Incident response & recovery procedures</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                            <span className="text-slate-300">Infrastructure reliability engineering</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                            <span className="text-slate-300">Real-world operational constraints</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Overview;

