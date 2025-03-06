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
import fs from "fs";
import path from 'path';
import matter from "gray-matter";
import { Analytics } from "@vercel/analytics/react";

// Define the Article interface for the fetched articles
interface Article {
  title: string;
  description: string;
  date: string;
  slug: string;
  [key: string]: any; // Allow additional frontmatter fields
}

// Define props interface for the Home component
interface HomeProps {
  latestArticles: Article[];
}

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

export default async function Home() {
  const latestArticles = await getLatestArticles();

  return (
    <div className="min-h-screen bg-gray-100">
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
      <DynamicArticles latestArticles={latestArticles} />
      <ReachMillions />
      <RssPosts />
      <Stats />
      <Analytics />
    </div>
  );
}
