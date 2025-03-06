// components/Blog.tsx
import React from 'react';
import Markdown from 'markdown-to-jsx';
import Link from 'next/link';

import Header from './Header'; // Adjust the import path if necessary
import Footer from './Footer';

// Define the Article interface
interface Article {
  title: string;
  description: string;
  content: string;
  slug: string;
}

// Define props interface
interface BlogProps {
  articles: Article[];
}

const Blog: React.FC<BlogProps> = ({ articles }) => {
  return (
    <div className="container mx-auto my-8">
      <Header isAuthenticated={false} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article: Article, index: number) => (
          <div key={index} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p className="text-gray-600">{article.description}</p>
            <Markdown>{article.content}</Markdown>
            <Link
              href={`/articles/${article.slug}`}
              className="text-blue-500 hover:underline"
            >
              Read more
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Blog;