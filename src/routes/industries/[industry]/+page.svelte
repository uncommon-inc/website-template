<script lang="ts">
	// Types
	import type { PageProps } from "./$types";

	// Components
	import Hero from "$lib/components/layout/Hero.svelte";
	import UseCases from "$lib/components/layout/UseCases.svelte";
	import Summary from "$lib/components/layout/Summary.svelte";
	import Features from "$lib/components/layout/Features.svelte";
	import Testimonials from "$lib/components/layout/Testimonials.svelte";
	import CallToAction from "$lib/components/layout/CallToAction.svelte";
	import LogoScroller from "$lib/components/layout/LogoScroller.svelte";

	// Props
	const { data }: PageProps = $props();
</script>

<Hero
	title={data.hero.title}
	subtitle={data.hero.subtitle}
	imageSrc={data.hero.imageSrc}
	callsToAction={data.hero.callsToAction}
/>

<Summary title={data.summary.title} text={data.summary.text} />

<Testimonials testimonials={data.testimonials} />

<Features
	title={data.features.title}
	subtitle={data.features.subtitle}
	features={data.features.items}
/>

<UseCases
	title={data.useCases.title}
	subtitle={data.useCases.subtitle}
	useCases={data.useCases.items}
/>

<CallToAction
	title={data.cta.title}
	subtitle={data.cta.subtitle}
	description={data.cta.description}
	callsToAction={data.cta.callsToAction}
/>
