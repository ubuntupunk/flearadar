// pages/blog.js
import Blog from '../components/Blog'; // Import the Blog component

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BlogPage = ({ articles }) => {
  return <Blog articles={articles} />;
};

export async function getServerSideProps() {
  const articlesDirectory = path.join(process.cwd(), 'articles');
  const filenames = fs.readdirSync(articlesDirectory);

  const articles = filenames.map((filename) => {
    const filePath = path.join(articlesDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    return { ...data, content };
  });

  return {
    props: {
      articles,
    },
  };
}


export default BlogPage;
