// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import starlight from '@astrojs/starlight';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import rehypeMermaid from './src/plugins/rehype-mermaid.mjs';

// Update these values when adopting the template for a project.
const project = {
	title: 'Project Docs',
	description: 'Clear, practical documentation for an open-source project.',
	repository: 'https://github.com/your-name/your-project',
	site: 'https://docs.example.com',
	features: {
		// Set to false to omit Notes header navigation, routes, and search entries.
		notes: true,
	},
};

// https://astro.build/config
export default defineConfig({
	site: project.site,
	vite: {
		define: {
			__PROJECT_NOTES_ENABLED__: JSON.stringify(project.features.notes),
		},
	},
	markdown: {
		processor: unified({
			remarkPlugins: [remarkMath],
			rehypePlugins: [rehypeKatex, rehypeMermaid],
		}),
	},
	integrations: [
		starlight({
			title: {
				en: project.title,
				ja: 'プロジェクトドキュメント',
			},
			description: project.description,
			locales: {
				root: { label: 'English', lang: 'en' },
				ja: { label: '日本語', lang: 'ja' },
			},
			social: [{ icon: 'github', label: 'GitHub', href: project.repository }],
			editLink: {
				baseUrl: `${project.repository}/edit/main/`,
			},
			customCss: [
				'katex/dist/katex.min.css',
				'./src/styles/theme.css',
				'./src/styles/site.css',
			],
			components: {
				Head: './src/components/MetadataHead.astro',
				Header: './src/components/SiteHeader.astro',
				SiteTitle: './src/components/SiteNavigation.astro',
				Sidebar: './src/components/SiteSidebar.astro',
				PageTitle: './src/components/PageTitle.astro',
			},
			expressiveCode: {
				// Slack Ochin is the light theme; Tokyo Night is the dark theme.
				themes: ['slack-ochin', 'tokyo-night'],
				useStarlightUiThemeColors: true,
				styleOverrides: { borderRadius: '0.75rem' },
			},
			lastUpdated: false,
			tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },
			sidebar: [
				{
					label: 'Guides',
					translations: { ja: 'ガイド' },
					items: [{ autogenerate: { directory: 'guides' } }],
				},
				{
					label: 'Reference',
					translations: { ja: 'リファレンス' },
					items: [{ autogenerate: { directory: 'reference' } }],
				},
			],
		}),
	],
});
