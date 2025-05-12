// app/page.tsx
import Categories from "../components/Categories";
import TrendingListings from "../components/TrendingListings";
import HowItWorks from "../components/HowItWorks";
import JoinCommunity from "../components/JoinCommunity";
import PopularSpots from "../components/PopularSpots";
import DynamicArticles from "../components/DynamicArticles";
import ReachMillions from "../components/ReachMillions";
import RssPosts from "../components/RssPosts";
import Stats from "../components/Stats";
import { Analytics } from "@vercel/analytics/react";
import { getLatestArticles, getRssPosts } from "@/lib/articles";
import HomeClient from "../components/HomeClient";

export default async function Home() {
  const latestArticles = await getLatestArticles();
  const rssPosts = await getRssPosts();

  return (
    <div className="min-h-screen bg-gray-100" style={{ zIndex: 200, paddingBottom: '50px' }}>
      <HomeClient />
      <Categories />
      <TrendingListings />
      <HowItWorks />
      <JoinCommunity />
      <PopularSpots />
      <ReachMillions />
      <RssPosts rssPosts={rssPosts} />
      <DynamicArticles latestArticles={latestArticles} />
      <Stats />
      <Analytics />
    </div>
  );
}
