<script>
	import Button from "$lib/components/ui/Button.svelte";
	import Card from "$lib/components/ui/Card.svelte";
	import Features from "$lib/components/layout/Features.svelte";

	// Icons
	import IconZap from "~icons/lucide/zap";
	import IconShield from "~icons/lucide/shield";
	import IconUsers from "~icons/lucide/users";
	import IconSettings from "~icons/lucide/settings";
	import IconPalette from "~icons/lucide/palette";

	// Theme controls
	let themeRadius = $state(8); // 0.5rem = 8px
	let primaryHue = $state(155); // Default primary hue
	let backgroundShade = $state(50); // Gray-50 for background
	let showControls = $state(false);

	// Update CSS variables reactively
	$effect(() => {
		if (typeof document !== "undefined") {
			const root = document.documentElement;
			root.style.setProperty("--radius", `${themeRadius}px`);
			root.style.setProperty("--color-primary-600", `oklch(0.627 0.194 ${primaryHue})`);
			root.style.setProperty("--color-primary-700", `oklch(0.527 0.154 ${primaryHue})`);
			root.style.setProperty("--color-primary-50", `oklch(0.982 0.018 ${primaryHue})`);
			root.style.setProperty("--color-background", `var(--color-gray-${backgroundShade})`);
		}
	});
</script>

<svelte:head>
	<title>Kitchen Sink - Component Showcase</title>
</svelte:head>

<div class="section-px section-py container mx-auto">
	<!-- Theme Controls -->
	<div class="fixed top-4 right-4 z-50">
		<Button variant="secondary" size="sm" onclick={() => (showControls = !showControls)}>
			<IconSettings class="size-4" />
		</Button>

		{#if showControls}
			<div
				class="bg-card border-border absolute top-12 right-0 w-80 space-y-4 rounded-lg border p-4 shadow-lg"
			>
				<div class="mb-4 flex items-center gap-2">
					<IconPalette class="text-primary size-4" />
					<h3 class="text-headline font-medium">Theme Controls</h3>
				</div>

				<!-- Radius Control -->
				<div class="space-y-2">
					<label for="radius-control" class="text-sm font-medium"
						>Border Radius: {themeRadius}px</label
					>
					<input
						id="radius-control"
						type="range"
						min="0"
						max="24"
						bind:value={themeRadius}
						class="accent-primary w-full"
					/>
				</div>

				<!-- Primary Color Hue -->
				<div class="space-y-2">
					<label for="hue-control" class="text-sm font-medium">Primary Hue: {primaryHue}°</label>
					<input
						id="hue-control"
						type="range"
						min="0"
						max="360"
						bind:value={primaryHue}
						class="accent-primary w-full"
					/>
				</div>

				<!-- Background Shade -->
				<div class="space-y-2">
					<label for="bg-control" class="text-sm font-medium"
						>Background: Gray-{backgroundShade}</label
					>
					<select
						id="bg-control"
						bind:value={backgroundShade}
						class="border-border bg-background text-foreground w-full rounded border p-2"
					>
						<option value={50}>Gray-50 (White)</option>
						<option value={100}>Gray-100 (Light)</option>
						<option value={200}>Gray-200 (Lighter)</option>
						<option value={300}>Gray-300 (Medium Light)</option>
					</select>
				</div>

				<!-- Reset Button -->
				<Button
					variant="ghost"
					size="sm"
					onclick={() => {
						themeRadius = 8;
						primaryHue = 155;
						backgroundShade = 50;
					}}
					class="w-full"
				>
					Reset to Defaults
				</Button>
			</div>
		{/if}
	</div>

	<div class="space-y-16">
		<!-- Header -->
		<div class="text-center">
			<h1 class="text-display">Component Kitchen Sink</h1>
			<p class="text-body mt-4" style="color: var(--color-muted-foreground);">
				Showcase of all component variants and states
			</p>
		</div>

		<!-- Buttons Section -->
		<section class="space-y-8">
			<h2 class="text-title1">Buttons</h2>

			<!-- Button Variants -->
			<div class="space-y-6">
				<div>
					<h3 class="text-title3 mb-4">Variants</h3>
					<div class="flex flex-wrap gap-4">
						<Button variant="primary">Primary Button</Button>
						<Button variant="secondary">Secondary Button</Button>
						<Button variant="ghost">Ghost Button</Button>
					</div>
				</div>

				<!-- Button Sizes -->
				<div>
					<h3 class="text-title3 mb-4">Sizes</h3>
					<div class="flex flex-wrap items-center gap-4">
						<Button variant="primary" size="sm">Small</Button>
						<Button variant="primary" size="md">Medium</Button>
						<Button variant="primary" size="lg">Large</Button>
					</div>
				</div>

				<!-- Disabled States -->
				<div>
					<h3 class="text-title3 mb-4">Disabled States</h3>
					<div class="flex flex-wrap gap-4">
						<Button variant="primary" disabled>Primary Disabled</Button>
						<Button variant="secondary" disabled>Secondary Disabled</Button>
						<Button variant="ghost" disabled>Ghost Disabled</Button>
					</div>
				</div>
			</div>
		</section>

		<!-- Cards Section -->
		<section class="space-y-8">
			<h2 class="text-title1">Cards</h2>

			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
				<Card title="Basic Card" description="This is a basic card component with some content." />

				<Card title="Card with Icon" description="A card that contains an icon." icon={IconZap} />

				<Card
					title="Custom Icon Color"
					description="Icon with custom red color."
					icon={IconZap}
					iconClass="size-5 text-red-500"
				/>

				<Card
					title="16:9 Image"
					description="A card with landscape image (16:9 aspect ratio)."
					imageSrc="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
					imageAspect="16/9"
				/>

				<Card
					title="9:16 Portrait"
					description="A card with portrait image (9:16 aspect ratio)."
					imageSrc="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
					imageAspect="9/16"
				/>

				<Card
					title="Icon + Landscape"
					description="Icon overlay on landscape image."
					icon={IconShield}
					imageSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
					imageAspect="16/9"
				/>

				<Card
					title="Icon + Portrait"
					description="Icon overlay on portrait image."
					icon={IconUsers}
					imageSrc="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
					imageAspect="9/16"
				/>
			</div>
		</section>

		<!-- Typography Section -->
		<section class="space-y-8">
			<h2 class="text-title1">Typography</h2>

			<div class="space-y-4">
				<div>
					<h1 class="text-display">Display Text</h1>
					<code class="text-caption">text-display</code>
				</div>

				<div>
					<h1 class="text-title1">Title 1</h1>
					<code class="text-caption">text-title1</code>
				</div>

				<div>
					<h2 class="text-title2">Title 2</h2>
					<code class="text-caption">text-title2</code>
				</div>

				<div>
					<h3 class="text-title3">Title 3</h3>
					<code class="text-caption">text-title3</code>
				</div>

				<div>
					<h4 class="text-headline">Headline</h4>
					<code class="text-caption">text-headline</code>
				</div>

				<div>
					<p class="text-body">
						Body text - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					</p>
					<code class="text-caption">text-body</code>
				</div>

				<div>
					<p class="text-callout">Callout text - Important information or highlights.</p>
					<code class="text-caption">text-callout</code>
				</div>

				<div>
					<p class="text-caption">Caption text - Small descriptive text.</p>
					<code class="text-caption">text-caption</code>
				</div>

				<div>
					<p class="text-footnote">Footnote text - Very small supplementary text.</p>
					<code class="text-caption">text-footnote</code>
				</div>
			</div>
		</section>

		<!-- Theme Colors Section -->
		<section class="space-y-8">
			<h2 class="text-title1">Theme Colors</h2>

			<div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
				<div
					class="rounded border p-4"
					style="background-color: var(--color-background); border-color: var(--color-border);"
				>
					<div class="text-caption font-medium">Background</div>
					<div class="text-footnote">--color-background</div>
				</div>

				<div
					class="rounded border p-4"
					style="background-color: var(--color-foreground); color: var(--color-background); border-color: var(--color-border);"
				>
					<div class="text-caption font-medium">Foreground</div>
					<div class="text-footnote">--color-foreground</div>
				</div>

				<div
					class="rounded border p-4"
					style="background-color: var(--color-primary); color: var(--color-primary-foreground); border-color: var(--color-border);"
				>
					<div class="text-caption font-medium">Primary</div>
					<div class="text-footnote">--color-primary</div>
				</div>

				<div
					class="rounded border p-4"
					style="background-color: var(--color-secondary); color: var(--color-secondary-foreground); border-color: var(--color-border);"
				>
					<div class="text-caption font-medium">Secondary</div>
					<div class="text-footnote">--color-secondary</div>
				</div>

				<div
					class="rounded border p-4"
					style="background-color: var(--color-muted); color: var(--color-muted-foreground); border-color: var(--color-border);"
				>
					<div class="text-caption font-medium">Muted</div>
					<div class="text-footnote">--color-muted</div>
				</div>

				<div
					class="rounded border p-4"
					style="background-color: var(--color-accent); color: var(--color-accent-foreground); border-color: var(--color-border);"
				>
					<div class="text-caption font-medium">Accent</div>
					<div class="text-footnote">--color-accent</div>
				</div>

				<div
					class="rounded border p-4"
					style="background-color: var(--color-card); color: var(--color-card-foreground); border-color: var(--color-border);"
				>
					<div class="text-caption font-medium">Card</div>
					<div class="text-footnote">--color-card</div>
				</div>

				<div
					class="rounded border p-4"
					style="background-color: var(--color-popover); color: var(--color-popover-foreground); border-color: var(--color-border);"
				>
					<div class="text-caption font-medium">Popover</div>
					<div class="text-footnote">--color-popover</div>
				</div>
			</div>
		</section>

		<!-- Border Radius Section -->
		<section class="space-y-8">
			<h2 class="text-title1">Border Radius</h2>

			<div class="grid grid-cols-2 gap-4 md:grid-cols-4">
				<div
					class="p-4"
					style="border-radius: var(--radius-xs); background-color: var(--color-muted);"
				>
					<div class="text-caption font-medium">XS</div>
					<div class="text-footnote">--radius-xs</div>
				</div>

				<div
					class="p-4"
					style="border-radius: var(--radius-sm); background-color: var(--color-muted);"
				>
					<div class="text-caption font-medium">SM</div>
					<div class="text-footnote">--radius-sm</div>
				</div>

				<div
					class="p-4"
					style="border-radius: var(--radius); background-color: var(--color-muted);"
				>
					<div class="text-caption font-medium">Default</div>
					<div class="text-footnote">--radius</div>
				</div>

				<div
					class="p-4"
					style="border-radius: var(--radius-lg); background-color: var(--color-muted);"
				>
					<div class="text-caption font-medium">LG</div>
					<div class="text-footnote">--radius-lg</div>
				</div>
			</div>
		</section>

		<!-- 1 Feature -->
		<Features
			title="Single feature layout"
			subtitle="One standout feature"
			features={[
				{
					title: "AI-powered insights",
					description: "Get intelligent recommendations powered by machine learning algorithms.",
					icon: IconZap,
					imageSrc:
						"https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
				}
			]}
		/>

		<!-- 2 Features -->
		<Features
			title="Two feature layout"
			subtitle="Perfect pair of features"
			features={[
				{
					title: "Lightning fast",
					description: "Built for speed with optimized performance and caching.",
					icon: IconZap
				},
				{
					title: "Global infrastructure",
					description: "Deploy anywhere with our worldwide network of data centers.",
					imageSrc:
						"https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
				}
			]}
		/>

		<!-- 3 Features -->
		<Features
			title="Three feature layout"
			subtitle="Core trio of features"
			features={[
				{
					title: "Bank-level security",
					description: "Your data is protected with enterprise-grade encryption.",
					icon: IconShield,
					imageSrc:
						"https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
				},
				{
					title: "Team collaboration",
					description: "Work together seamlessly with real-time tools.",
					icon: IconUsers
				},
				{
					title: "Analytics dashboard",
					description: "Monitor performance with comprehensive reporting.",
					imageSrc:
						"https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
				}
			]}
		/>

		<!-- 4 Features -->
		<Features
			title="Four feature layout"
			subtitle="Complete feature set"
			features={[
				{
					title: "Cloud hosting",
					description: "Reliable cloud infrastructure with 99.9% uptime.",
					icon: IconZap,
					imageSrc:
						"https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
				},
				{
					title: "Secure payments",
					description: "PCI-compliant payment processing.",
					icon: IconShield
				},
				{
					title: "Team management",
					description: "Manage teams and permissions easily.",
					icon: IconUsers
				},
				{
					title: "Real-time analytics",
					description: "Live data insights and reporting.",
					imageSrc:
						"https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
				}
			]}
		/>

		<!-- 5 Features -->
		<Features
			title="Five feature layout"
			subtitle="Comprehensive feature showcase"
			features={[
				{
					title: "API integration",
					description: "Connect with third-party services seamlessly.",
					icon: IconZap
				},
				{
					title: "Data encryption",
					description: "End-to-end encryption for all data.",
					icon: IconShield
				},
				{
					title: "Mobile apps",
					description: "Native iOS and Android applications.",
					imageSrc:
						"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
				},
				{
					title: "24/7 support",
					description: "Round-the-clock customer assistance.",
					icon: IconUsers
				},
				{
					title: "Advanced reporting",
					description: "Detailed insights and custom reports.",
					icon: IconShield,
					imageSrc:
						"https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
				}
			]}
		/>

		<!-- 6 Features -->
		<Features
			title="Six feature layout"
			subtitle="Complete platform overview"
			features={[
				{
					title: "Auto-scaling",
					description: "Automatically scale based on demand.",
					icon: IconZap
				},
				{
					title: "SSL certificates",
					description: "Free SSL certificates for all domains.",
					icon: IconShield
				},
				{
					title: "Developer tools",
					description: "Comprehensive SDK and documentation.",
					imageSrc:
						"https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
				},
				{
					title: "User management",
					description: "Role-based access control system.",
					icon: IconUsers
				},
				{
					title: "Machine learning",
					description: "AI-powered recommendations and insights.",
					icon: IconZap,
					imageSrc:
						"https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
				},
				{
					title: "Performance monitoring",
					description: "Real-time performance tracking and alerts.",
					imageSrc:
						"https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
				}
			]}
		/>
		<Features
			title="Six feature layout"
			subtitle="Complete platform overview"
			features={[
				{
					title: "Auto-scaling",
					description: "Automatically scale based on demand."
				},
				{
					title: "SSL certificates",
					description: "Free SSL certificates for all domains."
				},
				{
					title: "Developer tools",
					description: "Comprehensive SDK and documentation."
				},
				{
					title: "User management",
					description: "Role-based access control system."
				},
				{
					title: "Machine learning",
					description: "AI-powered recommendations and insights."
				},
				{
					title: "Performance monitoring",
					description: "Real-time performance tracking and alerts."
				}
			]}
		/>
	</div>
</div>
