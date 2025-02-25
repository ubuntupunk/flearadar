// pages/articles/[slug].js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Markdown from 'markdown-to-jsx';

const ArticlePage = ({ content, frontmatter }) => {
  return (
    <div>
      <h1>{frontmatter.title}</h1>
      <Markdown>{content}</Markdown>
    </div>
  );
};

export async function getStaticPaths() {
  const articlesDirectory = path.join(process.cwd(), 'articles');
  const filenames = fs.readdirSync(articlesDirectory);

  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace(/\.md$/, '') }, // Remove .md extension for slug
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const articlesDirectory = path.join(process.cwd(), 'articles');
  const filePath = path.join(articlesDirectory, `${params.slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    props: {
      frontmatter: data,
      content,
    },
  };
}

export default ArticlePage;