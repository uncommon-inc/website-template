<script lang="ts">
	// Utils
	import { inView } from "motion";
	import { onMount } from "svelte";

	// Props
	let {
		text = "",
		oncomplete = () => {},
		show = $bindable(false),
		block = $bindable(false)
	}: { text: string; show?: boolean; oncomplete?: () => void } = $props();

	// State
	let words = $derived(text.split(" "));
	let element: HTMLElement | null = null;

	function handleWordIntroEnd(index: number) {
		if (index + 1 === words.length) {
			setTimeout(() => {
				oncomplete();
			}, 500);
		}
	}

	onMount(() => {
		if (element) {
			inView(element, (element, entry) => {
				if (entry.isIntersecting) {
					show = true;
				}
			});
		}
	});
</script>

<span class:show bind:this={element}>
	{#each (text || "").split(" ") as word, i}
		<span
			class="animated-word inline-block origin-left"
			style:--delay="{i * 100}ms"
			onanimationstart={() => handleWordIntroEnd(i)}
		>
			{word}
		</span>{" "}
	{/each}
</span>

<style lang="postcss">
	.animated-word {
		opacity: 0;
	}

	.show .animated-word {
		animation: appearAnimation 1000ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
		animation-delay: var(--delay);
		opacity: 0;
		transform: translateY(12px) scale(1);
		filter: blur(4px);
	}

	@keyframes appearAnimation {
		from {
			opacity: 0;
			transform: translateY(12px) scale(1);
			filter: blur(4px);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
			filter: blur(0);
		}
	}
</style>
