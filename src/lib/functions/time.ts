export function daySection() {
	const now = new Date();
	const hour = now.getHours();

	if (hour > 21 || hour < 6) return 'night';
	return 'day';
}
