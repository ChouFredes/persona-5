import { useEffect, useMemo, useState } from 'react';
import { useBuenosAiresWeather } from '../hooks/useBuenosAiresWeather';

const DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'short',
  day: 'numeric',
  timeZone: 'America/Argentina/Buenos_Aires',
});

const TIME_FORMATTER = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'America/Argentina/Buenos_Aires',
});

export function DateClimateWidget() {
  const [now, setNow] = useState(() => new Date());
  const weather = useBuenosAiresWeather();

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const dateLabel = useMemo(() => DATE_FORMATTER.format(now), [now]);
  const timeLabel = useMemo(() => TIME_FORMATTER.format(now), [now]);

  return (
    <aside className="date-climate-widget" aria-label="Date and climate in Buenos Aires">
      <p className="hud-day">{dateLabel}</p>
      <p className="hud-time">{timeLabel}</p>
      <p className="hud-climate">
        {weather.loading ? 'Checking weather…' : `${weather.label} · ${Math.round(weather.temperature)}°C`}
      </p>
      {weather.error && <p className="hud-climate-fallback">Offline climate feed</p>}
    </aside>
  );
}
