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
    title: "INFRA.LAB // Red Team Operations Center",
    description:
        "Production-grade on-premise infrastructure for AI, DevOps, and zero-trust access. Engineered by neuralcodelab.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${syne.variable} ${ibmPlex.variable} ${jetbrainsMono.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
