
import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import TrendingListings from "../components/TrendingListings";
import HowItWorks from "../components/HowItWorks";
import JoinCommunity from "../components/JoinCommunity";
import PopularSpots from "../components/PopularSpots";
import DynamicArticles from "../components/DynamicArticles";
import ReachMillions from "../components/ReachMillions";
import RssPosts from "../components/RssPosts";
import Stats from "../components/Stats";
import Footer from "../components/Footer";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { Analytics } from "@vercel/analytics/react"

export default function Home({ latestArticles }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>FleaRadar Directory</title>
        <meta name="description" content="Informal Market & Food Truck Directory" />
        <meta name="keywords" content="food truck, flea market, craft market" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
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
      <Footer />
      <Analytics/>
    </div>
  );
}

export async function getStaticProps() {
  const articlesDirectory = path.join(process.cwd(), 'articles');
  const filenames = fs.readdirSync(articlesDirectory);

  const articles = filenames.map((filename) => {
    const filePath = path.join(articlesDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    return { ...data, slug: filename.replace(/\.md$/, '') }; // Add slug
  });

  // Sort articles by date and get the latest four
  const latestArticles = articles
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  return {
    props: {
      latestArticles, // Pass the latest articles to the page
    },
  };
}