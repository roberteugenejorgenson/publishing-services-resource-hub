import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';
import { departmentBySlug } from './data/departments';

const resources = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/resources' }),
  schema: z.object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string().min(1),
    description: z.string().min(1),
    department: z.string().refine((value) => value in departmentBySlug, 'Choose a configured department.'),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    resourceType: z.enum(['pdf', 'word', 'powerpoint', 'video', 'external']),
    fileUrl: z.string().refine((value) => value.startsWith('/resources/') && !value.split('/').includes('..'), 'Files must be stored under /resources/.').optional(),
    previewUrl: z.string().refine((value) => value.startsWith('/resources/') && !value.split('/').includes('..'), 'Previews must be stored under /resources/.').optional(),
    externalUrl: z.url().refine((value) => new URL(value).protocol === 'https:', 'External links must use HTTPS.').optional(),
    thumbnail: z.string().optional(),
    featured: z.boolean().default(false),
    published: z.boolean().default(false),
    dateAdded: z.coerce.date(),
    lastUpdated: z.coerce.date(),
  }).superRefine((resource, ctx) => {
    const fileTypes = ['pdf', 'word', 'powerpoint'];
    if (resource.published && fileTypes.includes(resource.resourceType) && !resource.fileUrl) {
      ctx.addIssue({ code: 'custom', path: ['fileUrl'], message: 'Published documents need an uploaded file.' });
    }
    if (resource.resourceType === 'external' && !resource.externalUrl) {
      ctx.addIssue({ code: 'custom', path: ['externalUrl'], message: 'External resources need a URL.' });
    }
    const allowedExtensions: Record<string, string[]> = {
      pdf: ['.pdf'], word: ['.doc', '.docx'], powerpoint: ['.ppt', '.pptx'], video: ['.mp4', '.webm'],
    };
    if (resource.fileUrl && allowedExtensions[resource.resourceType] && !allowedExtensions[resource.resourceType].some((extension) => resource.fileUrl!.toLowerCase().split('?')[0].endsWith(extension))) {
      ctx.addIssue({ code: 'custom', path: ['fileUrl'], message: `File extension does not match resource type ${resource.resourceType}.` });
    }
    if (resource.previewUrl && !resource.previewUrl.toLowerCase().split('?')[0].endsWith('.pdf')) {
      ctx.addIssue({ code: 'custom', path: ['previewUrl'], message: 'Previews must be PDF files.' });
    }
  }),
});

export const collections = { resources };
