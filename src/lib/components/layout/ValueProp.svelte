<script lang="ts">
	// Props
	const {
		title,
		content,
		imageSrc = ""
	}: { title: string; content: string; imageSrc?: string } = $props();
</script>

<section class="section-px section-py container mx-auto grid gap-12">
	<h2 class="text-title1 max-w-prose">
		{title}
	</h2>

	{#if imageSrc}
		<img src={imageSrc} alt={title} class="bg-muted aspect-video w-full rounded-lg" />
	{/if}

	<div class="text-foreground columns-1 gap-6 sm:columns-3">
		<p class="text-body">
			{content}
		</p>
	</div>
</section>
