// Types
import { CONFIG } from "$lib/content";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async () => {
	return {
		meta: {
			title: CONFIG.companyName,
			description: CONFIG.description,
			image: CONFIG.image,
			url: CONFIG.url
		}
	};
};
