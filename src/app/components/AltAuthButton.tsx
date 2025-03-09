import { auth0 } from '../../../lib/auth0';

export default async function AltAuthButton() {
  const session = await auth0.getSession();

  if (!session) {
    return (
      <main>
        <a href="/auth/login?screen_hint=signup">Signup</a>
        <a href="/auth/login">Login</a>
      </main>
    );
  }

  return (
    <main>
      <h1>Welcome, {session.user.name}!</h1>
    </main>
  );
}
