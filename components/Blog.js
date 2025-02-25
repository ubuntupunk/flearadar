// components/Blog.js
import React from 'react';
import Markdown from 'markdown-to-jsx';
import Link from 'next/link';

const Blog = ({ articles }) => {
  // Sort articles by date and get the latest four
  const latestArticles = articles
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date descending
    .slice(0, 4); // Get the first four articles

  
  return (
    (<div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">Articles & Guides</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article, index) => (
          <div key={index} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p className="text-gray-600">{article.description}</p>
            <Markdown>{article.content}</Markdown>
            <Link
              href={`/articles/${article.slug}`}
              className="text-blue-500 hover:underline">
            Read more
            </Link>
          </div>
        ))}       
      </div>
    </div>)
  );
};

export default Blog;