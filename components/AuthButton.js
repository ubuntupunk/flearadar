import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';

export default function AuthButton() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <a href="/api/auth/logout" className="btn bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700">
        Logout
      </a>
    );
  }

  return (
    <a href="/api/auth/login" className="btn bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600">
      Login / Register
    </a>
  );
}