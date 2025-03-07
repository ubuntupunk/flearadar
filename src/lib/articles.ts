import fs from "fs";
import path from 'path';
import matter from "gray-matter";
import Parser from 'rss-parser';

// Define the Article interface for the fetched articles
interface Article {
  title: string;
  description: string;
  date: string;
  slug: string;
  [key: string]: string | number | boolean; // Allow additional frontmatter fields
}

interface RssItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
}

const RSS_FEED_URL = 'https://muizenmesh.co.za/wp/web/flearadar/feed';

export async function getLatestArticles(): Promise<Article[]> {
  const articlesDirectory: string = path.join(process.cwd(), 'src/articles');
  const filenames: string[] = fs.readdirSync(articlesDirectory);

  const articles: Article[] = filenames.map((filename: string) => {
    const filePath: string = path.join(articlesDirectory, filename);
    const fileContents: string = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    return { ...data, slug: filename.replace(/\.md$/, '') } as Article;
  });

  // Sort articles by date and get the latest four
  const latestArticles: Article[] = articles
    .sort((a: Article, b: Article) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);
  return latestArticles;
}

export async function getRssPosts(): Promise<RssItem[]> {
  try {
    const parser = new Parser();
    const feed = await parser.parseURL(RSS_FEED_URL);
    return feed.items.slice(0, 4) as RssItem[];
  } catch (error: any) {
    console.error("Error fetching RSS feed:", error);
    return [];
  }
}
