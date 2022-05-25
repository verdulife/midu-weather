import type { HourWeatherFromAPI, DayWeatherFromAPI, HourWeather, DayWeather } from '$lib/types';

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

async function getWeatherFrom(city: string) {
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

export async function get({ params }: { params: { city: string } }) {
	const { city } = params;

	const data = await getWeatherFrom(city);

	return {
		status: 200,
		body: {
			data
		}
	};
}
