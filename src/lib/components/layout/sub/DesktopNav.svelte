<script lang="ts">
	type Props = {
		items: typeof navigation;
	};

	// Components
	import Button from "$lib/components/ui/Button.svelte";
	import { NavigationMenu } from "bits-ui";
	import DesktopNavDropdown from "./_DesktopNavDropdown.svelte";

	// Utils
	import { cta, navigation } from "$lib/navigation";

	// Props
	const { items }: Props = $props();
</script>

<div class="relative flex items-center justify-end gap-5">
	<NavigationMenu.Root class="text-foreground relative z-10 flex justify-end">
		<NavigationMenu.List class="group flex list-none items-center justify-center gap-5 p-1">
			{#each items as item}
				<NavigationMenu.Item
					class="after:bg-muted relative after:absolute after:-inset-x-2.5 after:-inset-y-1.5 after:-z-10 after:rounded-md after:opacity-0 after:transition after:duration-300 after:ease-out hover:after:opacity-100"
				>
					{#if item.children}
						<DesktopNavDropdown {item} />
					{:else}
						<NavigationMenu.Link class="link" href={item.href}>
							{item.label}
						</NavigationMenu.Link>
					{/if}
				</NavigationMenu.Item>
			{/each}
			<NavigationMenu.Indicator
				class="data-[state=hidden]:animate-fade-out data-[state=visible]:animate-fade-in top-full z-10 flex h-2.5 items-end justify-center overflow-hidden opacity-100 transition-[all,transform_200ms_ease] duration-200 data-[state=hidden]:opacity-0"
			>
				<div class="bg-border relative top-[70%] size-2.5 rotate-[45deg] rounded-tl-[2px]"></div>
			</NavigationMenu.Indicator>
		</NavigationMenu.List>
		<div class="absolute top-full right-0 justify-center perspective-[2000px]">
			<NavigationMenu.Viewport
				forceMount
				class="text-popover-foreground bg-popover data-[state=closed]:animate-scale-out data-[state=open]:animate-scale-in border-border relative mt-2.5 h-[var(--bits-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-lg border p-4 shadow-lg transition-[width,_height] duration-200 data-[state=closed]:pointer-events-none data-[state=closed]:translate-y-4 data-[state=closed]:opacity-0 sm:w-[var(--bits-navigation-menu-viewport-width)]"
			/>
		</div>
	</NavigationMenu.Root>

	<Button size="sm" variant="secondary" href={cta.href} class="ml-1">{cta.label}</Button>
</div>

<style lang="postcss">
	:global(.link) {
		display: inline-flex;
		width: 100%;
		align-items: center;
		transition-property: color, background-color;
		transition-duration: 150ms;
		pointer-events: auto;
		opacity: 1;

		&:hover {
			color: var(--color-accent-foreground);
		}

		&:focus {
			background-color: var(--color-accent);
			color: var(--color-accent-foreground);
			outline: 2px solid var(--color-ring);
			outline-offset: 2px;
		}

		&:disabled {
			pointer-events: none;
			opacity: 0.5;
		}
	}

	:global([data-navigation-menu-content]) {
		position: absolute;
		top: 0;
		right: 0;
		animation-duration: 200ms;
		animation-timing-function: var(--ease-in-out);
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
			200ms var(--ease-out);
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
