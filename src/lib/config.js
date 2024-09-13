/**
 * All of these values are used throughout the site – for example,
 * in the <meta> tags, in the footer, and in the RSS feed.
 *
 * PLEASE BE SURE TO UPDATE THEM ALL! Thank you!
 **/

export const siteTitle = "will@nite";
export const siteDescription =
	"regrets, grievances, hopes, and learnings of a seasoned software engineer";
export const siteURL = "wallw.dev";
export const siteLink = "https://wallw.dev/blog";
export const siteAuthor = "William Wall";
export const timezoneOffset = -360 * 60 * 1000;

// Controls how many posts are shown per page on the main blog index pages
export const postsPerPage = 25;

// Edit this to alter the main nav menu. (Also used by the footer and mobile nav.)
export const navItems = [
	{
		title: "Blog",
		route: "/blog",
	},
	{
		title: "About",
		route: "/about",
	},
	{
		title: "Contact",
		route: "/contact",
	},
];
