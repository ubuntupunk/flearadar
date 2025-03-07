"use client";

import React from 'react';
import { JSX } from 'react';
import Link from 'next/link';
interface RssItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
}

interface RssPostsProps {
  rssPosts: RssItem[];
}

export default function RssPosts({ rssPosts }: RssPostsProps): JSX.Element {
  return (
    <section className="rss-posts pb-4 pt-4 text-center">
      <div className="mx-auto max-w-7xl pb-4 pt-4">
        <h2>Latest Reviews</h2>
        <p className="mb-4 text-gray-600">
          Reviews written by our Community.
        </p>
        {rssPosts.length > 0 ? (
          <ul className="rss-posts-list">
            {rssPosts.map((post) => (
              <li key={post.link} className="rss-posts-item">
                <a href={post.link} title={post.title} target="_blank" rel="noopener noreferrer">
                  {post.title}
                </a>
                <p className="rss-posts-date">{new Date(post.pubDate).toLocaleDateString()}</p>
                <p className="rss-posts-content">{post.contentSnippet}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading posts...</p>
        )}
         <Link
          href="/add-review"
          className="btn bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
        >
          Add Your Review
        </Link>
      </div>
    </section>
  );
}
