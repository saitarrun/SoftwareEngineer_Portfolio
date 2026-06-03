import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { code, state } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Missing authorization code' });
  }

  const clientId = process.env.VITE_LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  const redirectUri = process.env.VITE_LINKEDIN_REDIRECT_URI || 'https://software-engineer-portfolio.vercel.app/api/linkedin-callback';

  try {
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code as string,
        client_id: clientId!,
        client_secret: clientSecret!,
        redirect_uri: redirectUri,
      }).toString(),
    });

    const data = await tokenResponse.json() as any;

    if (!tokenResponse.ok) {
      return res.status(400).json({ error: data.error_description || 'Token exchange failed' });
    }

    // Store token securely (in production, use database or secure storage)
    // For now, return it to client to store in localStorage
    res.json({
      access_token: data.access_token,
      expires_in: data.expires_in,
      token_type: data.token_type,
    });
  } catch (error) {
    console.error('OAuth error:', error);
    res.status(500).json({ error: 'OAuth callback failed' });
  }
}
