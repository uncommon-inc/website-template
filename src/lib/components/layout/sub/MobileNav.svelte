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
		originalThemeColor = metaThemeColor?.getAttribute("content");
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
					// Fallback with theme-aware default
					themeColor = document.documentElement.classList.contains("dark")
						? "hsl(var(--background))" // dark mode fallback using CSS variable
						: "hsl(var(--background))"; // light mode fallback using CSS variable
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
		"items-between group/nav-list bg-background fixed inset-0 -z-10 m-0 grid h-[100dvh] content-between overflow-y-auto pt-32 transition duration-500 ease-out lg:hidden",
		"pointer-events-none translate-y-[-100%] data-[show]:pointer-events-auto data-[show]:translate-y-0"
	]}
	data-show={isMenuOpen || null}
>
	<ul class="nav-list container mx-auto divide-y *:border-gray-200">
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
		suffix={IconMenu}
		iconOnly
		class="z-50 max-h-full"
		onclick={() => (isMenuOpen = !isMenuOpen)}>Menu</Button
	>
</div>

{#snippet linkOrGroup(item: NavItem, index: number)}
	{#if item.children}
		<details class="group transition-all duration-300 ease-out">
			<summary
				class="section-px nav-item text-title2 text-foreground hover:bg-muted flex cursor-pointer list-none items-center justify-between transition-all select-none group-open:font-medium"
				>{item.label}
				<IconChevronRight class="transition duration-300 ease-out group-open:rotate-90" /></summary
			>

			<ul class="my-3 grid">
				{#each item.children as child, childIndex}
					{@render linkOrGroup(child, childIndex)}
				{/each}
			</ul>
		</details>
	{:else}
		<a
			href={item?.href}
			class="section-px group nav-item hover:bg-muted text-title2 flex flex-col transition-all duration-300 ease-out"
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
	@reference '../../../../app.css';
	.nav-item {
		@apply py-2.5;
	}
</style>
