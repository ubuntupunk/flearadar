import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Markdown from 'markdown-to-jsx';

export async function generateStaticParams() {
  const articlesDirectory = path.join(process.cwd(), 'src/articles');
  const filenames = fs.readdirSync(articlesDirectory);

  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ''), // Remove .md extension for slug
  }));
}

async function getArticle(slug: string) {
  const articlesDirectory = path.join(process.cwd(), 'src/articles');
  const filePath = path.join(articlesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  // Remove the first h1 heading from the content
  const contentWithoutHeading = content.replace(/^#\s[^\n]+\n/, '');

  return {
    frontmatter: data,
    content: contentWithoutHeading,
  };
}

interface Params {
  slug: string;
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = params;
  const article = await getArticle(slug);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{article.frontmatter.title}</h1>
      <p className="text-gray-700 leading-relaxed">{article.frontmatter.description}</p>
      <Markdown
        options={{
          overrides: {
            h1: {
              component: (props) => <h1 className="text-2xl font-bold mb-2" {...props} />,
            },
            p: {
              component: (props) => <p className="text-gray-700 leading-relaxed" {...props} />,
            },
            // Add more overrides as needed
          },
        }}
      >
        {article.content}
      </Markdown>
    </div>
  );
}
