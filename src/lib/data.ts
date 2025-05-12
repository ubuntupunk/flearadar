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

interface Spot {
  city: string;
  listings: string;
  image: string;
}

interface Article {
  title: string;
  categories: string[];
  author: string;
  date: string;
  time: string;
  image: string;
}

export type { Listing, Spot, Article };

export async function getListings(): Promise<Listing[]> {
  const listingsPath = path.join(process.cwd(), 'src/app/data/listings.json');
  const fileContents = fs.readFileSync(listingsPath, 'utf8');
  const listings: Listing[] = JSON.parse(fileContents);
  return listings;
}

export async function getSpots(): Promise<Spot[]> {
  const spotsPath = path.join(process.cwd(), 'src/app/data/spots.json');
  const fileContents = fs.readFileSync(spotsPath, 'utf8');
  const data = JSON.parse(fileContents);
  const spots: Spot[] = data.spots;
  return spots;
}

export async function getArticles(): Promise<Article[]> {
  const spotsPath = path.join(process.cwd(), 'src/app/data/articles.json');
  const fileContents = fs.readFileSync(spotsPath, 'utf8');
  const data = JSON.parse(fileContents);
  const articles: Article[] = data.articles;
  return articles;
}
