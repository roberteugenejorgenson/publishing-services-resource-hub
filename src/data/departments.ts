export const departments = [
  {
    slug: 'global-operations',
    name: 'Global Operations',
    description: 'Find the operational tools, documentation, training materials, and resources you need to support Publishing Services worldwide.',
    shortDescription: 'Access operational resources, processes, documentation, training materials, and tools supporting global Publishing Services operations.',
    icon: 'globe',
    categories: ['Standard Operating Procedures', 'Training & Development', 'Templates & Forms', 'Presentations', 'Reference Materials', 'Tools & Resources'],
  },
  {
    slug: 'product-management',
    name: 'Product Management',
    description: 'Explore product documentation, presentations, planning materials, and resources supporting Publishing Services product strategy and development.',
    shortDescription: 'Explore product resources, presentations, roadmaps, documentation, and supporting materials for Publishing Services product initiatives.',
    icon: 'layers',
    categories: ['Product Strategy', 'Roadmaps & Planning', 'Product Documentation', 'Presentations', 'Templates & Frameworks', 'Training & Resources'],
  },
] as const;

export type Department = (typeof departments)[number];
export const departmentBySlug = Object.fromEntries(departments.map((department) => [department.slug, department])) as Record<string, Department>;
