<script lang="ts">
	import Card from "../ui/Card.svelte";

	// Types
	type Feature = {
		title: string;
		description: string;
		link?: {
			href: string;
			label: string;
		};
	};

	// Components
	import SectionHeader from "./SectionHeader.svelte";

	// Props
	const {
		title,
		subtitle,
		features = []
	}: { title: string; subtitle: string; features: Feature[] } = $props();

	let featureCountClass = $derived(
		features.length <= 6 ? `feature-count-${features.length}` : "feature-count-many"
	);
</script>

<section class="[--gap:--spacing(2)]">
	<div class="section-px section-py container mx-auto grid">
		<SectionHeader {title} {subtitle} />

		<div class="bento-grid {featureCountClass}">
			{#each features as feature}
				<Card {...feature} />
			{/each}
		</div>
	</div>
</section>

<!--
@component
A feature grid section that displays a list of features with titles and descriptions.
Never use title case, always sentence case.

Make the feature descriptions one short sentence that clearly articulates the feature.

Usage:
```html
<FeatureSection
  title="Section Title"
  subtitle="Section Subtitle"
  features={[
    {
      title: "Feature Title",
      description: "Feature description text",
      link: { href: "/optional-link", label: "Learn more" } // optional
    }
    // more features...
  ]}
/>
```
-->

<style>
	/* Base styles for the bento grid */
	.bento-grid {
		display: grid;
		gap: var(--gap);
		border-radius: var(--radius);
	}

	/* Mobile layout - stack all cards */
	.bento-grid :global(article) {
		grid-area: auto;
	}

	/* Media query for medium screens and up */
	@media (min-width: 768px) {
		/* 1 Feature */
		.feature-count-1 {
			grid-template-columns: 1fr;
		}
		.feature-count-1 :global(article:nth-child(1)) {
			grid-column: 1 / -1;
		}

		/* 2 Features */
		.feature-count-2 {
			grid-template-columns: 1fr 1fr;
		}

		/* 3 Features */
		.feature-count-3 {
			grid-template-columns: 1fr 1fr;
			grid-template-rows: auto auto;
			grid-template-areas:
				"a b"
				"a c";
		}
		.feature-count-3 :global(article:nth-child(1)) {
			grid-area: a;
		}
		.feature-count-3 :global(article:nth-child(2)) {
			grid-area: b;
		}
		.feature-count-3 :global(article:nth-child(3)) {
			grid-area: c;
		}

		/* 4 Features */
		.feature-count-4 {
			grid-template-columns: 2fr 1fr 1fr;
			grid-template-rows: auto auto;
			grid-template-areas:
				"a c d"
				"b c d";
		}
		.feature-count-4 :global(article:nth-child(1)) {
			grid-area: a;
		}
		.feature-count-4 :global(article:nth-child(2)) {
			grid-area: b;
		}
		.feature-count-4 :global(article:nth-child(3)) {
			grid-area: c;
		}
		.feature-count-4 :global(article:nth-child(4)) {
			grid-area: d;
		}

		/* 5 Features */
		.feature-count-5 {
			grid-template-columns: 1fr 1fr 1fr;
			grid-template-rows: auto auto auto;
			grid-template-areas:
				"a b c"
				"d e c";
		}
		.feature-count-5 :global(article:nth-child(1)) {
			grid-area: a;
		}
		.feature-count-5 :global(article:nth-child(2)) {
			grid-area: b;
		}
		.feature-count-5 :global(article:nth-child(3)) {
			grid-area: c;
		}
		.feature-count-5 :global(article:nth-child(4)) {
			grid-area: d;
		}
		.feature-count-5 :global(article:nth-child(5)) {
			grid-area: e;
		}

		/* 6 Features */
		.feature-count-6 {
			grid-template-columns: 1fr 1fr 1fr;
		}

		/* More than 6 features */
		.feature-count-many {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}

	/* For larger screens, refine the grid */
	@media (min-width: 1024px) {
		.feature-count-many {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
