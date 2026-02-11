import React, { useState, useEffect } from 'react';
import { Server, Cloud, Laptop, Database, Activity, Shield, Eye, Zap, Container, HardDrive, Video, Home, Box, GitBranch, Layers, Terminal, Skull, Lock, Cpu, MemoryStick, Gauge, LucideIcon } from 'lucide-react';

interface CPUDataPoint {
    time: number;
    cpu: number;
    io: number;
}

interface ServiceType {
    name: string;
    icon: LucideIcon;
    type: string;
}

interface NodeData {
    name: string;
    status?: string;
    services?: ServiceType[];
    icon?: LucideIcon;
    type?: string;
    description?: string;
}

const HomelabDiagram = () => {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const [selectedNode, setSelectedNode] = useState<string | null>(null);
    const [cpuData, setCpuData] = useState<CPUDataPoint[]>([]);

    // Simulate CPU usage data like in Proxmox
    useEffect(() => {
        const generateCPUData = () => {
            const points = 50;
            return Array.from({ length: points }, (_, i) => ({
                time: i,
                cpu: 1.5 + Math.random() * 1.5, // Random between 1.5 and 3
                io: Math.random() * 0.5 // Low IO delay
            }));
        };
        setCpuData(generateCPUData());

        const interval = setInterval(() => {
            setCpuData(prev => {
                const newData = [...prev.slice(1)];
                newData.push({
                    time: prev[prev.length - 1].time + 1,
                    cpu: 1.5 + Math.random() * 1.5,
                    io: Math.random() * 0.5
                });
                return newData;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const proxmoxStats = {
        hostname: 'nosotros',
        uptime: '19:39:33',
        cpuUsage: '2.00% of 16 CPU(s)',
        cpuModel: '16 x AMD Ryzen 7 5700G with Radeon Graphics (1 Socket)',
        loadAverage: '0.40,0.97,1.10',
        ramUsage: '58.82% (13.39 GiB of 22.77 GiB)',
        ramUsed: '13.39 GiB',
        ramTotal: '22.77 GiB',
        hdSpace: '13.85% (31.21 GiB of 225.31 GiB)',
        hdUsed: '31.21 GiB',
        hdTotal: '225.31 GiB',
        swapUsage: '10.57% (865.84 MiB of 8.00 GiB)',
        kernelVersion: 'Linux 6.17.9-1-pve (2026-01-12T16:25Z)',
        bootMode: 'EFI',
        managerVersion: 'pve-manager/9.1.5/80fc2a64bef6889',
        ioDelay: '0.00%',
        ksmSharing: '0 B'
    };

    const nodes = {
        cloud: {
            github: { name: 'GitHub Repos', icon: GitBranch, type: 'cloud' },
            netlify: { name: 'Netlify Hosting', icon: Cloud, type: 'cloud' },
            laptop: { name: 'Laptop / Code Editor', icon: Laptop, type: 'cloud' }
        },
        lxc102: {
            name: 'LXC 102: twingate-connector53',
            status: 'running',
            services: [
                { name: 'Twingate Connector', icon: Shield, type: 'docker' },
                { name: 'Zero Trust Network', icon: Lock, type: 'docker' }
            ]
        },
        lxc103: {
            name: 'LXC 103: srv-kong-gateway',
            status: 'running',
            services: [
                { name: 'Kong API Gateway', icon: Shield, type: 'docker' },
                { name: 'Konga Manager', icon: Layers, type: 'docker' },
                { name: 'Portainer Agent :9001', icon: Container, type: 'docker' },
                { name: 'Postgres 13', icon: Database, type: 'database' }
            ]
        },
        lxc120: {
            name: 'LXC 120: Monitoring30',
            status: 'running',
            services: [
                { name: 'n8n Automations', icon: Zap, type: 'docker' },
                { name: 'Cloudflare Tunnel', icon: Shield, type: 'docker' },
                { name: 'Grafana 12.3.2', icon: Activity, type: 'docker' },
                { name: 'Prometheus', icon: Activity, type: 'docker' },
                { name: 'Promtail Agent', icon: Activity, type: 'docker' },
                { name: 'Uptime Kuma', icon: Eye, type: 'docker' },
                { name: 'Dozzle Logs', icon: Activity, type: 'docker' },
                { name: 'Postgres 16', icon: Database, type: 'database' }
            ]
        },
        lxc105: {
            name: 'LXC 105: DataBaseandBI',
            status: 'running',
            services: [
                { name: 'Metabase', icon: Activity, type: 'docker' },
                { name: 'Postgres Main', icon: Database, type: 'database' }
            ]
        },
        lxc110: {
            name: 'LXC 110: srv-chatwoot-10',
            status: 'running',
            services: [
                { name: 'Chatwoot', icon: Activity, type: 'docker' },
                { name: 'Redis', icon: Database, type: 'database' },
                { name: 'Postgres', icon: Database, type: 'database' }
            ]
        },
        lxc132: {
            name: 'LXC 132: srv-loki-32',
            status: 'running',
            services: [
                { name: 'Grafana Loki :3100', icon: Activity, type: 'docker' }
            ]
        },
        lxc167: {
            name: 'LXC 167: srv-openproject-67',
            status: 'running',
            services: [
                { name: 'OpenProject', icon: Box, type: 'docker' },
                { name: 'Postgres', icon: Database, type: 'database' }
            ]
        },
        lxc300: {
            name: 'LXC 300: dev-gitlab66',
            status: 'running',
            services: [
                { name: 'GitLab CE', icon: GitBranch, type: 'docker' },
                { name: 'GitLab Runner', icon: Terminal, type: 'docker' },
                { name: 'Redis Cache', icon: Database, type: 'database' }
            ]
        },
        vms: {
            vm100: { name: 'VM 100: CasaOSMedia105', status: 'running', icon: Server },
            vm200: { name: 'VM 200: homeassistant119', status: 'running', icon: Home },
            vm210: { name: 'VM 210: Win', status: 'running', icon: Server },
            vm243: { name: 'VM 243: ollamaServer', status: 'running', icon: Terminal }
        },
        storage: {
            localnetwork: { name: 'localnetwork (nosotros)', type: 'network', icon: HardDrive },
            entretenimiento: { name: 'entretenimiento (nosotros)', type: 'storage', icon: HardDrive },
            local: { name: 'local (nosotros)', type: 'storage', icon: HardDrive },
            ssd: { name: 'ssd (nosotros)', type: 'storage', icon: HardDrive }
        },
        others: {
            lxc101: { name: 'LXC 101: Omada Controller', status: 'running', icon: Activity, description: 'Network Infrastructure' },
            lxc104: { name: 'LXC 104: Recording NVR', status: 'running', icon: Video, description: 'Video Surveillance' }
        }
    };

    const ServiceCard = ({ service, containerName }: { service: ServiceType; containerName: string }) => {
        const Icon = service.icon;
        const bgColor = service.type === 'database' ? 'bg-red-900' : 'bg-red-700';

        return (
            <div className={`flex items-center gap-2 p-2 rounded ${bgColor} bg-opacity-90 text-white text-sm hover:bg-opacity-100 transition-all border border-red-500`}>
                <Icon size={16} />
                <span>{service.name}</span>
            </div>
        );
    };

    const LXCContainer = ({ id, data }: { id: string; data: NodeData }) => {
        const isHovered = hoveredNode === id;
        const isSelected = selectedNode === id;

        return (
            <div
                onMouseEnter={() => setHoveredNode(id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setSelectedNode(isSelected ? null : id)}
                className={`border-2 rounded-lg p-4 transition-all cursor-pointer ${data.status === 'running'
                    ? 'bg-gradient-to-br from-red-950 to-black border-red-600'
                    : 'bg-gray-900 border-gray-700 border-dashed'
                    } ${isHovered || isSelected ? 'scale-105 shadow-2xl shadow-red-900' : 'shadow-lg shadow-red-950'}`}
            >
                <div className="flex items-center gap-2 mb-3 text-white font-bold">
                    <Server size={20} className="text-red-500" />
                    <h3 className="text-sm">{data.name}</h3>
                    <span className={`ml-auto w-2 h-2 rounded-full ${data.status === 'running' ? 'bg-red-500 animate-pulse' : 'bg-gray-600'}`}></span>
                </div>
                <div className="space-y-2">
                    {data.services && data.services.map((service: ServiceType, idx: number) => (
                        <ServiceCard key={idx} service={service} containerName={data.name} />
                    ))}
                </div>
            </div>
        );
    };

    const SimpleNode = ({ id, data }: { id: string; data: NodeData }) => {
        const Icon = data.icon!;
        const isHovered = hoveredNode === id;

        return (
            <div
                onMouseEnter={() => setHoveredNode(id)}
                onMouseLeave={() => setHoveredNode(null)}
                className={`flex flex-col gap-1 p-3 rounded-lg border-2 transition-all ${data.status === 'running'
                    ? 'bg-red-950 border-red-600'
                    : 'bg-gray-900 border-gray-700 border-dashed'
                    } ${isHovered ? 'scale-105 shadow-xl shadow-red-900' : 'shadow-md'} text-white`}
            >
                <div className="flex items-center gap-2">
                    <Icon size={18} className="text-red-500" />
                    <span className="text-sm font-semibold">{data.name}</span>
                </div>
                {data.description && (
                    <span className="text-xs text-gray-400 ml-6">{data.description}</span>
                )}
            </div>
        );
    };

    const StorageNode = ({ id, data }: { id: string; data: NodeData }) => {
        const Icon = data.icon!;
        const isHovered = hoveredNode === id;

        return (
            <div
                onMouseEnter={() => setHoveredNode(id)}
                onMouseLeave={() => setHoveredNode(null)}
                className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all bg-black border-red-800 ${isHovered ? 'scale-105 shadow-xl shadow-red-900' : 'shadow-md'
                    } text-white`}
            >
                <Icon size={18} className="text-red-400" />
                <span className="text-sm font-semibold">{data.name}</span>
                <span className="ml-auto text-xs text-red-500">{data.type}</span>
            </div>
        );
    };

    const CPUChart = () => {
        const maxValue = 3;
        const height = 150;
        const width = 1000;
        const padding = { left: 35, right: 10, top: 10, bottom: 10 };
        const chartWidth = width - padding.left - padding.right;
        const chartHeight = height - padding.top - padding.bottom;

        return (
            <div className="bg-black bg-opacity-70 border-2 border-red-900 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-red-500 font-bold flex items-center gap-2">
                        <Activity size={20} />
                        CPU Usage
                    </h3>
                    <div className="flex gap-4 text-xs">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-lime-500 rounded"></div>
                            <span className="text-gray-400">CPU usage</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-500 rounded"></div>
                            <span className="text-gray-400">IO delay</span>
                        </div>
                    </div>
                </div>

                <div className="relative w-full">
                    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="w-full">
                        {/* Grid lines and Y-axis labels */}
                        {[0, 0.5, 1, 1.5, 2, 2.5, 3].map((value) => {
                            const y = padding.top + chartHeight - (value / maxValue) * chartHeight;
                            return (
                                <g key={value}>
                                    <text
                                        x={padding.left - 5}
                                        y={y + 4}
                                        className="text-xs fill-gray-500"
                                        textAnchor="end"
                                    >
                                        {value}
                                    </text>
                                    <line
                                        x1={padding.left}
                                        y1={y}
                                        x2={width - padding.right}
                                        y2={y}
                                        className="stroke-gray-800"
                                        strokeWidth="1"
                                        vectorEffect="non-scaling-stroke"
                                    />
                                </g>
                            );
                        })}

                        {/* Gradients */}
                        <defs>
                            <linearGradient id="cpuGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#84cc16" stopOpacity="0.9" />
                                <stop offset="50%" stopColor="#65a30d" stopOpacity="0.7" />
                                <stop offset="100%" stopColor="#4d7c0f" stopOpacity="0.4" />
                            </linearGradient>
                            <linearGradient id="ioGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.7" />
                                <stop offset="100%" stopColor="#1e40af" stopOpacity="0.3" />
                            </linearGradient>
                        </defs>

                        {/* CPU Usage Area */}
                        <path
                            d={`M ${padding.left} ${padding.top + chartHeight} ${cpuData.map((d, i) => {
                                const x = padding.left + (i / (cpuData.length - 1)) * chartWidth;
                                const y = padding.top + chartHeight - (d.cpu / maxValue) * chartHeight;
                                return `L ${x} ${y}`;
                            }).join(' ')} L ${padding.left + chartWidth} ${padding.top + chartHeight} Z`}
                            fill="url(#cpuGradient)"
                            vectorEffect="non-scaling-stroke"
                        />

                        {/* IO Delay Area */}
                        <path
                            d={`M ${padding.left} ${padding.top + chartHeight} ${cpuData.map((d, i) => {
                                const x = padding.left + (i / (cpuData.length - 1)) * chartWidth;
                                const y = padding.top + chartHeight - (d.io / maxValue) * chartHeight;
                                return `L ${x} ${y}`;
                            }).join(' ')} L ${padding.left + chartWidth} ${padding.top + chartHeight} Z`}
                            fill="url(#ioGradient)"
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>
                </div>
            </div>
        );
    };

    const ProxmoxStats = () => {
        return (
            <div className="bg-black bg-opacity-70 border-2 border-red-900 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-red-500 flex items-center gap-2">
                            <Server size={28} />
                            {proxmoxStats.hostname}
                        </h2>
                        <p className="text-gray-400 text-sm">(Uptime: {proxmoxStats.uptime})</p>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-gray-500">{proxmoxStats.managerVersion}</div>
                        <div className="text-xs text-gray-500">{proxmoxStats.kernelVersion}</div>
                        <div className="text-xs text-gray-500">Boot Mode: {proxmoxStats.bootMode}</div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-6">
                    {/* CPU Stats */}
                    <div className="border border-red-900 rounded-lg p-4 bg-red-950 bg-opacity-30">
                        <div className="flex items-center gap-2 mb-2">
                            <Cpu size={20} className="text-red-500" />
                            <h3 className="font-bold text-red-400">CPU Usage</h3>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{proxmoxStats.cpuUsage}</div>
                        <div className="text-xs text-gray-400">{proxmoxStats.cpuModel}</div>
                        <div className="text-xs text-gray-500 mt-2">Load: {proxmoxStats.loadAverage}</div>
                    </div>

                    {/* RAM Stats */}
                    <div className="border border-red-900 rounded-lg p-4 bg-red-950 bg-opacity-30">
                        <div className="flex items-center gap-2 mb-2">
                            <MemoryStick size={20} className="text-red-500" />
                            <h3 className="font-bold text-red-400">RAM Usage</h3>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{proxmoxStats.ramUsage}</div>
                        <div className="w-full bg-gray-800 rounded-full h-2 mt-2">
                            <div className="bg-red-600 h-2 rounded-full" style={{ width: '58.82%' }}></div>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                            {proxmoxStats.ramUsed} / {proxmoxStats.ramTotal}
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                            SWAP: {proxmoxStats.swapUsage}
                        </div>
                    </div>

                    {/* Storage Stats */}
                    <div className="border border-red-900 rounded-lg p-4 bg-red-950 bg-opacity-30">
                        <div className="flex items-center gap-2 mb-2">
                            <HardDrive size={20} className="text-red-500" />
                            <h3 className="font-bold text-red-400">HD Space</h3>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{proxmoxStats.hdSpace}</div>
                        <div className="w-full bg-gray-800 rounded-full h-2 mt-2">
                            <div className="bg-red-600 h-2 rounded-full" style={{ width: '13.85%' }}></div>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                            {proxmoxStats.hdUsed} / {proxmoxStats.hdTotal}
                        </div>
                        <div className="text-xs text-gray-500 mt-2 flex justify-between">
                            <span>IO delay: {proxmoxStats.ioDelay}</span>
                            <span>KSM: {proxmoxStats.ksmSharing}</span>
                        </div>
                    </div>
                </div>

                <CPUChart />
            </div>
        );
    };

    const CloudNode = ({ data }: { data: NodeData }) => {
        const Icon = data.icon!;

        return (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 border-2 border-red-400 shadow-lg text-white font-bold hover:scale-105 transition-all">
                <Icon size={18} />
                <span className="text-sm">{data.name}</span>
            </div>
        );
    };

    return (
        <div className="w-full bg-gradient-to-br from-black via-red-950 to-black p-8 rounded-xl overflow-auto">
            <div className="min-w-[1200px]">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-red-500 mb-2 flex items-center justify-center gap-3">
                        <Skull size={40} />
                        Homelab Infrastructure
                        <Skull size={40} />
                    </h1>
                    <p className="text-red-400 font-semibold">PROXMOX VE: nosotros | Red Team Lab</p>
                </div>

                {/* Proxmox System Stats */}
                <ProxmoxStats />

                {/* Cloud Layer */}
                <div className="mb-8 p-6 rounded-lg bg-black bg-opacity-70 border-2 border-red-600">
                    <h2 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                        <Cloud size={24} />
                        Public Web & Dev Flow
                    </h2>
                    <div className="flex justify-around gap-4">
                        <CloudNode data={nodes.cloud.github} />
                        <div className="flex items-center">
                            <div className="w-16 h-0.5 bg-red-600"></div>
                        </div>
                        <CloudNode data={nodes.cloud.netlify} />
                        <div className="flex items-center">
                            <div className="w-16 h-0.5 bg-red-600"></div>
                        </div>
                        <CloudNode data={nodes.cloud.laptop} />
                    </div>
                </div>

                {/* Main Infrastructure - Row 1 */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                    {/* Twingate */}
                    <div className="col-span-1">
                        <div className="mb-2 text-red-500 font-bold text-sm flex items-center gap-2">
                            <Lock size={16} />
                            ZERO TRUST ACCESS
                        </div>
                        <LXCContainer id="lxc102" data={nodes.lxc102} />
                    </div>

                    {/* Gateway */}
                    <div className="col-span-1">
                        <div className="mb-2 text-red-500 font-bold text-sm flex items-center gap-2">
                            <Shield size={16} />
                            GATEWAY & PROXY
                        </div>
                        <LXCContainer id="lxc103" data={nodes.lxc103} />
                    </div>

                    {/* Monitoring */}
                    <div className="col-span-1">
                        <div className="mb-2 text-red-500 font-bold text-sm flex items-center gap-2">
                            <Activity size={16} />
                            MONITORING & OPS
                        </div>
                        <LXCContainer id="lxc120" data={nodes.lxc120} />
                    </div>
                </div>

                {/* Main Infrastructure - Row 2 */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                    {/* Data & BI */}
                    <div className="col-span-1">
                        <div className="mb-2 text-red-500 font-bold text-sm flex items-center gap-2">
                            <Database size={16} />
                            DATA & BI
                        </div>
                        <LXCContainer id="lxc105" data={nodes.lxc105} />
                    </div>

                    {/* Chatwoot */}
                    <div className="col-span-1">
                        <div className="mb-2 text-red-500 font-bold text-sm flex items-center gap-2">
                            <Activity size={16} />
                            CUSTOMER SUPPORT
                        </div>
                        <LXCContainer id="lxc110" data={nodes.lxc110} />
                    </div>

                    {/* Logs */}
                    <div className="col-span-1">
                        <div className="mb-2 text-red-500 font-bold text-sm flex items-center gap-2">
                            <Activity size={16} />
                            CENTRAL LOGS
                        </div>
                        <LXCContainer id="lxc132" data={nodes.lxc132} />
                    </div>
                </div>

                {/* Development & Project Management */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <div className="mb-2 text-red-500 font-bold text-sm flex items-center gap-2">
                            <Box size={16} />
                            PROJECT MANAGEMENT
                        </div>
                        <LXCContainer id="lxc167" data={nodes.lxc167} />
                    </div>
                    <div>
                        <div className="mb-2 text-red-500 font-bold text-sm flex items-center gap-2">
                            <GitBranch size={16} />
                            VERSION CONTROL & CI/CD
                        </div>
                        <LXCContainer id="lxc300" data={nodes.lxc300} />
                    </div>
                </div>

                {/* Virtual Machines */}
                <div className="mb-6">
                    <div className="mb-2 text-red-500 font-bold text-sm flex items-center gap-2">
                        <Server size={16} />
                        VIRTUAL MACHINES
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {Object.entries(nodes.vms).map(([key, data]) => (
                            <SimpleNode key={key} id={key} data={data} />
                        ))}
                    </div>
                </div>

                {/* Storage */}
                <div className="mb-6">
                    <div className="mb-2 text-red-500 font-bold text-sm flex items-center gap-2">
                        <HardDrive size={16} />
                        STORAGE & NETWORK
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {Object.entries(nodes.storage).map(([key, data]) => (
                            <StorageNode key={key} id={key} data={data} />
                        ))}
                    </div>
                </div>

                {/* Network Infrastructure & Surveillance */}
                <div className="mb-6">
                    <div className="mb-2 text-red-500 font-bold text-sm flex items-center gap-2">
                        <Activity size={16} />
                        NETWORK INFRASTRUCTURE & SURVEILLANCE
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries(nodes.others).map(([key, data]) => (
                            <SimpleNode key={key} id={key} data={data} />
                        ))}
                    </div>
                </div>

                {/* Legend */}
                <div className="mt-8 flex justify-center gap-8 text-sm">
                    <div className="flex items-center gap-2 text-red-500">
                        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                        <span>Running</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                        <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                        <span>Stopped</span>
                    </div>
                    <div className="flex items-center gap-2 text-red-400">
                        <div className="w-3 h-3 rounded bg-red-700"></div>
                        <span>Docker Service</span>
                    </div>
                    <div className="flex items-center gap-2 text-red-600">
                        <div className="w-3 h-3 rounded bg-red-900"></div>
                        <span>Database</span>
                    </div>
                    <div className="flex items-center gap-2 text-red-500">
                        <HardDrive size={16} />
                        <span>Storage</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomelabDiagram;
