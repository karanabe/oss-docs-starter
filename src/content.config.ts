import { defineCollection } from 'astro:content';
import type { Loader } from 'astro/loaders';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const notesFeatureDefine = '__PROJECT_NOTES_ENABLED__';
const notesIdPattern = /^(?:ja\/)?notes(?:\/|$)/;
const notesFilePattern = /(?:^|\/)content\/docs\/(?:ja\/)?notes(?:\/|$)/;

function isNotesEntry(entry: { id: string; filePath?: string }): boolean {
	return notesIdPattern.test(entry.id) || notesFilePattern.test(entry.filePath ?? '');
}

function configurableDocsLoader(): Loader {
	const loader = docsLoader();

	return {
		...loader,
		name: 'configurable-project-docs-loader',
		async load(context) {
			const notesEnabled = context.config.vite.define?.[notesFeatureDefine] === 'true';
			if (notesEnabled) {
				await loader.load(context);
				return;
			}

			// Remove cached Notes entries, then prevent the Starlight glob loader from
			// adding them again during the initial load or a development-server update.
			for (const [id, entry] of context.store.entries()) {
				if (isNotesEntry(entry)) context.store.delete(id);
			}

			const store = {
				...context.store,
				set: (entry: Parameters<typeof context.store.set>[0]) =>
					isNotesEntry(entry) ? false : context.store.set(entry),
			};

			await loader.load({ ...context, store });
		},
	};
}

export const collections = {
	docs: defineCollection({
		loader: configurableDocsLoader(),
		schema: docsSchema({
			extend: z.object({
				publishedAt: z.coerce.date().optional(),
				updatedAt: z.coerce.date().optional(),
				tags: z
					.array(z.string().trim().min(1))
					.refine((values) => new Set(values).size === values.length, {
						message: 'Tags must be unique within a page.',
					})
					.default([]),
			}),
		}),
	}),
};
