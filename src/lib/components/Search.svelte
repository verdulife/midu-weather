<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { navVisible, UserSettings } from '$lib/stores';
	import AutoComplete from 'simple-svelte-autocomplete';

	$navVisible = true;
	let selection: string;

	async function getItems(term: string) {
		const req = await fetch(`https://weatherapi-com.p.rapidapi.com/search.json?q=${term}`, {
			method: 'GET',
			headers: {
				'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
				'X-RapidAPI-Key': '5c893bec38msh12ab05cc8f6121fp11d64ejsn294a1e6ac98d'
			}
		});

		if (!req.ok) return;

		const res = await req.json();

		return res;
	}

	function setCity({ name }: { name: string }) {
		$UserSettings.city = name;
		goto(`address/${name}`);
	}

	onMount(() => {
		const input = document.querySelector('input') as HTMLInputElement;
		input.focus();
	});
</script>

<AutoComplete
	searchFunction={getItems}
	delay="200"
	localFiltering={false}
	labelFieldName="name"
	valueFieldName="id"
	hideArrow={true}
	bind:selectedItem={selection}
	placeholder="Search for a location"
	tabIndex={1}
>
	<div class="col xfill" slot="item" let:item let:label on:click={() => setCity(item)}>
		<p>{@html label}</p>
		<span>{item.region}, {item.country}</span>
	</div>
</AutoComplete>

<style>
	p {
		margin-bottom: 5px;
	}

	span {
		font-size: 14px;
	}
</style>
