<script lang="ts">
	import SectionHeader from "$lib/components/layout/SectionHeader.svelte";

	let {
		title,
		subtitle,
		imageSrc = "https://www.unc.mn/image-placeholder.svg",
		...rest
	}: {
		title: string;
		subtitle: string;
		imageSrc: string;
		[key: string]: any;
	} = $props();
</script>

<header class="border-border border-b" {...rest}>
	<div class="text-title3 section-px section-py container mx-auto grid gap-16 gap-y-0">
		<SectionHeader {title} {subtitle} size="lg" />
		<div class="bg-muted aspect-video overflow-clip rounded-xl">
			<img
				class="h-full w-full object-cover"
				src={imageSrc}
				alt="Diverse group of people collaborating"
			/>
		</div>
	</div>
</header>
