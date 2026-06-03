import { VercelRequest, VercelResponse } from '@vercel/node';

interface LinkedInPost {
  id: string;
  text?: string;
  createdTime?: number;
  visibility?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { access_token } = req.query;

  if (!access_token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const response = await fetch('https://api.linkedin.com/v2/me/posts?count=10', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch posts' });
    }

    const data = await response.json() as any;
    const posts: LinkedInPost[] = data.elements || [];

    res.json({ posts, total: posts.length });
  } catch (error) {
    console.error('Fetch posts error:', error);
    res.status(500).json({ error: 'Failed to fetch LinkedIn posts' });
  }
}
