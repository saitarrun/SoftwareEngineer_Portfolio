import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, RefreshCw, ExternalLink } from 'lucide-react';

interface ContributionDay {
  date: string;
  count: number;
  level: number;
  text: string;
}

interface MonthLabel {
  name: string;
  index: number;
}

interface ContributionData {
  totalContributions: number;
  years: number[];
  days: ContributionDay[];
  months?: MonthLabel[];
}

const LEVEL_COLORS = [
  'bg-zinc-900/80 border-white/5', // 0: No contributions
  'bg-emerald-950 border-emerald-800/40 text-emerald-400', // 1: 1-3 contributions
  'bg-emerald-700/80 border-emerald-600/50 text-emerald-300', // 2: 4-6 contributions
  'bg-emerald-500 border-emerald-400/60 text-emerald-100', // 3: 7-9 contributions
  'bg-emerald-400 border-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.5)] text-black', // 4: 10+ contributions
];

export const GithubContributionGraph = () => {
  const [data, setData] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  const availableYears = [2026, 2025, 2024, 2023, 2022];

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(false);

    const fetchContributions = async () => {
      try {
        let res = await fetch(`/api/github-contributions?username=saitarrun&year=${selectedYear}`);
        if (!res.ok) {
          res = await fetch(
            `https://github.com/users/saitarrun/contributions?from=${selectedYear}-01-01&to=${selectedYear}-12-31`
          );
        }
        if (!res.ok) throw new Error('Failed to fetch');

        let json: ContributionData;
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          json = await res.json();
        } else {
          // Parse HTML text directly if fallback was triggered
          const html = await res.text();
          const totalMatch = html.match(/([0-9,]+)\s+contributions/i);
          const totalContributions = totalMatch
            ? parseInt(totalMatch[1].replace(/,/g, ''), 10)
            : 1298;

          const tooltipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]+)<\/tool-tip>/g;
          const tooltips: Record<string, string> = {};
          let t: RegExpExecArray | null;
          while ((t = tooltipRegex.exec(html)) !== null) {
            tooltips[t[1]] = t[2].trim();
          }

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

          json = {
            totalContributions,
            years: availableYears,
            days,
          };
        }

        if (isMounted) {
          setData(json);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load contributions:', err);
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      }
    };

    fetchContributions();

    return () => {
      isMounted = false;
    };
  }, [selectedYear]);

  // Group days by week (7 days per column)
  const weeks: ContributionDay[][] = [];
  if (data && data.days.length > 0) {
    let currentWeek: ContributionDay[] = [];
    data.days.forEach((day) => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });
    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }
  }

  // Month labels extraction helper
  const monthLabels: { name: string; index: number }[] = [];
  if (weeks.length > 0) {
    let lastMonth = '';
    weeks.forEach((week, index) => {
      if (week[0]) {
        const d = new Date(week[0].date);
        const monthName = d.toLocaleString('en-US', { month: 'short' });
        if (monthName !== lastMonth) {
          monthLabels.push({ name: monthName, index });
          lastMonth = monthName;
        }
      }
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-16 sm:mt-24 p-6 sm:p-8 md:p-10 glass-card rounded-3xl relative overflow-hidden border border-white/10"
    >
      {/* Background glow overlay */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Github className="w-5 h-5 text-emerald-400" />
            <span
              className="text-emerald-400 text-xs font-bold uppercase tracking-[0.25em]"
              style={{ fontFamily: 'var(--font-label)' }}
            >
              Open Source Activity
            </span>
          </div>
          <h3
            className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {loading ? (
              <span className="animate-pulse bg-white/10 rounded h-8 w-48 block" />
            ) : (
              `${(data?.totalContributions ?? 1298).toLocaleString()} contributions in ${selectedYear}`
            )}
          </h3>
        </div>

        {/* Controls: Year Selector & GitHub Profile Link */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 p-1 bg-zinc-950/80 rounded-full border border-white/10 backdrop-blur-md">
            {availableYears.map((yr) => {
              const isSelected = selectedYear === yr;
              return (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setSelectedYear(yr)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 relative outline-none cursor-pointer ${
                    isSelected ? 'text-black font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeYearContrib"
                      className="absolute inset-0 bg-emerald-400 rounded-full -z-10 shadow-[0_0_12px_rgba(52,211,153,0.4)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  {yr}
                </button>
              );
            })}
          </div>

          <a
            href="https://github.com/saitarrun"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/40 text-zinc-400 hover:text-emerald-400 transition-all duration-300 flex items-center justify-center cursor-pointer"
            title="View on GitHub"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Heatmap Grid Box */}
      <div className="relative z-10 bg-zinc-950/60 p-5 sm:p-6 rounded-2xl border border-white/5 overflow-x-auto scrollbar-none">
        {loading ? (
          <div className="flex items-center justify-center py-16 gap-3 text-zinc-400">
            <RefreshCw className="w-5 h-5 animate-spin text-emerald-400" />
            <span className="text-sm">Fetching live GitHub contributions...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-zinc-400">
            <p className="text-sm mb-3">Unable to connect to live GitHub graph right now.</p>
            <a
              href="https://github.com/saitarrun"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold hover:underline"
            >
              View profile directly on GitHub <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ) : (
          <div className="flex flex-col gap-2 min-w-[700px]">
            {/* Month Labels Header */}
            <div className="flex text-[10px] font-medium text-zinc-500 pl-8 relative h-4 select-none">
              {(data?.months && data.months.length > 0 ? data.months : monthLabels).map((m) => (
                <div
                  key={m.name + m.index}
                  className="absolute"
                  style={{ left: `${m.index * 16 + 32}px` }}
                >
                  {m.name}
                </div>
              ))}
            </div>

            {/* Main Day Grid with Day Labels */}
            <div className="flex items-start gap-1.5">
              {/* Day of Week Labels */}
              <div className="flex flex-col justify-between text-[9px] text-zinc-600 font-medium h-[104px] pr-2 shrink-0 select-none">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>

              {/* Grid of Weeks */}
              <div className="flex gap-1 flex-1">
                {weeks.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-1">
                    {week.map((day, dIdx) => (
                      <div
                        key={day.date || `${wIdx}-${dIdx}`}
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                        className={`w-3 h-3 rounded-[2.5px] border transition-all duration-200 cursor-pointer ${
                          LEVEL_COLORS[day.level] || LEVEL_COLORS[0]
                        } hover:scale-125 hover:z-20`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer / Legend / Hover Tooltip */}
            <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/5 text-xs text-zinc-400">
              <div className="flex items-center gap-2 min-h-5">
                {hoveredDay ? (
                  <span className="text-emerald-300 font-medium animate-fadeIn">
                    {hoveredDay.text}
                  </span>
                ) : (
                  <span className="text-zinc-500">Hover over any square for daily breakdown</span>
                )}
              </div>

              {/* Standard GitHub Color Scale Legend */}
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                <span>Less</span>
                <div className="flex gap-1">
                  {LEVEL_COLORS.map((colorClass, idx) => (
                    <div key={idx} className={`w-3 h-3 rounded-[2.5px] border ${colorClass}`} />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
