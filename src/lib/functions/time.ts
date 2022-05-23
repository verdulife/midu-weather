export function daySection() {
	const now = new Date();
	const hour = now.getHours();

	if (hour > 21 || hour < 6) return 'night';
	if (hour < 12) return 'morning';
	if (hour < 18) return 'day';
	return 'evening';
}
