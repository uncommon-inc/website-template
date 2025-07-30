<script lang="ts">
	// Components
	import { CONFIG } from "$lib/content";

	// Props
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.meta.title} | {CONFIG.companyName}</title>
	<meta name="description" content={data.meta.description} />
</svelte:head>
<div class="section-px section-py container mx-auto max-w-prose">
	<div class="mx-auto max-w-3xl">
		<header class="mb-20">
			<h1 class="text-title1">{data.meta.title}</h1>

			<p class="text-body text-emphasis-low">
				Last updated: {new Date(data.content.lastUpdated).toLocaleDateString("en-US", {
					year: "numeric",
					month: "long",
					day: "numeric"
				})}
			</p>
		</header>

		<main class="grid gap-12">
			{#each data.content.sections as section}
				<section>
					<h2 class="text-headline mb-3">{section.title}</h2>
					<p class="text-body text-foreground">
						{section.body}
					</p>
				</section>
			{/each}
		</main>
	</div>
</div>
