# FleaRadar Documentation

## Overview

This document provides an overview of FleaRadar.

1. Article System
2. Authentication System

## Article System

### File Structure

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

## Pages System

The article system uses a dynamic routing system based on Next.js pages. Each article is rendered using the `ArticlePage` component in `src/app/articles/[slug]/page.tsx`.

The `ArticlePage` component uses CSS media queries and the `splitArticle` function to provide a responsive layout. On larger screens, the article content is split into three columns, while on smaller screens, the content is displayed in a single column.

The `splitArticle` function is responsible for splitting the article content into three parts based on word count. If the article is short or the screen is small, the function returns the entire content as a single element.

## Authentication System

This application uses Supabase Auth for authentication. Here's how it works:

*   **Supabase Auth:** We leverage Supabase Auth as our authentication provider. Supabase handles user management, secure password storage, and session management.
*   **Cookies and JWT (JSON Web Token):** When a user signs in, Supabase sets HTTP cookies in the browser. These cookies contain a JWT, which is used for secure session management.
*   **Server-side Session Validation:** Supabase servers automatically validate the JWT in the cookies on each request to protected resources. This ensures that only authenticated users can access protected parts of the application.
*   **Client-side Session Management (`useAuthStore`):** We use Zustand with `sessionStorage` in `src/lib/store/use-auth-store.ts` to manage the client-side authentication state. This includes storing the user object and session expiry, and providing functions to update and clear the session.
*   **Key Components and Functions:**
    *   `createServerSupabaseClient` and `createClientComponentClient` (from `@supabase/auth-helpers-nextjs`): Used to create Supabase clients that automatically handle session management by including the JWT from cookies in requests.
    *   `AuthProvider` (`src/lib/providers/auth-provider.tsx`): Wraps the application to provide the Supabase client and session context to all components.
    *   `SupaAuthButton` (`src/components/SupaAuthButton.tsx`): A component that handles user login and logout actions, interacting with both server-side actions and client-side state.
    *   Middleware (`src/middleware.ts`): Protects routes by checking for a valid Supabase session using `createServerSupabaseClient`.
*   **Logout Flow:**
    *   When a user logs out, the `SupaAuthButton` component calls a server-side logout action (`serverLogout` in `src/app/actions.ts`) to invalidate the Supabase session.
    *   It also calls `clientLogout` (from `useAuthStore`) to clear the client-side authentication state.
    *   Finally, it triggers a full page reload to ensure the application reflects the logged-out state.

This system ensures secure and robust authentication by leveraging Supabase's backend services and managing client-side state for a seamless user experience.

## Future Improvements

*   Add pagination to the `DynamicArticles` component.
*   Implement a search feature to allow users to search for articles.
*   Add support for comments.
