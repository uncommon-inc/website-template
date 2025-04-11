<!--

@component CustomerCardHero

This hero displays a row of customers. If used, we don't need a testimonial section on the same page.

It should ALWAYS have between 3 and 5 customers!
-->

<script lang="ts">
	// Components
	import AnimateText from "$lib/components/animation/AnimateText.svelte";
	import Button from "$lib/components/ui/Button.svelte";

	// Constants
	import { cta } from "$lib/navigation";
	import { onMount } from "svelte";
	import StakeholderCard from "../sub/StakeholderCard.svelte";
	import { animate, stagger } from "motion";

	let cards: HTMLElement[] = $state([]);

	// Types
	type Props = {
		centered?: boolean;
		title: string;
		subtitle: string;
		customers: Array<{
			name: string;
			position?: string;
			imageSrc: string;
		}>;
		callsToAction?: Array<{
			href: string;
			label: string;
		}>; // A maximum of two calls to action, with the first one being primary and the second one being secondary
	};

	let {
		title,
		subtitle,
		customers = [],
		callsToAction = [cta],
		centered = false
	}: Props = $props();

	onMount(() => {
		animate(
			cards,
			{
				// y: ["50%", 0],
				scale: [0.9, 1],
				filter: ["blur(4px)", "blur(0px)"],
				opacity: [0, 1]
			},
			{
				duration: 0.5,
				ease: "easeOut",
				delay: stagger(0.1, {
					startDelay: 0.5,
					ease: "easeInOut"
				})
			}
		);
	});
</script>

<div class="bg-background">
	<header
		class={[
			"section-px container mx-auto grid items-end gap-16 gap-y-9 text-balance",
			centered ? "place-items-center py-16 text-center" : "mb-12 pt-24 xl:grid-cols-[1fr_auto]"
		]}
		data-enter-container
	>
		<div class="grid max-w-prose gap-6">
			<h1 class="text-display w-full text-balance" data-enter>
				<span class="block"><AnimateText text={title} /></span>
			</h1>

			<p
				data-enter
				class={[
					"text-muted-foreground text-headline block  max-w-[45ch] text-pretty transition duration-500 ease-out",
					centered && "mx-auto"
					// isTitleComplete ? "opacity-100" : "translate-y-2 opacity-0 blur-sm"
				]}
			>
				{subtitle}
			</p>
		</div>

		{#if callsToAction.length > 0}
			<div class="flex gap-4" data-enter>
				{#each callsToAction as cta, index}
					<Button
						href={cta.href}
						size="lg"
						variant={index % 2 === 0 ? "primary" : "secondary"}
						class="max-lg:hidden">{cta.label}</Button
					>
					<Button
						href={cta.href}
						size="md"
						variant={index % 2 === 0 ? "primary" : "secondary"}
						class="lg:hidden">{cta.label}</Button
					>
				{/each}
			</div>
		{/if}
	</header>

	<div
		class="mt-4 grid flex-nowrap gap-(--card-gap) overflow-x-auto px-(--card-gap) whitespace-nowrap [--card-gap:calc(var(--radius)/2)] [--gap:--spacing(5)] max-lg:auto-cols-max max-lg:grid-flow-col md:whitespace-normal lg:grid-cols-5 lg:flex-wrap"
	>
		{#each customers as customer, index}
			<div class="h-full overflow-clip">
				<StakeholderCard bind:cards {...customer} {index} />
			</div>
		{/each}
	</div>
</div>
