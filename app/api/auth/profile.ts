import { getSession, getAccessToken } from '@auth0/nextjs-auth0';

export default async function profile(req, res) {
  try {
    // First, try to get the session
    const session = getSession(req, res);
    if (session) {
      // If session exists, return user details
      return res.status(200).json(session.user);
    }

    // If no session, try to get the access token
    const token = await getAccessToken(req, res);
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Use the token to fetch user details from your API if needed
    // Example: const userDetails = await fetchUserDetails(token);
    return res.status(200).json({ token }); // Return the token or user details
  } catch (error) {
    console.error('Error fetching profile:', error);
    return res.status(500).json({ message: 'Error fetching profile', error });
  }
}