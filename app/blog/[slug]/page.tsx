import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, Server, Clock, Calendar, Tag } from 'lucide-react';
import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readTime: string;
  content: string;
}

interface Frontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  readTime: string;
}

function parseFrontmatter(content: string): { frontmatter: Frontmatter; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    throw new Error('Invalid frontmatter');
  }
  
  const frontmatterStr = match[1];
  const body = match[2];
  
  const frontmatter: Frontmatter = {
    title: '',
    description: '',
    date: '',
    tags: [],
    readTime: '',
  };
  
  frontmatterStr.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
    
    if (key === 'title') frontmatter.title = value;
    else if (key === 'description') frontmatter.description = value;
    else if (key === 'date') frontmatter.date = value;
    else if (key === 'readTime') frontmatter.readTime = value;
    else if (key === 'tags') {
      const tagsStr = value.replace(/[\[\]]/g, '');
      frontmatter.tags = tagsStr.split(',').map(t => t.trim().replace(/^["']|["']$/g, ''));
    }
  });
  
  return { frontmatter, body };
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const filePath = path.join(process.cwd(), 'content/posts', `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { frontmatter, body } = parseFrontmatter(fileContent);
    
    const processedContent = await remark().use(html).process(body);
    const contentHtml = processedContent.toString();
    
    return {
      slug,
      title: frontmatter.title,
      description: frontmatter.description,
      date: frontmatter.date,
      tags: frontmatter.tags,
      readTime: frontmatter.readTime,
      content: contentHtml,
    };
  } catch (error) {
    console.error('Error loading post:', error);
    return null;
  }
}

function getAllPosts(): string[] {
  const postsDir = path.join(process.cwd(), 'content/posts');
  
  if (!fs.existsSync(postsDir)) {
    return [];
  }
  
  const files = fs.readdirSync(postsDir);
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace('.md', ''));
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | INFRA.LAB',
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
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <div className="min-h-screen bg-[color:var(--bg-abyss)] text-[color:var(--foreground)]">
      {/* Header */}
      <header className="border-b border-red-900/40 bg-[color:var(--bg-abyss)]/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-[1360px] mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/blog" className="rt-mono text-xs text-[color:var(--red-ink)] hover:underline">
            ← Blog
          </a>
          <a href="/" className="rt-mono text-xs text-[color:var(--red-ink)] hover:underline">
            INFRA.LAB
          </a>
        </div>
      </header>
      
      {/* Content */}
      <article className="max-w-[800px] mx-auto px-6 py-16">
        {/* Post Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6 rt-meta">
            <Server className="w-4 h-4 text-[color:var(--red-ink)]" />
            <span className="text-[color:var(--red-ink)]">INFRA.LAB</span>
            <span className="text-[color:var(--foreground-mute)]">// {post.readTime}</span>
          </div>
          
          <h1 className="rt-display text-4xl md:text-5xl font-bold mb-6">
            {post.title}
          </h1>
          
          <p className="text-xl text-[color:var(--foreground-dim)] mb-8">
            {post.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-6 rt-mono text-xs text-[color:var(--foreground-mute)]">
            <span className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-red-900/20 text-[color:var(--red-ink)] rt-label"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Post Content */}
        <div 
          className="prose prose-invert prose-red max-w-none rt-label"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
