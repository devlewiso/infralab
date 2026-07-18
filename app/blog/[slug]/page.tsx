import { Metadata } from 'next';

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

// Map of slugs to post metadata (replace with actual CMS/MDX later)
const POSTS: Record<string, { title: string; description: string; date: string }> = {
  'proxmox-homelab-setup-2026': {
    title: 'Proxmox Homelab Setup 2026: Complete Beginner Guide',
    description: 'Step-by-step guide to setting up a production-grade Proxmox homelab. Hardware recommendations, network configuration, and your first LXC containers.',
    date: '2026-07-17',
  },
  'zero-trust-home-network-twingate': {
    title: 'Zero Trust Home Network with Twingate: No VPN Required',
    description: 'How to implement zero-trust architecture for your homelab using Twingate. Secure remote access without traditional VPN complexity.',
    date: '2026-07-10',
  },
  'lxc-vs-vm-proxmox-when-to-use': {
    title: 'LXC vs VM in Proxmox: When to Use Each (Real Examples)',
    description: 'Practical comparison of LXC containers vs VMs in Proxmox with real use cases from a production homelab running 13+ services.',
    date: '2026-07-05',
  },
};

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS[slug];
  
  if (!post) {
    return {
      title: 'Post Not Found | INFRA.LAB',
      description: 'This blog post does not exist.',
    };
  }
  
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['neuralcodelab'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({
    slug,
  }));
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = POSTS[slug];
  
  if (!post) {
    return (
      <div className="min-h-screen bg-[color:var(--bg-abyss)] text-[color:var(--foreground)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-[color:var(--foreground-dim)]">Post not found</p>
        </div>
      </div>
    );
  }
  
  return (
    <article className="min-h-screen bg-[color:var(--bg-abyss)] text-[color:var(--foreground)]">
      {/* Header */}
      <header className="border-b border-red-900/40 bg-[color:var(--bg-abyss)]/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-[1360px] mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="rt-mono text-xs text-[color:var(--red-ink)] hover:underline">
            ← INFRA.LAB
          </a>
          <time className="rt-mono text-xs text-[color:var(--foreground-dim)]">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
      </header>
      
      {/* Content */}
      <div className="max-w-[800px] mx-auto px-6 py-16">
        <h1 className="rt-display text-4xl md:text-5xl font-bold mb-6">
          {post.title}
        </h1>
        <p className="text-xl text-[color:var(--foreground-dim)] mb-12">
          {post.description}
        </p>
        
        {/* Placeholder for actual content */}
        <div className="prose prose-invert prose-red max-w-none">
          <div className="p-6 border border-red-900/40 bg-red-900/10 rt-mono text-sm">
            <p className="text-[color:var(--red-ink)] mb-2">// CONTENT PLACEHOLDER</p>
            <p className="text-[color:var(--foreground-dim)]">
              This is a template. Actual blog post content goes here.
            </p>
            <p className="text-[color:var(--foreground-dim)] mt-4">
              To create real posts, add MDX support or connect a headless CMS.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
