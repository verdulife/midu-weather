import type { HourWeatherFromAPI, DayWeatherFromAPI, HourWeather, DayWeather } from '$lib/types';

export function daySection(): string {
	const now = new Date();
	const hour = now.getHours();

	if (hour >= 21 || hour < 6) return 'night';
	return 'day';
}

export function normalizedCondition(condition: string): string {
	const c = condition.toLowerCase();

	if (c.includes('rain') || c.includes('shower') || c.includes('drizzle')) return 'rain';
	if (c.includes('thunder')) return 'thunder';
	if (
		c.includes('cloud') ||
		c.includes('cloudy') ||
		c.includes('overcast') ||
		c.includes('mist') ||
		c.includes('fog')
	)
		return 'cloud';
	if (
		c.includes('snow') ||
		c.includes('blizzard') ||
		c.includes('sleet') ||
		c.includes('pellet') ||
		c.includes('ice')
	)
		return 'snow';

	return 'sunny';
}

export function transformScroll(event: WheelEvent) {
	if (!event.deltaY) return;

	if (event.currentTarget) {
		const el = event.currentTarget as HTMLElement;

		event.preventDefault();
		el.scrollLeft += event.deltaY + event.deltaX;
	}
}

function getHoursData(day: DayWeatherFromAPI): HourWeather[] {
	const hours: HourWeather[] = [];

	day.hour.forEach((h: HourWeatherFromAPI) => {
		hours.push({
			temp: {
				fahrenheit: h.temp_f,
				celsius: h.temp_c
			},
			condition: h.condition.text,
			icon: h.condition.icon,
			wind: {
				speed: {
					mph: h.wind_mph,
					kph: h.wind_kph
				},
				direction: h.wind_dir
			},
			humidity: h.humidity,
			feelslike: {
				fahrenheit: h.feelslike_f,
				celsius: h.feelslike_c
			}
		});
	});

	return hours;
}

function getForecastData(days: DayWeatherFromAPI[]): DayWeather[] {
	const forecast: DayWeather[] = [];

	days.forEach((day: DayWeatherFromAPI) => {
		forecast.push({
			date: day.date,
			hour: getHoursData(day)
		});
	});

	return forecast;
}

export async function getWeatherFrom(city: string) {
	const FORECAST_URL = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=5`;
	const req = await fetch(FORECAST_URL, {
		headers: {
			'x-rapidapi-host': import.meta.env.VITE_HEADER_HOST,
			'x-rapidapi-key': import.meta.env.VITE_HEADER_KEY
		}
	});

	if (!req.ok) return null;

	const { location, forecast } = await req.json();
	const { forecastday } = forecast;

	const data = {
		location: {
			city: location.name,
			region: location.region,
			country: location.country
		},
		forecast: getForecastData(forecastday)
	};

	return data;
}
