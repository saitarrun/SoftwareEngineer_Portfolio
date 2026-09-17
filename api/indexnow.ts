import type { ApiRequest, ApiResponse } from './types';

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const host = 'software-engineer-portfolio-brown.vercel.app';
  const key = process.env.INDEXNOW_KEY || 'portfolio2026indexnowkey';
  const urlList = [
    `https://${host}/`,
    `https://${host}/#experience`,
    `https://${host}/#projects`,
    `https://${host}/#skills`,
    `https://${host}/#education`,
    `https://${host}/#contact`,
  ];

  try {
    const response = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        host,
        key,
        keyLocation: `https://${host}/${key}.txt`,
        urlList,
      }),
    });

    return res.status(200).json({
      success: true,
      status: response.status,
      message: 'IndexNow URL submission triggered for Bing and partner search engines.',
      submittedUrls: urlList,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to submit IndexNow ping',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
