import type { Metadata } from "next";
import { Syne, JetBrains_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
    variable: "--font-display",
    subsets: ["latin"],
    weight: ["500", "600", "700", "800"],
    display: "swap",
});

const ibmPlex = IBM_Plex_Sans({
    variable: "--font-body",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "INFRA.LAB // Production-Grade Homelab Infrastructure",
        template: "%s | INFRA.LAB",
    },
    description:
        "Production-grade on-premise infrastructure for AI, DevOps, and zero-trust access. Real-world Proxmox homelab with 13+ services, orchestrated boot sequence, and full observability. Documentation and guides for self-hosting.",
    keywords: [
        "homelab",
        "Proxmox",
        "self-hosting",
        "zero trust",
        "AI infrastructure",
        "DevOps lab",
        "LXC containers",
        "home server",
        "Twingate",
        "network segmentation",
    ],
    authors: [{ name: "neuralcodelab", url: "https://neuralcodelab.com" }],
    creator: "neuralcodelab",
    publisher: "neuralcodelab",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://infra.neuralcodelab.com",
        siteName: "INFRA.LAB",
        title: "INFRA.LAB // Production-Grade Homelab Infrastructure",
        description:
            "Real-world Proxmox homelab with 13+ services, orchestrated boot sequence, and full observability. Documentation for self-hosting AI, DevOps, and zero-trust architectures.",
        images: [
            {
                url: "https://infra.neuralcodelab.com/og-image.svg",
                width: 1200,
                height: 630,
                alt: "INFRA.LAB Infrastructure Dashboard",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "INFRA.LAB // Production-Grade Homelab Infrastructure",
        description:
            "Real-world Proxmox homelab with 13+ services, orchestrated boot sequence, and full observability.",
        images: ["https://infra.neuralcodelab.com/og-image.svg"],
        creator: "@neuralcodelab",
    },
    alternates: {
        canonical: "https://infra.neuralcodelab.com",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                {/* Google Analytics GA4 */}
                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-XXXXXXXXXX', {
                                page_path: window.location.pathname,
                            });
                        `,
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebSite",
                            "name": "INFRA.LAB",
                            "alternateName": "neuralcodelab homelab infrastructure",
                            "url": "https://infra.neuralcodelab.com",
                            "description": "Production-grade on-premise infrastructure for AI, DevOps, and zero-trust access. Real-world Proxmox homelab documentation and guides.",
                            "publisher": {
                                "@type": "Organization",
                                "name": "neuralcodelab",
                                "url": "https://neuralcodelab.com"
                            }
                        }),
                    }}
                />
            </head>
            <body
                className={`${syne.variable} ${ibmPlex.variable} ${jetbrainsMono.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
