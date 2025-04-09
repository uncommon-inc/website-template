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
	import AboutTeaser from "$lib/components/layout/AboutTeaser.svelte";
	import LogoScroller from "$lib/components/layout/LogoScroller.svelte";

	// Props
	const { data }: PageProps = $props();
</script>

<Hero
	title="Elevate your business with thoughtful design"
	subtitle="Design solutions that enhance user experience, improve visual communication, and future-proof your brand identity."
	imageSrc="https://images.unsplash.com/photo-1725027090555-40b031f52b01?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
/>
<LogoScroller />

<Summary
	title="What we do"
	text="Our technology delivers measurable results through secure, adaptable solutions that directly increase productivity and drive growth."
/>

<Features
	title="Features"
	subtitle="Some features"
	features={[
		{
			title: "Streamlined Workflows",
			description:
				"Automate repetitive tasks and connect systems to improve productivity with our industry-leading 87% time savings."
		},
		{
			title: "Data Analysis",
			description:
				"Extract meaningful insights from your data with powerful analytical tools backed by proprietary AI algorithms that are 3x more accurate than competitors."
		},
		{
			title: "Secure Collaboration",
			description:
				"Work together seamlessly while maintaining strict data privacy standards with our zero-knowledge architecture and military-grade encryption."
		},
		{
			title: "Scalable Infrastructure",
			description:
				"Built to grow with your business, our platform handles increasing workloads and user numbers without performance degradation or additional configuration."
		},
		{
			title: "Customizable Solutions",
			description:
				"Tailor our platform to your specific business needs with flexible modules and configurable workflows that adapt to your unique processes."
		},
		{
			title: "24/7 Support",
			description:
				"Access our dedicated support team anytime with our guaranteed response time of under 1 hour, ensuring your business operations never skip a beat."
		}
	]}
/>
<UseCases
	title="Use Cases"
	subtitle="Real-world applications for your business needs"
	useCases={[
		{
			title: "Streamlined Workflows",
			description:
				"Automate repetitive tasks and connect systems to improve productivity with our industry-leading 87% time savings.",
			image:
				"https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
			link: {
				href: "/use-cases/workflows",
				label: "Learn more"
			}
		},
		{
			title: "Data Analysis",
			description:
				"Extract meaningful insights from your data with powerful analytical tools backed by proprietary AI algorithms that are 3x more accurate than competitors.",
			image:
				"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2488&q=80",
			link: {
				href: "/use-cases/data-analysis",
				label: "Explore analytics"
			}
		},
		{
			title: "Secure Collaboration",
			description:
				"Work together seamlessly while maintaining strict data privacy standards with our zero-knowledge architecture and military-grade encryption.",
			image:
				"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
			link: {
				href: "/use-cases/collaboration",
				label: "See security features"
			}
		}
	]}
/>

<AboutTeaser />
<CallToAction />
