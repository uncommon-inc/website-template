<script>
	let { title = "", description = "", class: customClass = "" } = $props();
</script>

<article
	class="bg-card hover:bg-sidebar-primary-foreground hover:text-primary-900 border-border grid content-between gap-16 rounded-(--radius) border p-4 px-5 text-pretty transition duration-300 ease-out lg:p-5 lg:px-6 {customClass}"
>
	<h3 class="text-title3 mb-2">
		{title}
	</h3>
	<p class="text-body max-w-prose opacity-60">{description}</p>
</article>
