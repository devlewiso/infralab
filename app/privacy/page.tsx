import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for INFRA.LAB - neuralcodelab homelab infrastructure documentation.',
};

export default function PrivacyPolicy() {
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
        <h1 className="rt-display text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-[color:var(--foreground-dim)] mb-4">
          <strong>Last updated:</strong> July 17, 2026
        </p>
        
        <div className="prose prose-invert prose-red max-w-none mt-8">
          <h2>1. Introduction</h2>
          <p>
            INFRA.LAB ("we", "our", or "us") operates the infra.neuralcodelab.com website. 
            This page informs you of our policies regarding the collection, use, and disclosure 
            of personal data when you use our website and the choices you have associated with that data.
          </p>

          <h2>2. Information We Collect</h2>
          <h3>2.1 Log Data</h3>
          <p>
            We collect information that your browser sends whenever you visit our website ("Log Data"). 
            This Log Data may include information such as your computer's Internet Protocol ("IP") address, 
            browser type, browser version, the pages of our website that you visit, the time and date of 
            your visit, the time spent on those pages, and other statistics.
          </p>

          <h3>2.2 Cookies</h3>
          <p>
            Cookies are files with a small amount of data, which may include an anonymous unique identifier. 
            Cookies are sent to your browser from a website and stored on your computer's hard drive.
          </p>
          <p>
            We use the following types of cookies:
          </p>
          <ul>
            <li><strong>Essential cookies:</strong> Required for website functionality</li>
            <li><strong>Analytics cookies:</strong> Help us understand how visitors use our website (Google Analytics)</li>
            <li><strong>Advertising cookies:</strong> Used to display relevant ads (Google AdSense)</li>
          </ul>

          <h2>3. Third-Party Services</h2>
          <p>
            We may employ third-party companies and individuals to facilitate our website, 
            provide services on our behalf, or assist us in analyzing how our website is used.
          </p>
          <p>
            These third parties have access to your Personal Information only to perform these 
            tasks on our behalf and are obligated not to disclose or use it for any other purpose.
          </p>
          <p>
            Current third-party services include:
          </p>
          <ul>
            <li><strong>Google Analytics:</strong> Website analytics</li>
            <li><strong>Google AdSense:</strong> Advertising</li>
            <li><strong>Netlify:</strong> Website hosting</li>
            <li><strong>GitHub:</strong> Code hosting and version control</li>
          </ul>

          <h2>4. Security</h2>
          <p>
            The security of your Personal Information is important to us, but remember that 
            no method of transmission over the Internet, or method of electronic storage is 100% secure. 
            While we strive to use commercially acceptable means to protect your Personal Information, 
            we cannot guarantee its absolute security.
          </p>

          <h2>5. International Transfer</h2>
          <p>
            Your information, including Personal Information, may be transferred to—and maintained on— 
            computers located outside of your state, province, country, or other governmental jurisdiction 
            where the data protection laws may differ from those from your jurisdiction.
          </p>

          <h2>6. Your Rights</h2>
          <p>
            Depending on your location, you may have the following rights regarding your personal data:
          </p>
          <ul>
            <li>The right to access your personal data</li>
            <li>The right to rectification of inaccurate data</li>
            <li>The right to erasure ("right to be forgotten")</li>
            <li>The right to restrict processing</li>
            <li>The right to data portability</li>
            <li>The right to object to processing</li>
          </ul>
          <p>
            To exercise these rights, please contact us at privacy@neuralcodelab.com
          </p>

          <h2>7. Children's Privacy</h2>
          <p>
            Our website is not intended for children under 13 years of age. We do not knowingly 
            collect personally identifiable information from children under 13.
          </p>

          <h2>8. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes 
            by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul>
            <li>By email: privacy@neuralcodelab.com</li>
            <li>By visiting this page: https://neuralcodelab.com/contact</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
