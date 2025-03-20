// app/page.tsx
import type { Metadata } from 'next';
import HeroSearch from "../components/HeroSearch";
import Categories from "../components/Categories";
import TrendingListings from "../components/TrendingListings";
import HowItWorks from "../components/HowItWorks";
import JoinCommunity from "../components/JoinCommunity";
import PopularSpots from "../components/PopularSpots";
import DynamicArticles from "../components/DynamicArticles";
import ReachMillions from "../components/ReachMillions";
import RssPosts from "../components/RssPosts";
import Stats from "../components/Stats";
import Directory from "../components/Directory";
import { Analytics } from "@vercel/analytics/react";
import { getListings } from "@/lib/data";
import { getLatestArticles, getRssPosts } from "@/lib/articles";
import HomeClient from "../components/HomeClient";

export const Metadata: Metadata = {
  title: "FleaRadar Directory",
  description: "Informal Market & Food Truck Directory",
  keywords: "food truck, flea market, craft market",
  openGraph: {
    title: "FleaRadar Directory",
    description: "Informal Market & Food Truck Directory",
    images: [
      {
        url: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        width: 1200,
        height: 630,
        alt: "FleaRadar Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FleaRadar Directory",
    description: "Informal Market & Food Truck Directory",
    images: [
      {
        url: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        width: 1200,
        height: 630,
        alt: "FleaRadar Directory",
      },
    ],
  },
};
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

export default async function Home() {
  const latestArticles = await getLatestArticles();
  const rssPosts = await getRssPosts();
  const listings = await getListings();

  return (
    <div className="min-h-screen bg-gray-100" style={{ zIndex: 200, paddingBottom: '50px' }}>
      {/* <Head>
        <title>FleaRadar Directory</title>
        <meta name="description" content="Informal Market & Food Truck Directory" />
        <meta name="keywords" content="food truck, flea market, craft market" />
        <link rel="icon" href="/favicon.ico" />
      </Head>  */}
      <HomeClient listings={listings} />
      <Categories />
      <TrendingListings />
      <HowItWorks />
      <JoinCommunity />
      <PopularSpots />
      <ReachMillions />
      <RssPosts rssPosts={rssPosts} />
      <DynamicArticles latestArticles={latestArticles} 
      />
      <Stats />
      <Analytics />
    </div>
  );
}
