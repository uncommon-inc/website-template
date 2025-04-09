<!--
@component Nav

Navigation component with smooth dropdown animations.
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
	import { computePosition, autoUpdate, offset, flip, shift } from "@floating-ui/dom";
	import { animate } from "motion";
	import { scrollY } from "svelte/reactivity/window";

	// State
	const DURATION = 500;
	const DROPDOWN_ANIMATION_DURATION = 200;

	let isMenuOpen: boolean = $state(false);
	let scrollBarWidth: number = $state(0);
	let themeColor: string = $state("");
	let originalThemeColor: string | null = $state(null);
	let isDesktopNavOpen = $state(false);
	let activeDesktopNavItem: number = $state(null)!;
	let activeChildItem: number | null = $state(null); 
	let lastActiveChildItem: number | null = $state(null); 
	let itemElements: HTMLElement[] = $state([]);
	let dropdownElement: HTMLElement | null = $state(null);
	let cleanupFn: (() => void) | null = $state(null);

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

	// Function to position dropdown
	function positionDropdown(index: number) {
		if (!itemElements[index] || !dropdownElement) return;
		
		// Clean up previous positioning
		if (cleanupFn) {
			cleanupFn();
			cleanupFn = null;
		}
		
		const reference = itemElements[index];
		
		// Make dropdown visible but transparent initially
		dropdownElement.style.display = 'grid';
		dropdownElement.style.opacity = '0';
		
		// Setup positioning and animation
		cleanupFn = autoUpdate(reference, dropdownElement, () => {
			computePosition(reference, dropdownElement, {
				placement: 'bottom-start',
				middleware: [
					offset(4),
					flip(),
					shift({ padding: 8 })
				]
			}).then(({ x, y }) => {
				// Position the dropdown
				dropdownElement.style.left = `${x}px`;
				dropdownElement.style.top = `${y}px`;
				
				// Animate it in
				animate(
					dropdownElement, 
					{ 
						opacity: [0, 1],
						transform: ['translateY(-10px)', 'translateY(0)']
					}, 
					{ 
						duration: DROPDOWN_ANIMATION_DURATION,
						easing: 'ease-out'
					}
				);
			});
		});
	}

	// Handle hover state changes for main nav items
	function handleNavItemHover(index: number) {
		// Skip items without children
		if (!navItems[index]?.children?.length) return;
		
		// Only reset lastActiveChildItem when switching to a different nav item
		if (activeDesktopNavItem !== index) {
			lastActiveChildItem = null;
		}
		
		// Update active item
		activeDesktopNavItem = index;
		activeChildItem = null;
		
		// Show dropdown
		isDesktopNavOpen = true;
		
		// Position dropdown
		positionDropdown(index);
	}

	// Handle nav container mouse leave
	function handleNavContainerLeave() {
		// Hide dropdown with animation
		if (dropdownElement && isDesktopNavOpen) {
			animate(
				dropdownElement, 
				{ 
					opacity: [1, 0],
					transform: ['translateY(0)', 'translateY(-10px)']
				}, 
				{ 
					duration: DROPDOWN_ANIMATION_DURATION / 2,
					easing: 'ease-in'
				}
			).finished.then(() => {
				if (!isDesktopNavOpen) { // Check again in case user hovered back
					dropdownElement.style.display = 'none';
				}
			});
		}
		
		// Reset states
		isDesktopNavOpen = false;
		activeDesktopNavItem = null;
		activeChildItem = null;
		
		// Clean up positioning
		if (cleanupFn) {
			cleanupFn();
			cleanupFn = null;
		}
	}
	
	// Handle child item hover
	function handleChildItemHover(childIndex: number, hasImage: boolean) {
		if (hasImage) {
			activeChildItem = childIndex;
			lastActiveChildItem = childIndex;
		}
	}
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
			"pointer-events-none translate-y-[-100%] data-[show]:pointer-events-auto data-[show]:translate-y-0"
		]}
		data-show={isMenuOpen || null}
	>
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
			onmouseleave={handleNavContainerLeave}
			role="navigation"
		>
			<div class="group mr-4 hidden grid-flow-col gap-5 lg:grid">
				<!-- Dropdown container -->
				<div
					bind:this={dropdownElement}
					class="fixed z-50 grid items-start rounded-(--radius) border border-gray-100 bg-white text-gray-500 shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
					style="display: none;"
				>
					{#if activeDesktopNavItem !== null && isDesktopNavOpen}
						{@render dropdownContent(navItems[activeDesktopNavItem], activeDesktopNavItem)}
					{/if}
				</div>

				<!-- Main nav items -->
				{#each navItems as item, index (item.label)}
					<svelte:element
						this={item.children ? "button" : "a"}
						href={item.children ? undefined : item.href}
						bind:this={itemElements[index]}
						class:cursor-default={item.children}
						class="group group/item relative flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200"
						data-item
						{...item.children && {
							onmouseover: () => handleNavItemHover(index),
							onfocus: () => handleNavItemHover(index)
						}}
					>
						<span>{item.label}</span>
						{#if item.children}
							<IconChevronDown
								class="size-4 text-gray-400 transition group-hover/item:opacity-100 dark:text-gray-500 {activeDesktopNavItem ===
									index && isDesktopNavOpen
									? 'opacity-100'
									: 'opacity-70'}"
							/>
						{/if}
					</svelte:element>
				{/each}
			</div>
			<Button size="sm" variant="secondary" href={cta.href}>{cta.label}</Button>

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
	<div class="grid-center p-(--gap)">
		<div
			class="grid items-start gap-(--gap) rounded-(--radius)"
			class:grid-cols-[1fr_1fr]={
				"image" in item || item.children?.some((child) => "image" in child)
			}
		>
			{#if item.image || item.children?.some((child) => "image" in child)}
				{@const currentImage =
					activeChildItem !== null && item.children?.[activeChildItem]?.image
						? item.children[activeChildItem].image
						: lastActiveChildItem !== null && item.children?.[lastActiveChildItem]?.image
							? item.children[lastActiveChildItem].image
							: item.children?.find((child) => child.image)?.image || item.image}

				<img
					class="row-span-full aspect-square h-full max-h-80 rounded-(--inner-radius) bg-gray-200 object-cover transition-opacity duration-300 dark:bg-gray-700"
					src={currentImage}
					alt=""
				/>
			{/if}

			<ul class="grid max-w-[20em] gap-(--gap)">
				{#each item.children || [] as child, childIndex}
					<li>
						<a
							href={child.href}
							class="group/link-item grid min-w-[10em] gap-1 rounded-(--inner-radius) p-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
							role="menuitem"
							onmouseenter={() => handleChildItemHover(childIndex, !!child.image)}
							onmouseleave={() => (activeChildItem = null)}
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