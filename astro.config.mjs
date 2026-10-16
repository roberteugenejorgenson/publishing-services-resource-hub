import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: process.env.SITE_URL || process.env.URL || 'https://publishing-services.example.com',
  vite: { plugins: [tailwindcss()] },
});
