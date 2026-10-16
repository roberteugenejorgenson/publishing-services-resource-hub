# Publishing Services Resource Hub
## Content management guide

This guide is for Publishing Services editors. The public site needs no sign-in. Only authorized editors can add or change content.

### Before your first visit

An administrator must connect the project to GitHub and Netlify and enable GitHub sign-in. You also need write access to the GitHub repository. If the admin page opens but sign-in fails, contact the site administrator. Never send a password or access token.

### Sign in

1. Open `https://YOUR-SITE/admin/`.
2. Choose GitHub sign-in.
3. Sign in with the GitHub account that has editor access.
4. Open **Resources** to see existing entries.

### Add a resource

1. Choose **New Resource**.
2. Enter a short title and plain-language description explaining what the file is for.
3. Give it a unique lowercase **Resource ID** with hyphens, such as `global-ops-travel-process`. Keep this ID unchanged when editing the same resource.
4. Choose the correct department and category. Use the department's existing category spelling where possible. You may type a new category when needed.
5. Add useful tags, one at a time (for example, `onboarding`, `checklist`, or `planning`).
6. Choose the file type and upload the actual approved document. For an external resource, enter its full `https://` address in **External URL**.
7. Optionally upload a PDF preview for a Word or PowerPoint file. The preview must already be a PDF; the site does not convert files.
8. Turn on **Featured** only when the item should appear in the home page highlights.
9. Set **Date added** and **Last updated**. Update Last updated whenever you change the content or replace the file.
10. Leave **Published** off while preparing/reviewing. Preview the entry, then turn it on only when it is approved for anyone on the internet to access.
11. Save or publish, and follow the CMS prompt to submit the change for review. Once accepted, GitHub receives the update and Netlify builds the public site.
12. After deployment finishes, open the department page and test the resource link.

### Replace a file

1. Open the resource and choose the replacement in the **File** field.
2. Keep its Resource ID, title, and department if it is the same resource.
3. Update **Last updated** and review its description and tags.
4. Preview and submit. Test the new public link after deployment.
5. Remove an old file only after confirming no other resource uses it. Git history retains committed versions.

### Unpublish or remove a resource

- To hide it temporarily, turn **Published** off and submit the change.
- To remove it, use the entry's delete action and submit the change for review. Remove its file only after checking that no other entry uses it.

The change appears publicly after the new site finishes deploying.

### Search and categories

Visitors can search titles, descriptions, categories, and tags. Good tags help people find the right file. Use consistent spelling/capitalization for categories. Filters show categories and file types that currently have published resources.

### Publishing rules

- Published files are public. Anyone may view, download, and share the URL.
- Upload only materials approved for public distribution. Do not upload confidential or restricted documents.
- Do not publish a document entry until its real file or external link is present and tested.
- Use clear, short filenames without private information.
- Never put passwords, tokens, or secrets in descriptions or uploads.

### Getting help

If sign-in fails, a resource is missing, or a link returns an error, contact the site administrator with the resource title and what happened. Do not include passwords or access tokens.
