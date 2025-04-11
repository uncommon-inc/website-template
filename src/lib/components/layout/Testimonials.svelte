<script lang="ts">
	// Types
	type Testimonial = {
		name: string;
		position: string;
		company: string;
		quote: string;
		image: string; // a 9/16 portrait image of a person
	};

	// Props
	let { testimonials }: { testimonials: Testimonial[] } = $props();

	// State
	let current = $state(0);
	let scrollProgress = $state(0);
	let wrapperRef: HTMLElement;
	let carouselRef: HTMLElement;
	let maxScrollDistance = $state(0);

	import { onMount } from "svelte";

	onMount(() => {
		// Preload images
		testimonials.forEach((testimonial) => {
			if (testimonial.image) {
				const img = new Image();
				img.loading = "lazy";
				img.src = testimonial.image;
			}
		});

		// Calculate the max scroll distance for translation
		const updateDimensions = () => {
			if (!carouselRef) return;

			// Get all cards and container measurements
			const cards = Array.from(carouselRef.querySelectorAll("article"));
			if (!cards.length) return;

			// Get the total width of all content including gaps
			const carouselWidth = carouselRef.scrollWidth;
			// Get the viewport width
			const viewportWidth = window.innerWidth;
			// Get the width of the last card
			const lastCard = cards[cards.length - 1];
			const lastCardWidth = lastCard.offsetWidth;

			// Get computed styles to account for gaps and padding
			const style = getComputedStyle(carouselRef);
			const gapStr = style.gap || style.columnGap || "0px";
			const gapValue = parseInt(gapStr, 10) || 0;

			// To ensure the last card is fully visible at the end of the scroll,
			// we need to make sure the last card's right edge aligns with the viewport's right edge
			// This means the maximum distance we need to translate is:
			// (total carousel width - viewport width)
			// If this value is negative or zero, no scrolling is needed
			maxScrollDistance = Math.max(0, carouselWidth - viewportWidth);

			// Ensure we can see the last card fully
			// This extra adjustment ensures the last card is properly positioned at the end of the scroll
			if (maxScrollDistance > 0) {
				// Add a larger buffer for more breathing room at the right edge
				// This accounts for any padding or margin that might affect positioning
				const buffer = 0; // 4rem buffer instead of 1rem
				maxScrollDistance += buffer;
			}

			if (maxScrollDistance <= 0) {
				console.info("Content fits in viewport, no scrolling needed");
			}
		};

		// Track vertical scroll position and convert to horizontal scroll
		let ticking = false;
		const handleScroll = () => {
			if (ticking) return;
			ticking = true;

			requestAnimationFrame(() => {
				if (!wrapperRef) return;

				const rect = wrapperRef.getBoundingClientRect();
				const sectionHeight = rect.height;
				const viewportHeight = window.innerHeight;

				// Calculate progress (0-1)
				let progress = 0;
				if (rect.top <= 0) {
					progress = Math.min(Math.abs(rect.top) / (sectionHeight - viewportHeight), 1);
				}

				scrollProgress = progress;
				current = Math.min(Math.floor(progress * testimonials.length), testimonials.length - 1);
				ticking = false;
			});
		};

		// Debounce resize handler for better performance
		let resizeTimer: number;
		const handleResize = () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				updateDimensions();
				handleScroll();
			}, 100);
		};

		// Initialize and set up listeners
		updateDimensions();
		window.addEventListener("resize", handleResize);
		window.addEventListener("scroll", handleScroll);
		setTimeout(() => {
			updateDimensions(); // Run once more after DOM is settled
			handleScroll();
		}, 100);

		return () => {
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("scroll", handleScroll);
			clearTimeout(resizeTimer);
		};
	});
</script>

<section
	bind:this={wrapperRef}
	class="text-pretty [--gap:--spacing(4)]"
	style="height: calc(100vh * {testimonials.length});"
>
	<div
		class="section-py section-px sticky top-0 flex min-h-screen w-full items-center overflow-hidden"
	>
		<div
			bind:this={carouselRef}
			class={[
				"flex w-full gap-(--card-gap) pr-8 [--card-gap:--spacing(6)]",
				"[--inner-radius:calc(var(--outer-radius)-var(--gap))] [--outer-radius:var(--radius)] lg:[--outer-radius:var(--radius-xl)]"
			]}
		>
			{#each testimonials as testimonial}
				<article
					class={[
						"lg:container-xs lg:max-h-[60ch] lg:min-w-[50%] lg:grid-cols-[2fr_3fr]",
						"items-between grid grid-cols-1 gap-8",
						"bg-card dark:text-white",
						"aspect-video max-w-full min-w-full",
						"transform-gpu transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
						"rounded-(--outer-radius) p-(--gap)",
						"border-border border contain-layout"
					]}
					style:transform="translateX(calc(-{scrollProgress} * {maxScrollDistance}px))"
				>
					<div class="hidden overflow-clip rounded-[max(var(--inner-radius),2px)] lg:block">
						{#if testimonial.image}
							<img
								src={testimonial.image}
								alt="{testimonial.name} testimonial"
								loading="lazy"
								class="aspect-[3/4] h-full w-full object-cover"
							/>
						{/if}
					</div>
					<div class="flex flex-col justify-between gap-12">
						<q class="text-title2 max-w-prose dark:text-white">{testimonial.quote}</q>
						<cite class="text-caption flex items-center gap-3 not-italic">
							{#if testimonial.image}
								<img
									src={testimonial.image}
									alt="{testimonial.name} testimonial"
									loading="lazy"
									class="size-12 rounded-full object-cover lg:hidden"
								/>
							{/if}
							<div>
								<p class="text-callout">{testimonial.name}</p>
								<p class="text-muted-foreground">
									{testimonial.position}, {testimonial.company}
								</p>
							</div>
						</cite>
					</div>
				</article>
			{/each}
			<!-- Empty spacer to ensure last card has breathing room -->
			<div class="min-w-(--gap) lg:min-w-[calc(var(--gap)*3)]"></div>
		</div>

		<!-- Pagination Indicators -->
		<div class="absolute bottom-8 left-1/2 flex -translate-x-1/2 justify-center gap-2">
			{#each testimonials as _, index}
				<div
					class="focus:ring-primary-500 bg-emphasis-dim size-1.5 rounded-full transition-all duration-300 ease-in-out dark:bg-gray-700"
					class:opacity-50={current !== index}
					class:w-8={current === index}
					class:dark:bg-gray-400={current === index}
					aria-hidden="true"
				></div>
			{/each}
		</div>
	</div>
</section>

<style>
	/* Hide scrollbar while preserving functionality */
	.hide-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.hide-scrollbar::-webkit-scrollbar {
		display: none;
	}
</style>
