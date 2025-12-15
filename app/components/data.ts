import { Shield, Database, Network, Activity, HardDrive } from 'lucide-react';

export const layers = [
    {
        id: 'capa1',
        name: 'Capa 1: Infra Base',
        color: 'from-amber-500 to-orange-600',
        icon: Shield,
        services: [
            { id: 102, name: 'twingate-connector', desc: 'Zero Trust Access', status: 'active' },
            { id: 101, name: 'Ommada21 Network Controller', desc: 'Network Management', status: 'active' },
            { id: 120, name: 'Monitoring30', desc: 'Infrastructure Observability', status: 'active' }
        ],
        purpose: 'Foundation layer ensuring secure access, network control, and base monitoring before any application services start.'
    },
    {
        id: 'capa2',
        name: 'Capa 2: Servicios Core',
        color: 'from-blue-500 to-indigo-600',
        icon: Database,
        services: [
            { id: 159, name: 'dbEmpleosdelatlantico', desc: 'PostgreSQL Database', status: 'active' },
            { id: 155, name: 'nodebb Forum Backend', desc: 'Community Platform', status: 'active' },
            { id: 124, name: 'devops-lab Dev/CI Lab', desc: 'Development Environment', status: 'active' }
        ],
        purpose: 'Core services and data layer. Databases and backend systems that applications depend on.'
    },
    {
        id: 'capa3',
        name: 'Capa 3: Apps / Web',
        color: 'from-purple-500 to-pink-600',
        icon: Network,
        services: [
            { id: 122, name: 'web-lab22 Web Services', desc: 'Application Frontend', status: 'active' },
            { id: 243, name: 'ollamaServer AI/LLM', desc: 'Local AI Inference', status: 'active' },
            { id: 289, name: 'ridemolohub App Platform', desc: 'Custom Applications', status: 'active' }
        ],
        purpose: 'Application layer serving web services, AI workloads, and custom platforms to end users.'
    },
    {
        id: 'capa4',
        name: 'Capa 4: Usuario / Media',
        color: 'from-emerald-500 to-teal-600',
        icon: Activity,
        services: [
            { id: 100, name: 'CasaOSMedia105', desc: 'Media Server', status: 'active' },
            { id: 200, name: 'homeassistant119', desc: 'Home Automation', status: 'active' },
            { id: 104, name: 'NVR69 Video Surveillance', desc: 'Security System', status: 'active' }
        ],
        purpose: 'User-facing services for media consumption, home automation, and physical security monitoring.'
    }
];

