import fs from "fs";
import path from 'path';

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

export type { Listing };

export async function getListings(): Promise<Listing[]> {
  const listingsDirectory: string = path.join(process.cwd(), 'src/app/data/listings.json');
  const fileContents: string = fs.readFileSync(listingsDirectory, 'utf8');
  const listings: Listing[] = JSON.parse(fileContents);
  return listings;
}
