<script lang="ts">
	export let temp: number;
	export let size: string;
</script>

<output class="row jcenter xfill" style="font-size: {size}">
	{temp}º
</output>

<style lang="scss">
	output {
		position: relative;
		color: #fff;
		line-height: 1;
	}
</style>
