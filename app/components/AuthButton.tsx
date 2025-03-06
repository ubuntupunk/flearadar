"use client";

// components/AuthButton.tsx

import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';

// Optional: Define props interface even if not used yet
interface AuthButtonProps {
  // Add props here if needed in the future
}

function AuthButton(/* props: AuthButtonProps */) {
  const { user, error, isLoading }: { user: any, error: Error | undefined | null, isLoading: boolean } = useUser();

  console.log('User:', user);
  console.log('Error:', error);
  console.log('Loading:', isLoading);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error('Auth Error:', error);
    return <div>{error.message}</div>;
  }

  if (user) {
    // User exists, show logout button
    return (
      <Link 
        href="/api/auth/logout" 
        className="btn bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700"
      >
        Logout
      </Link>
    );
  }

  // User does not exist, show login button
  return (
    <Link 
      href="/api/auth/login" 
      className="btn bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
    >
      Login / Register
    </Link>
  );
}

export default AuthButton;
