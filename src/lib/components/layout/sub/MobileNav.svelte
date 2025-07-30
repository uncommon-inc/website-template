<script lang="ts">
	// Types
	import type { NavItem } from "$lib/navigation";

	// Components
	import Button from "$lib/components/ui/Button.svelte";
	import IconMenu from "~icons/lucide/menu";
	import IconChevronRight from "~icons/lucide/chevron-right";

	// Utils
	import { cta, navigation } from "$lib/navigation";
	import { beforeNavigate } from "$app/navigation";

	// Props
	const { items = [] }: { items: typeof navigation } = $props();

	// State
	let isMenuOpen = $state(false);
	let scrollBarWidth: number = $state(0);
	let themeColor: string = $state("");
	let originalThemeColor: string | null = $state(null);

	$effect(() => {
		scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
	});

	$effect(() => {
		const metaThemeColor = document.querySelector('meta[name="theme-color"]');
		// Ensure no undefined: default to null if missing
		originalThemeColor = metaThemeColor?.getAttribute("content") ?? null;
	});

	$effect(() => {
		try {
			// Handle body scroll locking when menu is open
			if (isMenuOpen) {
				// Get accurate scrollbar width - recalculate to handle viewport changes
				scrollBarWidth = Math.max(0, window.innerWidth - document.documentElement.clientWidth);

				// Lock body scroll with padding to prevent layout shift
				if (document.body) {
					document.body.style.overflow = "hidden";
					document.body.style.paddingRight = `${scrollBarWidth}px`;
				}

				// Get computed background style for theme-color meta tag
				const navElement = document.getElementById("nav") || document.querySelector("#nav");

				if (navElement) {
					// Use computed style for accurate color
					const computedStyle = window.getComputedStyle(navElement);
					themeColor = computedStyle.backgroundColor || computedStyle.background;
				} else {
					// Fallback using CSS variable
					themeColor = "hsl(var(--background))";
				}
			} else {
				// Restore normal scrolling
				if (document.body) {
					document.body.style.overflow = "";
					document.body.style.paddingRight = "";
				}

				// Restore original theme color
				themeColor = originalThemeColor || "";
			}
		} catch (_) {
			// Ensure body scroll is restored in case of error
			if (document.body) {
				document.body.style.overflow = "";
				document.body.style.paddingRight = "";
			}
		}
	});

	beforeNavigate(() => {
		if (isMenuOpen) {
			isMenuOpen = false;
		}
	});
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === "Escape" && isMenuOpen) {
			isMenuOpen = false;
		}
	}}
/>

<svelte:head>
	{#if themeColor}
		<meta name="theme-color" content={themeColor} />
	{/if}
</svelte:head>
<!-- Mobile Nav Menu -->
<div
	id="nav"
	class={[
		"items-between group/nav-list bg-background fixed inset-0 -z-10 m-0 grid h-[100dvh] content-between overflow-y-auto pt-32 transition duration-500 ease-out",
		"pointer-events-none translate-y-[-100%] data-[show]:pointer-events-auto data-[show]:translate-y-0"
	]}
	data-show={isMenuOpen || null}
>
	<ul class="nav-list *:border-border container mx-auto divide-y">
		{#each items as item, index}
			{@render linkOrGroup(item, index)}
		{/each}
	</ul>

	<div class="section-px section-pb container mx-auto w-full">
		<Button size="lg" variant="primary" class="z-0 w-full md:w-auto" href={cta.href}
			>{cta.label}</Button
		>
	</div>
</div>

<div class="flex items-center justify-end gap-2">
	<Button size="sm" variant="secondary" href={cta.href}>{cta.label}</Button>

	<Button
		aria-label="Toggle nav"
		size="lg"
		variant="ghost"
		hideLabel
		iconOnly
		class="z-50 max-h-full"
		onclick={() => (isMenuOpen = !isMenuOpen)}
		suffix={IconMenu}
	>
		Menu
	</Button>
</div>

{#snippet linkOrGroup(item: NavItem, index: number)}
	{#if item.children}
		<details class="group transition-all duration-300 ease-out">
			<summary
				class="section-px nav-item text-title2 text-foreground hover:bg-muted focus:bg-accent focus:text-accent-foreground focus:ring-ring flex cursor-pointer list-none items-center justify-between transition-all select-none group-open:font-medium focus:ring-2 focus:ring-offset-2 focus:outline-hidden"
				>{item.label}
				<IconChevronRight class="transition duration-300 ease-out group-open:rotate-90" /></summary
			>

			<ul
				class="my-3 grid transition-all [clip-path:inset(0,0,100%,0)] group-open:[clip-path:inset(0)]"
			>
				{#each item.children as child, childIndex}
					{@render linkOrGroup(child, childIndex)}
				{/each}
			</ul>
		</details>
	{:else}
		<a
			href={item?.href}
			class="section-px group nav-item hover:bg-muted focus:bg-accent focus:text-accent-foreground focus:ring-ring text-title2 flex flex-col transition-all duration-300 ease-out focus:ring-2 focus:ring-offset-2 focus:outline-hidden"
			aria-label={item.label}
		>
			<span
				style:transition-delay="{index * 150}ms"
				class="text-foreground transition-all duration-500 ease-out"
			>
				<span
					style:transition-delay="{index * 50}ms"
					class="inline-block transition duration-300 ease-out">{item.label}</span
				>
			</span>
		</a>
	{/if}
{/snippet}

<style lang="postcss">
	.nav-item {
		padding-top: 0.625rem;
		padding-bottom: 0.625rem;
	}

	/* Hide default details marker */
	:global(summary::marker),
	:global(summary::-webkit-details-marker) {
		display: none;
	}
</style>
