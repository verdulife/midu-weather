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
