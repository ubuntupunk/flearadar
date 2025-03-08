# FleaRadar Article System Documentation

## Overview

This document provides an overview of the FleaRadar article system, including the file structure, components, and data flow.

## File Structure

*   `src/articles/`: Contains the markdown files for each article.
*   `src/app/articles/[slug]/page.tsx`: The main component for rendering articles.
*   `src/app/components/DynamicArticles.tsx`: Component for displaying a list of articles on the home page.
*   `src/lib/articles.ts`: Contains functions for fetching article data.

## Components

*   `ArticlePage`: This component is responsible for fetching and rendering a single article. It uses the `markdown-to-jsx` library to convert the markdown content to HTML.
*   `DynamicArticles`: This component displays a list of articles on the home page. It fetches the article data from the `getLatestArticles` function in `src/lib/articles.ts`.

## Data Flow

1.  The `DynamicArticles` component on the home page fetches the latest articles using the `getLatestArticles` function in `src/lib/articles.ts`.
2.  The `getLatestArticles` function reads the markdown files from the `src/articles/` directory and extracts the frontmatter data.
3.  The `DynamicArticles` component displays the list of articles, with links to the individual article pages.
4.  When a user clicks on an article link, the `ArticlePage` component fetches the article data using the `getArticle` function in `src/app/articles/[slug]/page.tsx`.
5.  The `getArticle` function reads the markdown file for the specified slug and extracts the frontmatter data and content.
6.  The `ArticlePage` component renders the article title, description, author, and content.

## Future Improvements

*   Add pagination to the `DynamicArticles` component.
*   Implement a search feature to allow users to search for articles.
*   Add support for comments.
