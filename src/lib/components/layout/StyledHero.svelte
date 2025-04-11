<!--
    @component
    Styled hero banner with themed background colors and eye-catching text.

    Usage:
    ```html
    <StyledHero
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

<div class="w-full bg-[var(--color-bg-secondary)]">
	<header
		class="section-px container mx-auto grid items-end gap-16 gap-y-9 py-12 pt-24 text-balance xl:grid-cols-[1fr_auto]"
		data-enter-container
	>
		<h1 class="text-display w-full" data-enter>
			<span class="block"><AnimateText text={title} /></span>
			<span class="text-emphasis-dim block"><AnimateText text={subtitle} /></span>
		</h1>

		{#if callsToAction.length > 0}
			<div class="flex gap-4" data-enter>
				{#each callsToAction as cta, index}
					<Button
						href={cta.href}
						size="lg"
						variant={index % 2 === 0 ? "primary" : "secondary"}
						class="max-lg:hidden">{cta.label}</Button
					>
					<Button
						href={cta.href}
						size="md"
						variant={index % 2 === 0 ? "primary" : "secondary"}
						class="lg:hidden">{cta.label}</Button
					>
				{/each}
			</div>
		{/if}
	</header>

	{#if imageSrc}
		<div class="col-span-full aspect-video px-4 md:px-8 lg:px-10" data-enter>
			<img src={imageSrc} alt="Hero" class="size-full object-cover" onerror={handleImageError} />
		</div>
	{/if}
</div>
