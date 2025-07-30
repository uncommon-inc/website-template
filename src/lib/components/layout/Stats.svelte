<script lang="ts">
	// Types
	import Clock from "~icons/lucide/clock";
	import Laptop from "~icons/lucide/laptop";
	import Building from "~icons/lucide/building";

	type StatItem = {
		value: string;
		description: string;
		icon: typeof Clock;
	};

	// Props
	const {
		stats = [
			{
				value: "3 mins",
				description: "to set up your network",
				icon: Clock
			},
			{
				value: "2.5m",
				description: "devices connected",
				icon: Laptop
			},
			{
				value: "10K+",
				description: "companies running Tailscale",
				icon: Building
			}
		],
		class: classes = ""
	}: { stats?: StatItem[]; class?: string } = $props();
</script>

<section class="w-full py-16 md:py-24 {classes}">
	<div class="container mx-auto px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
			{#each stats as stat}
				<div class="flex flex-col items-center text-center md:items-center">
					<stat.icon class="text-primary mb-4 h-8 w-8 opacity-80" />
					<span class="text-title1 text-foreground mb-2">{stat.value}</span>
					<span class="text-body text-muted-foreground">{stat.description}</span>
				</div>
			{/each}
		</div>
	</div>
</section>
