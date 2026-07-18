import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for INFRA.LAB - neuralcodelab homelab infrastructure documentation.',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[color:var(--bg-abyss)] text-[color:var(--foreground)]">
      {/* Header */}
      <header className="border-b border-red-900/40 bg-[color:var(--bg-abyss)]/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-[1360px] mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="rt-mono text-xs text-[color:var(--red-ink)] hover:underline">
            ← INFRA.LAB
          </a>
          <span className="rt-mono text-xs text-[color:var(--foreground-dim)]">
            LEGAL
          </span>
        </div>
      </header>
      
      {/* Content */}
      <div className="max-w-[800px] mx-auto px-6 py-16">
        <h1 className="rt-display text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-[color:var(--foreground-dim)] mb-4">
          <strong>Last updated:</strong> July 17, 2026
        </p>
        
        <div className="prose prose-invert prose-red max-w-none mt-8">
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using the INFRA.LAB website (infra.neuralcodelab.com), you agree to be bound 
            by these Terms of Service and all applicable laws and regulations. If you do not agree with 
            any of these terms, you are prohibited from using or accessing this site.
          </p>

          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials (information or software) 
            on INFRA.LAB for personal, non-commercial transitory viewing only. This is the grant of a license, 
            not a transfer of title, and under this license you may not:
          </p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or public display</li>
            <li>Attempt to decompile or reverse engineer any software contained on the website</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
          </ul>

          <h2>3. Technical Content Disclaimer</h2>
          <p>
            This website contains technical documentation and guides for homelab infrastructure, 
            including but not limited to Proxmox, networking, containers, and virtualization.
          </p>
          <p>
            <strong>Important notices:</strong>
          </p>
          <ul>
            <li>Technical information may become outdated. Always verify with current documentation.</li>
            <li>Implementing infrastructure changes carries risk. Test in non-production environments first.</li>
            <li>We are not responsible for data loss, downtime, or damages resulting from following guides.</li>
            <li>Always maintain backups before making infrastructure changes.</li>
          </ul>

          <h2>4. Affiliate Disclosure</h2>
          <p>
            This website may contain affiliate links. If you click on an affiliate link and make a purchase, 
            we may receive a small commission at no additional cost to you. This helps support the website 
            and allows us to continue creating free content.
          </p>
          <p>
            Current affiliate partnerships may include:
          </p>
          <ul>
            <li>Hardware retailers (Amazon, Newegg, etc.)</li>
            <li>Software services (Twingate, Cloudflare, etc.)</li>
            <li>Hosting providers</li>
          </ul>
          <p>
            We only recommend products and services we personally use and trust.
          </p>

          <h2>5. Advertising Disclosure</h2>
          <p>
            This website uses Google AdSense to display advertisements. Google uses cookies to serve ads 
            based on your prior visits to this or other websites. You can opt out of personalized advertising 
            by visiting <a href="https://www.google.com/settings/ads" className="text-[color:var(--red-ink)] underline">Google Ads Settings</a>.
          </p>

          <h2>6. External Links</h2>
          <p>
            INFRA.LAB may contain links to external websites. These links are provided for convenience only. 
            We do not endorse, control, or assume responsibility for the content, accuracy, or policies 
            of any third-party sites.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            In no event shall neuralcodelab or its operators be liable for any damages (including, without 
            limitation, damages for loss of data or profit, or due to business interruption) arising out 
            of the use or inability to use the materials on INFRA.LAB.
          </p>

          <h2>8. Accuracy of Materials</h2>
          <p>
            The materials appearing on INFRA.LAB could include technical, typographical, or photographic errors. 
            neuralcodelab does not warrant that any of the materials on the website are accurate, complete, 
            or current. We may make changes to the materials at any time without notice.
          </p>

          <h2>9. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of Guatemala. 
            Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts of Guatemala.
          </p>

          <h2>10. Modifications</h2>
          <p>
            We may revise these terms of service at any time without notice. By using this website, you agree 
            to be bound by the current version of these terms of service.
          </p>

          <h2>11. Termination</h2>
          <p>
            We may terminate or suspend access to our website immediately, without prior notice or liability, 
            for any reason whatsoever, including without limitation if you breach the Terms.
          </p>

          <h2>12. Contact Information</h2>
          <p>
            For questions about these Terms of Service, please contact us:
          </p>
          <ul>
            <li>By email: legal@neuralcodelab.com</li>
            <li>By visiting: https://neuralcodelab.com/contact</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
