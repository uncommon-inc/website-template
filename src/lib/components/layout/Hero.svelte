<!--
    @component
    Bold hero banner with eye-catching text and strong call-to-action. NEVER use title case.

    Usage:
    ```html
    <Hero
      title="Bold Claim"
      subtitle="Quick Value"
      imageSrc="/hero.jpg"
      callsToAction={[
        {
          href: "/start",
          label: "Go"
        },
        {
          href: "/learn",
          label: "More"
        }
      ]}
    />
    ```

    Props:
    - `title`: Main headline (string)
    - `subtitle`: Supporting text (string)
    - `imageSrc`: Hero image URL (string)
    - `callsToAction`: CTA buttons array (max two: primary, secondary)
-->

<script lang="ts">
	// Components
	import AnimateText from "../animation/AnimateText.svelte";
	import Button from "$lib/components/ui/Button.svelte";

	// Constants
	import { cta } from "$lib/navigation";

	function handleImageError(e: Event) {
		const target = e.currentTarget as HTMLImageElement;
		target.src = "https://placehold.co/800x600/f8fafc/64748b?text=Hero+image";
	}

	// Types
	type Props = {
		title: string;
		subtitle: string;
		imageSrc?: string;
		callsToAction?: Array<{
			href: string;
			label: string;
		}>; // A maximum of two calls to action, with the first one being primary and the second one being secondary
	};

	let { title, subtitle, imageSrc, callsToAction = [cta] }: Props = $props();
</script>

<header
	class="section-px container mx-auto grid grid-cols-[1fr_auto] items-end gap-16 py-12 pt-24 text-balance"
	data-enter-container
>
	<h1 class="text-display w-full" data-enter>
		<span class="block"><AnimateText text={title} /></span>
		<span class="text-emphasis-dim block"><AnimateText text={subtitle} /></span>
	</h1>
	{#if callsToAction.length > 0}
		<div class="flex gap-4" data-enter>
			{#each callsToAction as cta, index}
				<Button href={cta.href} size="lg" variant={index % 2 === 0 ? "primary" : "secondary"}
					>{cta.label}</Button
				>
			{/each}
		</div>
	{/if}
</header>

{#if imageSrc}
	<div class="col-span-full aspect-video" data-enter>
		<img src={imageSrc} alt="Customer" class="size-full object-cover" onerror={handleImageError} />
	</div>
{/if}
