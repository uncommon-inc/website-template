<script module lang="ts">
	export type JobOpening = {
		title: string;
		department: string;
		location: string;
		type: string;
		url: string;
	};
</script>

<script lang="ts">
	// Types

	// Components
	import IconArrowUpRight from "~icons/lucide/arrow-up-right";

	// Utils

	// Props
	const { openings }: { openings: JobOpening[] } = $props();

	let openingsByDepartment = $derived.by(() => {
		const departments = new Set(openings.map((opening) => opening.department));
		return Array.from(departments).map((department) => ({
			department,
			openings: openings.filter((opening) => opening.department === department)
		}));
	});
</script>

<div class="grid gap-8">
	{#each openingsByDepartment as { department, openings }}
		<div class="grid w-full gap-4">
			<div
				class="text-callout flex w-full items-baseline justify-between gap-8 border-b border-gray-200 pb-2.5 !font-normal text-gray-500 dark:border-gray-800 dark:text-gray-400"
			>
				<h3>{department}</h3>
				<p class="text-gray-400 dark:text-gray-500">
					{openings.length} open roles
				</p>
			</div>

			<ul class="">
				{#each openings as opening}
					<li
						class="group rounded bg-transparent transition duration-300 ease-out hover:bg-gray-200 hover:dark:bg-gray-900"
					>
						<a
							href={opening.url}
							class="flex items-baseline gap-3 py-3 [--offset:--spacing(4)] *:transition *:duration-200 *:ease-out"
						>
							<h4 class="text-headline group-hover:translate-x-[var(--offset)]">{opening.title}</h4>
							<p class="text-caption text-emphasis-low group-hover:translate-x-[var(--offset)]">
								{opening.location} &middot; {opening.type}
							</p>

							<div
								class="ml-auto grid size-6 h-full items-center self-stretch text-current opacity-20 group-hover:-translate-x-[var(--offset)] group-hover:opacity-50"
							>
								<IconArrowUpRight class="size-full" />
							</div>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</div>
