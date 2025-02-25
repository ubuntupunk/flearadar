import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import TrendingListings from "../components/TrendingListings";
import HowItWorks from "../components/HowItWorks";
import JoinCommunity from "../components/JoinCommunity";
import PopularSpots from "../components/PopularSpots";
import Articles from "../components/Articles";
import ReachMillions from "../components/ReachMillions";
import RssPosts from "../components/RssPosts";
import Stats from "../components/Stats";
import Footer from "../components/Footer";

export default function Home() {
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
      <Articles />
      <ReachMillions />
      <RssPosts />
      <Stats />
      <Footer />
    </div>
  );
}