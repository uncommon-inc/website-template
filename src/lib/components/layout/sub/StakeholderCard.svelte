<script lang="ts">
	import Button from "$lib/components/ui/Button.svelte";

	const {
		name = "",
		position = "",
		imageSrc = "",
		type = "team",
		stakeholderType = "team",
		index = 0,
		cards = $bindable([])
	}: {
		name?: string;
		position?: string;
		imageSrc?: string;
		type?: "team" | "join";
		stakeholderType?: "team" | "investor";
		index?: number;
		cards?: HTMLElement[];
	} = $props();
</script>

<div
	bind:this={cards[index]}
	class={[
		"card bg-gray-50 dark:bg-gray-900",
		"h-full",
		"relative isolate grid aspect-[4/5] content-end items-end gap-10 overflow-hidden rounded-(--radius) p-(--gap) [--inner-radius:calc(var(--radius)-var(--gap))] ",
		type === "join" ? "bg-primary" : ""
	]}
>
	{#if type !== "join" && imageSrc}
		<img
			src={imageSrc}
			alt={name}
			loading="lazy"
			class="absolute inset-0 z-0 h-full w-full object-cover"
		/>
	{/if}

	{#if type === "team" && stakeholderType === "team"}
		<div
			class="absolute top-0 right-0 bottom-0 left-0 z-1 bg-gradient-to-b from-black/0 via-black/0 to-black/30"
		>
			<div class="linear-blur-down absolute right-0 bottom-0 left-0 h-[25%]"></div>
		</div>
	{/if}

	<div
		class={[
			"text-caption z-10",
			stakeholderType !== "team" ? "text-gray-700 dark:text-gray-50" : "text-white"
		]}
	>
		<div class={type === "join" ? "grid grid-cols-2 items-center" : ""}>
			<div>
				<div>{name}</div>
				<div class="opacity-70">{position}</div>
			</div>
			{#if type === "join"}
				<div class="justify-self-end">
					<Button href="/careers" variant="secondary" size="sm">Join us</Button>
				</div>
			{/if}
		</div>
	</div>
</div>
