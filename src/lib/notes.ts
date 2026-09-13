import { getCollection } from 'astro:content';

export type NotesLocale = 'en' | 'ja';

export interface NoteSummary {
	archiveDate?: Date;
	description?: string;
	displayDate?: Date;
	href: string;
	publishedAt?: Date;
	tags: string[];
	title: string;
	updatedAt?: Date;
}

export interface NotesArchiveGroup {
	key: string;
	label: string;
	notes: NoteSummary[];
}

export interface NotesSource {
	locale: NotesLocale;
	relativePath: string;
}

export function getNotesSource(entry: { filePath?: string }): NotesSource | undefined {
	const filePath = entry.filePath?.replaceAll('\\', '/');
	const match = filePath?.match(/(?:^|\/)src\/content\/docs\/(?:(ja)\/)?notes\/(.+)$/);
	if (!match?.[2]) return undefined;

	return {
		locale: match[1] === 'ja' ? 'ja' : 'en',
		relativePath: match[2],
	};
}

export function isNotesSystemPage(source: NotesSource): boolean {
	const stem = source.relativePath.replace(/\.[^./]+$/, '');
	return stem === 'index' || stem === 'tags';
}

export async function getPublishedNotes(locale: NotesLocale): Promise<NoteSummary[]> {
	const entries = await getCollection('docs');

	return entries
		.filter((entry) => {
			const source = getNotesSource(entry);
			return source?.locale === locale && !isNotesSystemPage(source) && !entry.data.draft;
		})
		.map((entry) => {
			const path = entry.id.replace(/(^|\/)index$/, '$1').replace(/\/$/, '');
			const archiveDate = entry.data.publishedAt ?? entry.data.updatedAt;

			return {
				archiveDate,
				description: entry.data.description,
				displayDate: entry.data.updatedAt ?? entry.data.publishedAt,
				href: `/${path}/`,
				publishedAt: entry.data.publishedAt,
				tags: entry.data.tags,
				title: entry.data.title,
				updatedAt: entry.data.updatedAt,
			};
		})
		.sort((a, b) => {
			const byDate = (b.archiveDate?.getTime() ?? 0) - (a.archiveDate?.getTime() ?? 0);
			return byDate || a.title.localeCompare(b.title, locale);
		});
}

export function groupNotesByMonth(
	notes: NoteSummary[],
	locale: NotesLocale,
): NotesArchiveGroup[] {
	const formatter = new Intl.DateTimeFormat(locale === 'ja' ? 'ja-JP' : 'en', {
		year: 'numeric',
		month: 'long',
		timeZone: 'UTC',
	});
	const groups = new Map<string, NotesArchiveGroup>();

	for (const note of notes) {
		const key = note.archiveDate
			? `${note.archiveDate.getUTCFullYear()}-${String(note.archiveDate.getUTCMonth() + 1).padStart(2, '0')}`
			: 'undated';
		const group = groups.get(key) ?? {
			key,
			label: note.archiveDate
				? formatter.format(note.archiveDate)
				: locale === 'ja'
					? '日付なし'
					: 'Undated',
			notes: [],
		};

		group.notes.push(note);
		groups.set(key, group);
	}

	return [...groups.values()];
}
