import { getCollection } from 'astro:content';
import { departmentBySlug } from '../data/departments';

export type ResourceView = {
  id: string;
  title: string;
  description: string;
  department: string;
  departmentName: string;
  category: string;
  tags: string[];
  resourceType: 'pdf' | 'word' | 'powerpoint' | 'video' | 'external';
  fileUrl?: string;
  previewUrl?: string;
  externalUrl?: string;
  thumbnail?: string;
  featured: boolean;
  published: boolean;
  dateAdded: Date;
  lastUpdated: Date;
};

export async function getPublishedResources() {
  const entries = await getCollection('resources', ({ data }) => data.published);
  const ids = entries.map(({ data }) => data.id);
  if (new Set(ids).size !== ids.length) throw new Error('Published resource IDs must be unique.');
  return entries.map(({ data, id }) => ({ ...data, id: data.id || id, departmentName: departmentBySlug[data.department]?.name ?? data.department }))
    .sort((a, b) => b.lastUpdated.valueOf() - a.lastUpdated.valueOf());
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(date);
}

export function fileLabel(type: string) {
  return ({ pdf: 'PDF', word: 'Word', powerpoint: 'PowerPoint', video: 'Video', external: 'Link' } as Record<string, string>)[type] ?? type;
}
