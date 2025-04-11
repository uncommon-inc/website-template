<script lang="ts">
	import { page } from "$app/state";

	import Button from "$lib/components/ui/Button.svelte";
</script>

<div class="flex min-h-screen flex-col items-center justify-center">
	<div class="mx-auto w-full max-w-md text-center">
		<h1 class="text-display mb-2 text-gray-800 dark:text-gray-100">Error {page.status}</h1>
		<p class="text-body mb-8 text-gray-600 dark:text-gray-300">
			{page.error?.message}
		</p>

		<Button href="/">Go back home</Button>
	</div>
</div>
