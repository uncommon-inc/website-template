<script lang="ts">
	// Types

	// Components
	import Button from "$lib/components/ui/Button.svelte";
	import IconChevronDown from "~icons/lucide/chevron-down";

	// Utils
	import { cta, navigation } from "$lib/navigation";
	import { NavigationMenu } from "bits-ui";

	// Props
	const { items }: { items: typeof navigation } = $props();

	let activeItem = $state(-1);
	let dropdowns: HTMLElement[] = $state([]);
	let rects: DOMRect[] = $state([]);

	function selectItem(index: number) {
		activeItem = index;
	}

	let { width, height, x, y } = $derived.by(() => {
		if (activeItem !== -1 && dropdowns[activeItem]) {
			return dropdowns[activeItem].getBoundingClientRect();
		} else {
			return { width: 0, height: 0, x: 0, y: 0 };
		}
	});

	$inspect(rects[activeItem]);
	const components: { title: string; href: string; description: string }[] = [
		{
			title: "Alert Dialog",
			href: "/docs/components/alert-dialog",
			description:
				"A modal dialog that interrupts the user with important content and expects a response."
		},
		{
			title: "Link Preview",
			href: "/docs/components/link-preview",
			description: "For sighted users to preview content available behind a link."
		},
		{
			title: "Progress",
			href: "/docs/components/progress",
			description:
				"Displays an indicator showing the completion progress of a task, typically displayed as a progress bar."
		},
		{
			title: "Scroll Area",
			href: "/docs/components/scroll-area",
			description: "Visually or semantically separates content."
		},
		{
			title: "Tabs",
			href: "/docs/components/tabs",
			description:
				"A set of layered sections of content—known as tab panels—that are displayed one at a time."
		},
		{
			title: "Tooltip",
			href: "/docs/components/tooltip",
			description:
				"A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it."
		}
	];

	type ListItemProps = {
		className?: string;
		title: string;
		href: string;
		content: string;
	};

	function handleValueChange(value: string) {
		console.log("Selected value:", value);
	}
</script>

<div
	class={[
		"relative flex items-center justify-end gap-5",
		"rounded-(--outer-radius) [--outer-radius:var(--radius)]",
		"[--gap:--spacing(1))]",
		"[--inner-radius:calc(var(--outer-radius)-var(--gap))]"
	]}
>
	<NavigationMenu.Root
		class="text-foreground relative z-10 flex justify-end"
		onValueChange={handleValueChange}
	>
		<NavigationMenu.List class="group flex list-none items-center justify-center gap-5 p-1">
			{#each items as item}
				<NavigationMenu.Item
					class="after:bg-muted relative after:absolute after:-inset-x-2.5 after:-inset-y-1.5 after:-z-10 after:rounded-(--radius) after:opacity-0 after:transition after:duration-300 after:ease-out hover:after:opacity-100"
				>
					{#if item.children}
						<NavigationMenu.Trigger class="group/item inline-flex h-full items-center gap-1">
							{item.label}
							<IconChevronDown
								class="relative top-[1px] size-3 opacity-80 transition duration-200 ease-out group-hover/item:opacity-100 group-data-[state=open]:rotate-180 "
								aria-hidden="true"
							/>
						</NavigationMenu.Trigger>
						<NavigationMenu.Content
							class="data-[motion=from-end]:animate-enter-from-right data-[motion=from-start]:animate-enter-from-left data-[motion=to-end]:animate-exit-to-right data-[motion=to-start]:animate-exit-to-left absolute top-0 left-0 w-full data-[state=closed]:hidden sm:w-auto"
							forceMount
						>
							<div class="grid w-full max-w-full min-w-80 gap-(--gap) p-(--gap)">
								<!-- class:grid-cols-2={item.children.some((child) => child.image)} -->
								<!-- {#if item.children.some((child) => child.image)}
									<img
										src={item.children[0].image}
										alt=""
										class="aspect-square size-full max-w-full object-cover"
									/>
								{/if} -->
								<ul class="grid w-full max-w-full list-none content-start items-start sm:min-w-fit">
									{#each item.children as child}
										<li class="w-full">
											<NavigationMenu.Link
												href={child.href}
												class="link hover:bg-muted rounded-(--inner-radius) px-3.5 py-3 leading-none no-underline outline-hidden transition-colors select-none"
											>
												{child.label}
											</NavigationMenu.Link>
										</li>
									{/each}
								</ul>
							</div>
						</NavigationMenu.Content>
					{:else}
						<NavigationMenu.Link class="link" href={item.href}>
							{item.label}
						</NavigationMenu.Link>
					{/if}
				</NavigationMenu.Item>
			{/each}
			<NavigationMenu.Indicator
				class="data-[state=hidden]:animate-fade-out data-[state=visible]:animate-fade-in top-full z-10 flex h-2.5 items-end justify-center overflow-hidden opacity-100 transition-[all,transform_250ms_ease] duration-200 data-[state=hidden]:opacity-0"
			>
				<div class="bg-border relative top-[70%] size-2.5 rotate-[45deg] rounded-tl-[2px]"></div>
			</NavigationMenu.Indicator>
		</NavigationMenu.List>
		<div class="absolute top-full left-0 flex w-full justify-center perspective-[2000px]">
			<NavigationMenu.Viewport
				forceMount
				class="text-popover-foreground bg-background data-[state=closed]:animate-scale-out data-[state=open]:animate-scale-in border-border  relative mt-2.5 h-[var(--bits-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-(--outer-radius) border p-(--gap) shadow-lg transition-[width,_height] duration-200 data-[state=closed]:pointer-events-none data-[state=closed]:translate-y-4 data-[state=closed]:opacity-0 sm:w-[var(--bits-navigation-menu-viewport-width)]"
			/>
		</div>
	</NavigationMenu.Root>

	<Button size="sm" variant="secondary" href={cta.href} class="ml-1">{cta.label}</Button>
</div>

<style lang="postcss">
	@reference '../../../../app.css';

	:global(.link) {
		@apply hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground inline-flex w-full items-center transition-colors focus:outline-hidden disabled:pointer-events-none disabled:opacity-50;
	}

	/* app.css */
	/* :global([data-navigation-menu-trigger]),
	:global([data-navigation-menu-link]) {
		@apply before:absolute before:-inset-x-2.5 before:-inset-y-1.5 before:-z-50 before:rounded before:transition before:duration-200 hover:before:bg-gray-100;
	} */
	:global([data-navigation-menu-content]) {
		position: absolute;
		top: 0;
		left: 0;
		animation-duration: 250ms;
		animation-timing-function: ease;
	}
	:global([data-motion="from-start"]) {
		animation-name: enter-from-left;
	}
	:global([data-motion="from-end"]) {
		animation-name: enter-from-right;
	}
	:global([data-motion="to-start"]) {
		animation-name: exit-to-left;
	}
	:global([data-motion="to-end"]) {
		animation-name: exit-to-right;
	}

	:global([data-navigation-menu-viewport]) {
		position: relative;
		width: var(--bits-navigation-menu-viewport-width);
		height: var(--bits-navigation-menu-viewport-height);
		transition:
			width,
			height,
			250ms var(--ease-out);
	}

	@keyframes enter-from-right {
		from {
			opacity: 0;
			transform: translateX(200px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes enter-from-left {
		from {
			opacity: 0;
			transform: translateX(-200px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes exit-to-right {
		from {
			opacity: 1;
			transform: translateX(0);
		}
		to {
			opacity: 0;
			transform: translateX(200px);
		}
	}

	@keyframes exit-to-left {
		from {
			opacity: 1;
			transform: translateX(0);
		}
		to {
			opacity: 0;
			transform: translateX(-200px);
		}
	}

	@keyframes animate-fade-out {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}
</style>
