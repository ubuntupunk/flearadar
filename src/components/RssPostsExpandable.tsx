'use client';

import React from 'react';
import Link from 'next/link';

interface RssItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
}

interface Props {
  post: RssItem;
}

export default function RssPostsExpandable({ post }: Props): JSX.Element {
  return (
    <div className="keen-slider__slide px-2">
      <div className="bg-white dark:bg-gray-800 rounded shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-0.5 p-3 h-full flex flex-col">
        <a
          href={post.link}
          title={post.title}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-800 dark:text-white text-sm font-medium mb-1 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
        >
          {post.title}
        </a>
        <p className="text-gray-500 dark:text-gray-400 text-xs mb-2">
          {new Date(post.pubDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </p>
        <p className="text-gray-600 dark:text-gray-300 text-xs mb-2 line-clamp-3">
          {post.contentSnippet}
        </p>
        <Link
          href={post.link}
          className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 text-[11px] font-medium mt-auto"
        >
          Read more
        </Link>
      </div>
    </div>
  );
}
