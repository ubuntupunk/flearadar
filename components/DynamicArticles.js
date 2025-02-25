// components/DynamicArticles.js

import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

const DynamicArticles = ({ latestArticles }) => {
  return (
    (<div className="container mx-auto my-8">
      <h2 className="text-3xl font-bold mb-4">Articles & Guides</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {latestArticles.map((article, index) => (
          <div key={index} className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold">{article.title}</h3>
            <p className="text-gray-600">{article.description}</p>
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

export async function getStaticProps() {
  const articlesDirectory = path.join(process.cwd(), 'articles');
  const filenames = fs.readdirSync(articlesDirectory);

  const articles = filenames.map((filename) => {
    const filePath = path.join(articlesDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    return { ...data, slug: filename.replace(/\.md$/, '') }; // Add slug
  });

  // Sort articles by date and get the latest four
  const latestArticles = articles
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  return {
    props: {
      latestArticles,
    },
  };
}

export default DynamicArticles;