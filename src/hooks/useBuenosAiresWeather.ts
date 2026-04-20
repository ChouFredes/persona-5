import { useEffect, useMemo, useState } from 'react';

type WeatherState = {
  temperature: number;
  code: number;
  loading: boolean;
  error: boolean;
};

const WEATHER_API_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=-34.6037&longitude=-58.3816&current=temperature_2m,weather_code&timezone=America%2FArgentina%2FBuenos_Aires';

const weatherCodeLabel = (code: number) => {
  if (code === 0) return 'Clear';
  if (code >= 1 && code <= 3) return 'Partly Cloudy';
  if (code >= 45 && code <= 48) return 'Fog';
  if (code >= 51 && code <= 67) return 'Rain';
  if (code >= 71 && code <= 77) return 'Snow';
  if (code >= 80 && code <= 82) return 'Showers';
  if (code >= 85 && code <= 86) return 'Snow Showers';
  if (code >= 95) return 'Storm';
  return 'Cloudy';
};

export function useBuenosAiresWeather() {
  const [state, setState] = useState<WeatherState>({
    temperature: 0,
    code: 1,
    loading: true,
    error: false,
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchWeather = async () => {
      try {
        const response = await fetch(WEATHER_API_URL, { signal: controller.signal });
        if (!response.ok) {
          throw new Error('Weather request failed');
        }

        const payload = (await response.json()) as {
          current?: {
            temperature_2m?: number;
            weather_code?: number;
          };
        };

        if (typeof payload.current?.temperature_2m !== 'number') {
          throw new Error('Missing weather data');
        }

        setState({
          temperature: payload.current.temperature_2m,
          code: payload.current.weather_code ?? 1,
          loading: false,
          error: false,
        });
      } catch {
        setState((previous) => ({
          ...previous,
          loading: false,
          error: true,
        }));
      }
    };

    void fetchWeather();
    const interval = window.setInterval(fetchWeather, 15 * 60 * 1000);

    return () => {
      controller.abort();
      window.clearInterval(interval);
    };
  }, []);

  return useMemo(
    () => ({
      ...state,
      label: weatherCodeLabel(state.code),
    }),
    [state],
  );
}
