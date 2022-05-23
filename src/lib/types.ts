export type HourWeatherFromAPI = {
	temp_c: number;
	temp_f: number;
	condition: {
		text: string;
	};
	wind_mph: number;
	wind_kph: number;
	wind_dir: string;
	humidity: number;
	feelslike_c: number;
	feelslike_f: number;
};

export type DayWeatherFromAPI = {
	date: string;
	hour: HourWeatherFromAPI[];
};

export type HourWeather = {
	temp: {
		fahrenheit: number;
		celsius: number;
	};
	condition: string;
	wind: {
		speed: {
			mph: number;
			kph: number;
		};
		direction: string;
	};
	humidity: number;
	feelslike: {
		fahrenheit: number;
		celsius: number;
	};
};

export type DayWeather = {
	date: string;
	hour: HourWeather[];
};

export type Forecast = {
	location: {
		city: string;
		region: string;
		country: string;
	};
	forecast: DayWeather[];
};
