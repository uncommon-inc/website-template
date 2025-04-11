<script lang="ts">
	import Button from "$lib/components/ui/Button.svelte";
	// Types

	// Components
	import IconChevronDown from "~icons/lucide/chevron-down";

	// Utils
	import { cta, navigation } from "$lib/navigation";

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
</script>

<ul class="flex items-center justify-end gap-5">
	<div
		class="debug absolute inset-0 bg-red-500 transition-all duration-300"
		style:width="{width}px"
		style:height="{height}px"
		style:top="{y}px"
		style:left="{x}px"
	></div>
	{#each items as item, index}
		<li>
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<svelte:element
				this={item.children ? "button" : "a"}
				class="relative flex items-center gap-1"
				aria-label={item.label}
				onmouseover={() => selectItem(index)}
				onfocus={() => selectItem(index)}
			>
				<span>
					{item.label}
				</span>

				{#if item.children}
					<IconChevronDown class="text-muted-foreground" />

					<div class="absolute top-0 left-1/2 min-w-40 -translate-x-1/2 pt-8">
						<div
							bind:this={dropdowns[index]}
							class={[
								"debug bg-white",
								"rounded-(--outer-radius) [--outer-radius:var(--radius)]",
								"p-(--gap) [--gap:--spacing(1))]",
								"[--inner-radius:calc(var(--outer-radius)-var(--gap))]"
							]}
						>
							{#each item.children as child}
								<div class="debug flex items-center gap-1 rounded-(--inner-radius) px-3 py-2">
									<span>
										{child.label}
									</span>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</svelte:element>
		</li>
	{/each}

	<Button size="sm" variant="secondary" href={cta.href} class="ml-1">{cta.label}</Button>
</ul>
