import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const clientId = process.env.VITE_LINKEDIN_CLIENT_ID;
  const redirectUri = process.env.VITE_LINKEDIN_REDIRECT_URI || 'https://software-engineer-portfolio.vercel.app/api/linkedin-callback';
  const scope = 'profile,openid';

  const authUrl = new URL('https://www.linkedin.com/oauth/v2/authorization');
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('client_id', clientId!);
  authUrl.searchParams.append('redirect_uri', redirectUri);
  authUrl.searchParams.append('scope', scope);
  authUrl.searchParams.append('state', Buffer.from(Date.now().toString()).toString('base64'));

  res.redirect(authUrl.toString());
}
