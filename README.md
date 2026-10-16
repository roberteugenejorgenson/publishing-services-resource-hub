# Publishing Services Resource Hub

A static, publicly accessible resource library for Publishing Services teams. Astro, TypeScript, Tailwind CSS, Lucide icons, and Git-backed Markdown content power a home page and reusable department libraries for Global Operations and Product Management.

## Features

- Responsive pages with keyboard-accessible navigation and reduced-motion support.
- Department resource libraries with search, category/type filters, sorting, and clear-filter actions.
- An “Add a resource” action on each department page that opens the CMS new-resource form with that department selected.
- Global search across published titles, descriptions, departments, categories, and tags, including partial matches and one-character typos.
- Featured and recently updated resources on the home page.
- Real file links only. PDFs open in the browser; supplied PDF renditions can accompany Word and PowerPoint downloads.
- Draft/unpublished metadata is excluded from the public site and search index.
- Decap CMS configuration, static Netlify configuration, headers, sitemap, and robots rules.

## Technology and local development

Astro static site generation, TypeScript, Tailwind CSS 4 via its Vite plugin, `@lucide/astro`, Astro content collections with Zod validation, Decap CMS, and Netlify.

Use Node.js 22 or later and npm.

```sh
npm install
npm run dev
```

Astro prints the local address, normally `http://localhost:4321`. Run technical checks and preview a production build with:

```sh
npm run check
npm run build
npm run preview
```

Set `SITE_URL` to the canonical production origin before building. `.env.example` shows the format. Without it, the project uses an example domain that must be changed before launch.

## Resource model and files

Resources are Markdown files in `src/content/resources/` with frontmatter matching `src/content.config.ts`. Fields include a stable lowercase `id`, title, description, department slug, category, tags, type, featured/published flags, and dates. Files live in `public/resources/` and use public paths such as `/resources/global-operations/example.pdf`.

PDF, Word, and PowerPoint entries need a real `fileUrl` before publication. External entries need an `externalUrl`. An optional `previewUrl` points to an already supplied PDF. Word files do not receive an automatic browser preview, and presentations are not sent to a third-party viewer. Video is represented in the schema for future use; a full video workflow is not implemented.

Two example records are included as unpublished demonstration drafts. They contain no files and are excluded from the public site.

### Add, replace, or remove a resource

In `/admin/`, create a resource, complete its metadata, choose department/category/type, upload a real file, set dates, and publish when approved. The “Add a resource” button on each department page opens this form with the matching department preselected. To replace a file, edit the file field and `lastUpdated`; test the new link after deployment. Remove an old file only when no other resource uses it. To remove a resource, unpublish it for review or delete its entry, then remove any unreferenced file. Git retains the committed history.

The CMS upload base folder is `public/resources/`. Keep filenames short, lowercase, and hyphenated. The preferred folder organization is `public/resources/<department>/documents/` (and `presentations/` or `templates/`). The configured CMS uploader currently uses one shared base folder; adjust the media folder configuration if editors need separate destination folders. Verify that each file URL starts `/resources/` and matches the actual location.

## Add departments and categories

Department definitions are in `src/data/departments.ts`: add a slug, name, summaries, icon key, and categories. The `[department].astro` route generates the corresponding library route from this data. Add its icon mapping on the home page and its slug to the Department options in `public/admin/config.yml`. Categories are free text in the CMS, so an editor can add a category without changing library logic. Keep names consistent with the department configuration.

To add a resource type, update `src/content.config.ts`, the CMS select options, and labels/actions in `src/lib/resources.ts` and `src/components/ResourceCard.astro`.

## GitHub and Netlify

The source is in the public GitHub repository [roberteugenejorgenson/publishing-services-resource-hub](https://github.com/roberteugenejorgenson/publishing-services-resource-hub), on the `main` branch. To work on another machine, clone it with:

```sh
git clone https://github.com/roberteugenejorgenson/publishing-services-resource-hub.git
cd publishing-services-resource-hub
npm install
```

The public GitHub repository is connected to Netlify and deploys the `main` branch. The production site is [publishing-services-resource-hub.netlify.app](https://publishing-services-resource-hub.netlify.app/). `netlify.toml` defines `npm run build`, `dist`, Node 22, and basic security headers. Netlify's Git integration deploys pushes to the production branch and creates previews for branches/PRs. The Netlify `SITE_URL` environment variable should match the production domain.

## Decap CMS and authentication

The admin is `/admin/`. It uses the Decap GitHub backend with Netlify's hosted GitHub OAuth endpoint; it does not use Git Gateway. The repository and production domain are configured below. To complete login, a GitHub OAuth application must be configured in Netlify.

1. In GitHub account settings, register an OAuth app. Set its homepage to `https://publishing-services-resource-hub.netlify.app/` and its authorization callback to `https://api.netlify.com/auth/done`.
2. In Netlify project configuration, open **Access & security → OAuth → Authentication providers** and install the GitHub provider with that OAuth app's client ID and secret. Keep the secret in Netlify; never put it in this repository or browser config.
3. Give each editor GitHub write access to `roberteugenejorgenson/publishing-services-resource-hub`. Editors then sign in at `https://publishing-services-resource-hub.netlify.app/admin/` with their GitHub account. Only repository collaborators with write access can commit through this CMS.
4. Test login, draft, preview, publish, and upload with a non-sensitive test record. Confirm the CMS commit appears in GitHub and Netlify deploys it, then remove the test content.

Consult [Decap's GitHub backend guide](https://decapcms.org/docs/github-backend/) and [Netlify's OAuth provider guide](https://docs.netlify.com/manage/security/secure-access-to-sites/oauth-provider-tokens/) during setup.

## Branding and troubleshooting

The text brand is in `src/components/SiteHeader.astro`; the footer is in `src/components/SiteFooter.astro`; `public/favicon.svg` is the initial mark. Colors and typography defaults are in `src/styles/global.css`.

- **CMS sign-in fails:** check repository slug/branch, Netlify OAuth provider, callback registration, and editor write access. Never paste secrets into config.
- **Resource is missing:** check `published: true`, required fields, department slug, and file path.
- **Download errors:** ensure the file is committed under `public/` and the URL starts with `/resources/`, not `/public/resources/`.
- **PDF preview fails:** open the PDF path directly and verify it is a valid PDF.
- **Install fails:** check Node/npm versions and network access to the npm registry.
- **Category filter lacks an option:** filters reflect categories in currently published resources.

## Quality and limitations

Run `npm run check` and `npm run build` for local technical verification. Production OAuth, Netlify deployment, device-level responsive checks, and browser accessibility tooling require connected services/devices and have not been externally verified. No resource files are supplied, so the public libraries show empty states until approved files are added. The CMS uploader is configured with one shared resources folder; deeper department folders may require folder configuration. Search typo handling is intentionally small and dependency-free.
