<!--

@component CenteredTextOnlyHero

This component displays a centered text hero with call to action buttons.
Takes up the full viewport height and centers content vertically.
-->

<script lang="ts">
	// Components
	import AnimateText from "$lib/components/animation/AnimateText.svelte";
	import Button from "$lib/components/ui/Button.svelte";

	// Constants
	import { cta } from "$lib/navigation";

	// Types
	type Props = {
		title: string;
		subtitle: string;
		imageSrc: string;
		callsToAction?: Array<{
			href: string;
			label: string;
		}>; // A maximum of two calls to action, with the first one being primary and the second one being secondary
	};

	let {
		title,
		subtitle,
		callsToAction = [cta],
		imageSrc = "https://www.unc.mn/image-placeholder.svg",
		...rest
	}: Props = $props();
</script>

<div class="grid h-[calc(100vh-var(--nav-height))] grid-rows-[1fr_auto]" {...rest}>
	<div class="bg-background relative isolate flex items-center justify-center">
		<div
			style:background-image="url('{imageSrc}')"
			class="absolute top-0 right-4 bottom-4 left-4 -z-10 rounded-2xl bg-cover bg-center brightness-100 after:absolute after:inset-0 after:rounded-2xl after:shadow-[inset_0_0_100px_40px_rgba(0,0,0,0.3)]"
		></div>

		<div class="bg-background/50 absolute inset-0"></div>

		<header
			class="section-px text-foreground z-50 container mx-auto grid place-items-center text-center text-balance"
			data-enter-container
		>
			<div class="grid max-w-prose place-items-center justify-center gap-6 lg:max-w-[80ch]">
				<h1 class="text-display w-full text-balance lg:!text-7xl" data-enter>
					<span class="block"><AnimateText text={title} /></span>
				</h1>

				<p
					data-enter
					class="text-headline text-muted-foreground block max-w-[45ch] text-pretty transition duration-500 ease-out"
				>
					{subtitle}
				</p>
			</div>

			{#if callsToAction.length > 0}
				<div class="mt-8 flex gap-4" data-enter>
					{#each callsToAction as cta, index}
						<Button href={cta.href} size="lg" variant="secondary" class="max-lg:hidden"
							>{cta.label}</Button
						>
						<Button
							href={cta.href}
							size="md"
							variant={index % 2 === 0 ? "secondary" : "ghost"}
							class="lg:hidden">{cta.label}</Button
						>
					{/each}
				</div>
			{/if}
		</header>
	</div>
</div>
