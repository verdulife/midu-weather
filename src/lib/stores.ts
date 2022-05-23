import { browser } from '$app/env';
import { writable } from 'svelte/store';

const defaultSettings = {
	temperature: 'celsius',
	distance: 'metric',
	city: null
};

export const UserSettings = writable(
	(browser && JSON.parse(localStorage.getItem('UserSettings'))) || defaultSettings
);

UserSettings.subscribe((val) => browser && (localStorage.UserSettings = JSON.stringify(val)));
