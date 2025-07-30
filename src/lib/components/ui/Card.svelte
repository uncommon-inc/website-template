<script lang="ts">
	import type { Component } from "svelte";

	interface Props {
		title?: string;
		description?: string;
		icon?: Component;
		iconClass?: string;
		imageSrc?: string;
		imageAspect?: "16/9" | "9/16";
		class?: string;
	}

	let {
		title = "",
		description = "",
		icon,
		iconClass = "size-5 text-primary",
		imageSrc,
		imageAspect = "16/9",
		class: customClass = ""
	}: Props = $props();
</script>

<article
	class="bg-card text-card-foreground hover:bg-card-hover border-border flex flex-col rounded-lg border p-4 px-5 text-pretty transition duration-300 ease-out lg:p-5 lg:px-6 {customClass}"
>
	{#if icon || imageSrc}
		<div class="mb-8">
			{#if icon && imageSrc}
				{@const Icon = icon}
				<div class="relative">
					<img
						src={imageSrc}
						alt={title}
						class="w-full rounded-lg object-cover {imageAspect === '9/16'
							? 'aspect-[9/16]'
							: 'aspect-[16/9]'}"
					/>
					<div
						class="bg-background/90 border-border absolute top-3 left-3 rounded-sm border p-1.5 backdrop-blur-sm"
					>
						<Icon
							class="size-4 {iconClass.includes('text-')
								? iconClass.split(' ').find((c) => c.startsWith('text-'))
								: 'text-primary'}"
						/>
					</div>
				</div>
			{:else if icon}
				{@const Icon = icon}
				<Icon class={iconClass} />
			{:else if imageSrc}
				<img
					src={imageSrc}
					alt={title}
					class="w-full rounded-lg object-cover {imageAspect === '9/16'
						? 'aspect-[9/16]'
						: 'aspect-[16/9]'}"
				/>
			{/if}
		</div>
	{/if}

	<div class:mt-auto={icon || imageSrc}>
		<h3 class="text-title3 text-card-foreground mb-2">
			{title}
		</h3>
		<p class="text-body text-muted-foreground max-w-prose">{description}</p>
	</div>
</article>
