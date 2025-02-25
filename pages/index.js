import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import FeaturedListing from "../components/FeaturedListing";
import Listings from "../components/Listings";
import Articles from "../components/Articles";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Flearadar</title>
        <meta name="description" content="Discover informal markets and food trucks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Hero />
      <FeaturedListing />
      <Listings />
      <Articles />
      <Footer />
    </div>
  );
}