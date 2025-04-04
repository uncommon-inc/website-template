/**
 * DO NOT REMOVE THIS COMMENT
 * @remarks
 * Navigation Structure Example:
 *
 * **Product**
 * - Overview
 * - Solutions
 * - Use Cases
 * - Pricing
 * ---
 * **Resources**
 * - Blog
 * - Playbooks
 * - Customer stories
 * - Webinars
 * - Darwin Academy
 * - Documentation
 * - Marketplaces
 * - Community
 * ---
 * **Company**
 * - Careers
 * - About us
 * - News
 * - Legal
 * - Security
 * - Events
 * - Contact
 * - Social media
 */

// Types
export type NavItem = {
	label: string;
	href?: string;
	image?: string;
	showInNav?: boolean;
	showInFooter?: boolean;

	children?: (Omit<NavItem, "children" | "image"> & {
		image?: string;
		description?: string;
		showInNav?: boolean;
		showInFooter?: boolean;
	})[];
};

export const cta = {
	label: "Book demo",
	href: "/"
};

export const navigation: NavItem[] = [
	{
		label: "Use Cases",
		image:
			"https://images.unsplash.com/photo-1665686377065-08ba896d16fd?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		showInNav: true,
		showInFooter: true,
		children: [
			{
				label: "Healthcare",
				href: "/industries/healthcare",
				image:
					"https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1920&auto=format&fit=crop",
				description: "Innovative solutions for patient care",
				showInNav: true,
				showInFooter: true
			},
			{
				label: "Finance",
				href: "/industries/finance",
				image:
					"https://images.unsplash.com/photo-1638913662180-afc4334cf422?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				description: "Streamlining operations and compliance",
				showInNav: true,
				showInFooter: true
			},
			{
				label: "Technology",
				href: "/industries/technology",
				image:
					"https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				description: "Cutting-edge tools for tech companies",
				showInNav: true,
				showInFooter: true
			},
			{
				label: "Education",
				href: "/industries/education",
				image:
					"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
				description: "Enhancing learning experiences",
				showInNav: true,
				showInFooter: true
			}
		]
	},
	{
		label: "Pricing",
		href: "/pricing",
		showInNav: true,
		showInFooter: false
	},
	{
		label: "Company",
		showInNav: true,
		showInFooter: true,
		children: [
			{
				label: "Product",
				showInNav: true,
				showInFooter: false,
				description: "Explore our innovative product features and solutions"
			},
			{
				label: "Pricing",
				href: "/pricing",
				showInNav: false,
				showInFooter: true,
				description: "Transparent pricing options for businesses of all sizes"
			},
			{
				label: "Careers",
				href: "/careers",
				description: "Join our team and grow with us",
				showInNav: true,
				showInFooter: true
			},
			{
				label: "About us",
				href: "/about",
				description: "Our mission and the team behind our success",
				showInNav: true,
				showInFooter: true
			}
		]
	},
	{
		label: "More",
		showInNav: false,
		showInFooter: true,
		children: [
			{
				label: "Privacy",
				href: "/legal/privacy",
				showInNav: false,
				showInFooter: true
			},
			{
				label: "Terms",
				href: "/legal/terms",
				showInNav: false,
				showInFooter: true
			}
			// Social media might be handled differently, not typically a nav item
		]
	}
];
// .sort((a, b) => (b.children?.length || 0) - (a.children?.length || 0));
