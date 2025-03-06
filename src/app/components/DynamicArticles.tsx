// components/DynamicArticles.tsx

import Link from 'next/link';

// Define the Article interface
interface Article {
  title: string;
  description: string;
  date: string;
  slug: string;
  [key: string]: any; // Allow for additional frontmatter fields
}

// Define props interface
interface DynamicArticlesProps {
  latestArticles: Article[];
}

const DynamicArticles: React.FC<DynamicArticlesProps> = ({ latestArticles }) => {
  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-bold mb-4">Articles & Guides</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {latestArticles.map((article: Article, index: number) => (
          <div key={index} className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold">{article.title}</h3>
            <p className="text-gray-600">{article.description}</p>
            <Link
              href={`/articles/${article.slug}`}
              className="text-blue-500 hover:underline"
            >
              Read more
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};


export default DynamicArticles;
