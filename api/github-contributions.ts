import type { ApiRequest, ApiResponse } from './types';

export interface ContributionDay {
  date: string;
  count: number;
  level: number;
  text: string;
}

export interface ContributionData {
  totalContributions: number;
  years: number[];
  days: ContributionDay[];
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  const username = (req.query.username as string) || 'saitarrun';
  const year = req.query.year as string | undefined;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Cache-Control',
    'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400'
  );

  try {
    const targetUrl = year
      ? `https://github.com/users/${username}/contributions?from=${year}-01-01&to=${year}-12-31`
      : `https://github.com/users/${username}/contributions`;

    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml',
      },
    });

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: 'Failed to fetch contribution data from GitHub' });
    }

    const html = await response.text();

    // Total count parsing
    const totalMatch = html.match(/([0-9,]+)\s+contributions/i);
    const totalContributions = totalMatch ? parseInt(totalMatch[1].replace(/,/g, ''), 10) : 0;

    // Tooltip mapping
    const tooltipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]+)<\/tool-tip>/g;
    const tooltips: Record<string, string> = {};
    let t: RegExpExecArray | null;
    while ((t = tooltipRegex.exec(html)) !== null) {
      tooltips[t[1]] = t[2].trim();
    }

    // Day level and date parsing
    const dayRegex = /data-date="([^"]+)"[^>]*id="([^"]+)"[^>]*data-level="([^"]+)"/g;
    const days: ContributionDay[] = [];
    let d: RegExpExecArray | null;
    while ((d = dayRegex.exec(html)) !== null) {
      const tipText = tooltips[d[2]] || '';
      const countMatch = tipText.match(/([0-9,]+|No)\s+contribution/i);
      let count = 0;
      if (countMatch && countMatch[1] !== 'No') {
        count = parseInt(countMatch[1].replace(/,/g, ''), 10);
      }
      days.push({
        date: d[1],
        level: parseInt(d[3], 10),
        count,
        text: tipText || `${count} contributions on ${d[1]}`,
      });
    }

    // Ensure days are sorted chronologically by date
    days.sort((a, b) => a.date.localeCompare(b.date));

    const data: ContributionData = {
      totalContributions,
      years: [2026, 2025, 2024, 2023, 2022],
      days,
    };

    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300, stale-while-revalidate=600');
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching GitHub contribution graph:', error);
    return res.status(500).json({ error: 'Internal server error fetching contributions' });
  }
}
