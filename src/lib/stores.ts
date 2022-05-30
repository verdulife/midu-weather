import { browser } from '$app/env';
import { writable } from 'svelte/store';

const defaultSettings = {
	temperature: 'celsius',
	distance: 'metric',
	city: null
};

const storedSettings = browser && localStorage.getItem('UserSettings');
export const UserSettings = writable(JSON.parse(storedSettings as string) || defaultSettings);
UserSettings.subscribe((val) => browser && (localStorage.UserSettings = JSON.stringify(val)));

export const navVisible = writable(false);
export const condition = writable('');
export const selectedHour = writable(new Date().getHours());
