<!--
@component Nav

Do not modify this component as it is finely crafted.
-->

<script lang="ts">
	// Types
	import type { NavItem } from "$lib/navigation";

	// Components
	import Button from "../ui/Button.svelte";
	import IconMenu from "~icons/lucide/menu";
	import IconChevronDown from "~icons/lucide/chevron-down";
	import Logo from "../Logo.svelte";

	// Constants
	import { METADATA } from "$lib/content";
	import { cta, navigation } from "$lib/navigation";

	// Utils
	import { untrack } from "svelte";
	import { beforeNavigate } from "$app/navigation";
	import { computePosition, autoUpdate, size, shift } from "@floating-ui/dom";
	import { animate } from "motion";
	import { scrollY } from "svelte/reactivity/window";

	// State
	const DURATION = 500;

	let isMenuOpen: boolean = $state(false);
	let scrollBarWidth: number = $state(0);
	let themeColor: string = $state("");
	let originalThemeColor: string | null = $state(null);
	let isDesktopNavOpen = $state(false);
	let activeDesktopNavItem: number = $state(null)!;
	let activeChildItem: number | null = $state(null); // Track hovered child item
	let itemRects: DOMRectReadOnly[] = $state([]);
	let itemElements: HTMLElement[] = $state([]);
	let tooltip: HTMLElement | null = $state(null);

	// Deep filtering of navigation items to show only items that should appear in the nav
	// and recursively filter their children as well
	const navItems = $derived(
		navigation
			.filter((item) => item.showInNav)
			.map((item) => {
				if (!item.children) return item;

				return {
					...item,
					children: item.children.filter((child) => child.showInNav !== false)
				};
			})
	);

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
						? "rgb(17, 24, 39)" // dark mode fallback (gray-900)
						: "rgb(249, 250, 251)"; // light mode fallback (gray-50)
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

		if (isDesktopNavOpen) {
			isDesktopNavOpen = false;
		}
	});

	$effect(() => {
		if (activeDesktopNavItem === null) return;

		// untrack(() => {
		const reference = itemElements[activeDesktopNavItem];
		const referenceRect = itemRects[activeDesktopNavItem];
		if (!reference || !tooltip || !referenceRect) return;

		untrack(() => {
			const cleanup = autoUpdate(reference, tooltip, () => {
				computePosition(reference, tooltip, {
					middleware: [
						shift(),
						size({
							apply({ availableWidth, elements, x, y }) {
								// Apply position

								animate(
									elements.floating,
									{
										x,
										y: y + 10, // extra spacing that looks better visually
										height: referenceRect.height,
										maxHeight: `${referenceRect.height}px`,
										maxWidth: `${Math.max(200, availableWidth)}px`
									},
									{
										duration: 0.1,
										easing: "ease-out"
									}
								);
							}
						})
					]
				});
			});

			return () => {
				cleanup();
			};
		});
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

<div
	class="sticky top-0 left-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-lg transition dark:border-gray-800 dark:bg-gray-950/95 dark:text-white"
	style:--tw-duration="{DURATION}ms"
	class:!border-transparent={scrollY.current === 0}
>
	<!-- Mobile Nav -->
	<div
		id="nav"
		class={[
			"items-between group/nav-list fixed inset-0 -z-10 m-0 grid h-[100dvh] content-between overflow-y-auto bg-white pt-32 transition duration-500 ease-out lg:hidden dark:bg-gray-900",

			// State
			"pointer-events-none  translate-y-[-100%] data-[show]:pointer-events-auto data-[show]:translate-y-0"
		]}
		data-show={isMenuOpen || null}
	>
		<!-- style:margin-right="{scrollBarWidth}px" -->
		<ul class="nav-list section-px container mx-auto grid grid-cols-2 gap-12">
			{#each navItems as item, index}
				{@render linkOrGroup(item, index)}
			{/each}
		</ul>

		<div class="p container mx-auto w-full">
			<Button size="lg" variant="primary" class="z-0 w-full md:w-auto" href={cta.href}
				>{cta.label}</Button
			>
		</div>
	</div>

	<div
		class="section-px gap- sticky top-0 left-0 z-50 container mx-auto grid grid-cols-[auto_auto] content-center items-center justify-between border-gray-100 py-2 dark:border-gray-800"
	>
		<!-- Mobile Nav -->
		<a href="/" class="flex items-center gap-3.5">
			<Logo class="z-50 size-7" />
			<span class="hidden font-medium lg:inline">{METADATA.companyName}</span>
		</a>

		<!-- Desktop nav -->
		<div
			class="grid grid-flow-col items-center gap-2 [--gap:--spacing(1)]
		[--inner-radius:calc(var(--radius)-var(--gap))]
		[--radius:var(--radius-xl)]"
			onmouseleave={() => {
				isDesktopNavOpen = false;
				activeChildItem = null;
			}}
			role="navigation"
		>
			<div class="group mr-4 hidden grid-flow-col gap-5 lg:grid">
				<!-- Transforming element -->

				<div
					class={[
						"fixed top-0 left-0 grid h-0 origin-top items-start overflow-hidden rounded-(--radius) border border-gray-100 bg-white text-gray-500 shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300",
						isDesktopNavOpen ? "" : "pointer-events-none scale-90 opacity-0 transition select-none"
					]}
					bind:this={tooltip}
					style:height={itemRects[activeDesktopNavItem]?.height || 20}
					style:width={itemRects[activeDesktopNavItem]?.height || 20}
				>
					{#if activeDesktopNavItem !== null}
						{@render dropdownContent(navigation[activeDesktopNavItem], activeDesktopNavItem)}
					{/if}
				</div>

				<!-- main buttons -->
				{#each navItems as item, index (item.label)}
					<svelte:element
						this={item.children ? "button" : "a"}
						href={item.children ? undefined : item.href}
						bind:this={itemElements[index]}
						class:cursor-default={item.children}
						class="group group/item relative flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200"
						data-item
						{...item.children && {
							onmouseover: () => {
								activeDesktopNavItem = index;
								activeChildItem = null;
								isDesktopNavOpen = true;
							},

							onfocus: () => {
								activeDesktopNavItem = index;
								activeChildItem = null;
								isDesktopNavOpen = true;
							}
						}}
					>
						<span>{item.label}</span>
						<!-- You might want an indicator here if item.children exists -->
						{#if item.children}
							<IconChevronDown
								class="size-4 text-gray-400  transition group-hover/item:opacity-100 dark:text-gray-500 {activeDesktopNavItem ===
									index && isDesktopNavOpen
									? 'opacity-100'
									: ''}"
							/>
						{/if}
					</svelte:element>
				{/each}
			</div>
			<Button size="md" variant="secondary" href={cta.href}>{cta.label}</Button>

			<Button
				aria-label="Toggle nav"
				size="lg"
				variant="ghost"
				hideLabel
				suffix={IconMenu}
				iconOnly
				class="z-50 max-h-full lg:hidden"
				onclick={() => (isMenuOpen = !isMenuOpen)}>Menu</Button
			>
		</div>
	</div>
</div>

{#snippet dropdownContent(item: NavItem, index: number)}
	<div bind:contentRect={itemRects[index]} class="grid-center">
		<div
			class="grid items-start gap-(--gap) rounded-(--radius) p-(--gap)"
			class:grid-cols-[1fr_1fr]={"image" in item ||
				item.children?.some((child) => "image" in child)}
		>
			{#if item.image || item.children?.some((child) => "image" in child)}
				{@const currentImage =
					activeChildItem !== null && item.children?.[activeChildItem]?.image
						? item.children[activeChildItem].image
						: item.image}

				<img
					class="row-span-full aspect-square h-full max-h-80 rounded-(--inner-radius) bg-gray-200 object-cover transition-opacity duration-300 dark:bg-gray-700"
					src={currentImage}
					alt=""
				/>
			{/if}

			<ul class="grid max-w-[20em] gap-(--gap)">
				{#each item.children || [] as child, childIndex}
					<li class="">
						<a
							href={child.href}
							class="group/link-item grid min-w-[10em] gap-1 rounded-(--inner-radius) p-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
							role="menuitem"
							onmouseenter={() => {
								if (child.image) {
									activeChildItem = childIndex;
								}
							}}
							onmouseleave={() => {
								activeChildItem = null;
							}}
						>
							<span class="text-body font-medium">
								{child.label}
							</span>
							{#if child.description}
								<span class="text-gray-400 dark:text-gray-500">{child.description}</span>
							{/if}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
{/snippet}

{#snippet linkOrGroup(item: NavItem, index: number)}
	<svelte:element
		this={item?.children ? "div" : "a"}
		class={[
			"group flex flex-col gap-4 transition-all duration-300 ease-out [--offset:1] group-[[data-show]]/nav-list:![--offset:0]"
		]}
		data-show={isMenuOpen}
		aria-label={item.label}
		href={item?.href}
	>
		{#if item.children}
			<span class="text-body text-emphasis-dim dark:text-gray-400">{item.label}</span>
			<ul class="grid gap-2.5">
				{#each item.children as child, index}
					{@render linkOrGroup(child, index)}
				{/each}
			</ul>
		{:else}
			<span
				style:transition-delay="{index * 150}ms"
				class="text-title2 font-medium transition-all duration-500 ease-out [clip-path:inset(0)] dark:text-white"
			>
				<span
					style:transition-delay="{index * 50}ms"
					class="inline-block translate-y-[calc(200%*var(--offset))] opacity-[calc(1-var(--offset))] transition duration-300 ease-out"
					>{item.label}</span
				>
			</span>
		{/if}
	</svelte:element>
{/snippet}
