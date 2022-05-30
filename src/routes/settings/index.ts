import { getWeatherFrom } from '$lib/utils';

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
