// app/page.tsx
import Head from "next/head";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import TrendingListings from "./components/TrendingListings";
import HowItWorks from "./components/HowItWorks";
import JoinCommunity from "./components/JoinCommunity";
import PopularSpots from "./components/PopularSpots";
import DynamicArticles from "./components/DynamicArticles";
import ReachMillions from "./components/ReachMillions";
import RssPosts from "./components/RssPosts";
import Stats from "./components/Stats";
import Directory from "./components/Directory";
import fs from "fs";
import path from 'path';
import matter from "gray-matter";
import { Analytics } from "@vercel/analytics/react";
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

interface Listing {
  id: number;
  name: string;
  type: string;
  description: string;
  date: string;
  location: string;
  gps: string;
  contact: string;
  email: string;
  url: string;
  image: string;
  "trade-days": string;
  "trade-hours": string;
  rating: number[];
}

// Define props interface for the Home component
interface HomeProps {
  latestArticles: Article[];
  rssPosts: RssItem[];
  listings: Listing[];
}

const RSS_FEED_URL = 'https://muizenmesh.co.za/wp/web/flearadar/feed';

export const metadata = {
  title: 'FleaRadar Directory',
  description: 'Informal Market & Food Truck Directory',
  keywords: 'food truck, flea market, craft market',
};

async function getLatestArticles(): Promise<Article[]> {
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

async function getRssPosts(): Promise<RssItem[]> {
  try {
    const parser = new Parser();
    const feed = await parser.parseURL(RSS_FEED_URL);
    return feed.items.slice(0, 4) as RssItem[];
  } catch (error: any) {
    console.error("Error fetching RSS feed:", error);
    return [];
  }
}

async function getListings(): Promise<Listing[]> {
  const listingsDirectory: string = path.join(process.cwd(), 'src/app/data/listings.json');
  const fileContents: string = fs.readFileSync(listingsDirectory, 'utf8');
  const listings: Listing[] = JSON.parse(fileContents);
  return listings;
}

export default async function Home() {
  const latestArticles = await getLatestArticles();
  const rssPosts = await getRssPosts();
  const listings = await getListings();

  return (
    <div className="min-h-screen bg-gray-100" style={{ zIndex: 200, paddingBottom: '50px' }}>
      <Head>
        <title>FleaRadar Directory</title>
        <meta name="description" content="Informal Market & Food Truck Directory" />
        <meta name="keywords" content="food truck, flea market, craft market" />
        <link rel="icon" href="/favicon.ico" />
      </Head> 
      <Hero />
      <Categories />
      <TrendingListings />
      <HowItWorks />
      <JoinCommunity />
      <PopularSpots />
      <DynamicArticles latestArticles={latestArticles} 
      />
      <ReachMillions />
      <RssPosts rssPosts={rssPosts} />
      <Stats />
      <Analytics />
    </div>
  );
}
