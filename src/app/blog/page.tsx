// app/blog/page.tsx
import Blog from '../components/Blog';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Article } from '../components/Blog';

async function getArticles(): Promise<Article[]> {
  const articlesDirectory = path.join(process.cwd(), 'src/articles');
  const filenames = fs.readdirSync(articlesDirectory);

  const articles = filenames.map((filename) => {
    const filePath = path.join(articlesDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    return { ...data, slug: filename.replace(/\.md$/, '') } as Article;
  });

  return articles;
}

export default async function BlogPage() {
  const articles = await getArticles();
  return <Blog articles={articles} />;
}
