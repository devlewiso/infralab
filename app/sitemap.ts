import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static'; // requerido por output: 'export'

const baseUrl = 'https://infra.neuralcodelab.com';

function postEntries() {
  const dir = path.join(process.cwd(), 'content/posts');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const src = fs.readFileSync(path.join(dir, f), 'utf-8');
      const fm = src.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
      const pick = (k: string) => fm.match(new RegExp(`^${k}:\\s*["']?([^"'\\n]+)`, 'm'))?.[1];
      const date = pick('updated') ?? pick('date');
      return {
        url: `${baseUrl}/blog/${f.replace(/\.md$/, '')}`,
        lastModified: date ? new Date(date) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      };
    });
}

export default function sitemap() {
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    ...postEntries(),
  ];
}
