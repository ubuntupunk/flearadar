// app/explorer/page.tsx
import React from 'react';
import Explorer from '../components/Explorer'; // Adjust the path if necessary
import Header from '../components/Header';
import Footer from '../components/Footer';

// Define props interface if passing data
interface ExplorerPageProps {
  // Example: data: any; // Replace with actual data type
}

// Note: In App Router, data fetching happens in the component itself
export default async function ExplorerPage(/* props: ExplorerPageProps */): Promise<JSX.Element> {
  // Example async data fetching (uncomment and adjust as needed)
  // const data = await fetchSomeData();

  return (
    <div>
      <Header />
      <Explorer />
      <Footer />
    </div>
  );
}