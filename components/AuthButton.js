import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';

export default AuthButton;

function AuthButton() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <Link href="/api/auth/logout" className="btn bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700">
        Logout
      </Link>
    );
  }

  return (
    <Link href="/api/auth/login" className="btn bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600">
      Login / Register
    </Link>
  );
}