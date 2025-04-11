<script lang="ts">
	// Types
	type UseCase = {
		title: string;
		description: string;
		image: string;
		uniqeSellingPoints?: string[];
		link?: {
			href: string;
			label: string;
		};
	};

	// Components
	import Button from "$lib/components/ui/Button.svelte";

	// Props
	const {
		title,
		subtitle,
		useCases = []
	}: { title: string; subtitle: string; useCases: UseCase[] } = $props();

	let current = $state(0);

	import { onMount } from "svelte";
	import SectionHeader from "./SectionHeader.svelte";
	import { fade } from "svelte/transition";
	import { cubicInOut, cubicOut } from "svelte/easing";

	// Preload images lazily
	onMount(() => {
		if (useCases.length) {
			useCases.forEach((useCase, index) => {
				if (index !== current && useCase.image) {
					const img = new Image();
					img.loading = "lazy";
					img.src = useCase.image;
				}
			});
		}
	});
</script>

<section class="[--gap:--spacing(4)] [--inner-radius:calc(var(--radius)-var(--gap))]">
	<div class="section-px section-py container mx-auto grid">
		<SectionHeader {title} {subtitle} />

		<div class="grid gap-(--gap) rounded-(--radius) lg:grid-cols-[1fr_2fr]">
			<!-- Left column: Use cases list -->
			<div
				class="items-between bg-card border-border row-start-2 grid content-between gap-8 rounded-(--radius) border p-(--gap) lg:row-start-auto"
			>
				<div>
					{#each useCases as useCase, index}
						<div class="group">
							<button
								class="text-title3 hover:text-primary-600 hover:dark:text-primary-300 row-start-1 mb-2 w-full text-left transition-colors"
								class:text-primary-700={current === index}
								class:dark:text-primary-400={current === index}
								onpointerenter={() => (current = index)}
							>
								{useCase.title}
							</button>
						</div>
					{/each}
				</div>
				<article class="row-start-2">
					<p class="text-body text-gray-500">{useCases[current].description}</p>
					{#if useCases[current]?.link}
						<div class="mt-6">
							<Button href={useCases[current].link.href} variant="secondary">
								{useCases[current].link.label}
							</Button>
						</div>
					{/if}
				</article>
			</div>

			<!-- Right column: Featured image -->
			<div class="grid overflow-clip rounded-(--radius) bg-gray-50">
				{#key useCases[current]?.image}
					<img
						transition:fade={{ easing: cubicInOut, duration: 200 }}
						src={useCases[current].image}
						alt="Featured use case"
						loading="lazy"
						class="grid-center aspect-[3/2] size-full max-h-full object-cover"
					/>
				{/key}
			</div>
		</div>
	</div>
</section>
