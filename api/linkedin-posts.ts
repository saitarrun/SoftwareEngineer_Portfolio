import { VercelRequest, VercelResponse } from '@vercel/node';

interface LinkedInPost {
  id: string;
  text?: string;
  createdTime?: number;
  visibility?: string;
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;

  if (!accessToken) {
    return res.status(401).json({ error: 'LinkedIn access token not configured' });
  }

  try {
    const response = await fetch('https://api.linkedin.com/v2/me/posts?count=10', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      console.error('LinkedIn API error:', response.status, response.statusText);
      return res.status(response.status).json({ error: 'Failed to fetch posts' });
    }

    const data = (await response.json()) as any;
    const posts: LinkedInPost[] = data.elements || [];

    res.setHeader('Cache-Control', 'public, max-age=300');
    res.json({ posts, total: posts.length });
  } catch (error) {
    console.error('Fetch posts error:', error);
    res.status(500).json({ error: 'Failed to fetch LinkedIn posts' });
  }
}
