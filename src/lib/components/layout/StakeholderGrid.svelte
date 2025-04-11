<script lang="ts">
	import SectionHeader from "$lib/components/layout/SectionHeader.svelte";
	import Button from "$lib/components/ui/Button.svelte";
	import { animate, stagger } from "motion";
	import { onMount } from "svelte";

	// Types
	type TeamMember = {
		name: string;
		position?: string;
		bio?: string;
		image: string;
	};

	// Props
	const {
		title,
		stakeholderType = "team",
		subtitle,
		stakeholders
	}: {
		stakeholders: TeamMember[];
		title: string;
		subtitle: string;
		stakeholderType?: "team" | "investor";
	} = $props();

	let cards: HTMLElement[] = $state([]);

	onMount(() => {
		animate(
			cards,
			{
				y: ["1.5rem", 0],
				filter: ["blur(2px)", "blur(0px)"],
				opacity: [0, 1]
			},
			{
				duration: 0.3,
				ease: "easeOut",
				delay: stagger(0.1, {
					ease: "easeInOut"
				})
			}
		);
	});
</script>

<section class="">
	<div class="section-py section-px container mx-auto grid [--gap:--spacing(4)]">
		<SectionHeader {title} {subtitle} />

		<div
			class="grid grid-cols-1 gap-(--gap) {stakeholders.length === 1
				? 'md:grid-cols-3'
				: 'md:grid-cols-2 lg:grid-cols-4'}"
		>
			{#snippet card(
				{
					name,
					position,
					image,
					type = "team"
				}: {
					name: string;
					position?: string;
					image: string;
					type?: "team" | "join";
				},
				index: number
			)}
				<div
					bind:this={cards[index]}
					class={[
						"card bg-gray-50 opacity-0 dark:bg-gray-900",
						"bg-cover",
						"relative isolate grid aspect-[4/5] content-end items-end gap-10 overflow-hidden rounded-(--radius) bg-cover p-(--gap) [--inner-radius:calc(var(--radius)-var(--gap))] ",
						type === "join" ? "bg-primary" : ""
					]}
					style={type === "join"
						? ""
						: `background-image: url('${image}'); background-position: center; background-size: cover;`}
				>
					{#if type === "team" && stakeholderType === "team"}
						<div
							class="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-black/0 via-black/0 to-black/30"
						>
							<div class="linear-blur-down absolute right-0 bottom-0 left-0 h-[25%]"></div>
						</div>
					{/if}

					<div
						class="text-caption z-10 {stakeholderType !== 'team'
							? 'text-gray-700 dark:text-gray-50'
							: 'text-white'}"
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
			{/snippet}

			{#each stakeholders as member, index}
				{@render card(member, index)}
			{/each}

			{#if stakeholderType === "team"}
				{@render card(
					{
						name: "You?",
						position: "Join us",
						type: "join"
					},
					stakeholders.length
				)}
			{/if}
		</div>
	</div>
</section>
