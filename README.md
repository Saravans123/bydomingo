# bydomingo CMS site

A static Astro website with a browser editor at `/admin/`, powered by Decap CMS.

## Local test

```bash
npm install
npm run dev
```

Open the site at `http://localhost:4321`.

To test the CMS locally, run in a second Terminal window:

```bash
npx decap-server
```

Then open `http://localhost:4321/admin/`. Local CMS changes are written directly into the project folders.

## Publishing on Netlify

1. Create a new GitHub repository and upload this project's contents.
2. In Netlify, choose **Add new project → Import an existing project**, connect GitHub, and select the repository.
3. Netlify detects `netlify.toml`; deploy with build command `npm run build` and publish directory `dist`.
4. In Netlify, open **Integrations → Identity → Netlify Identity** and enable it.
5. Set registration to **Invite only**.
6. Under Identity services, enable **Git Gateway**.
7. Invite your own email under the site's Identity/Users area.
8. Accept the invitation, set a password, then visit `https://YOUR-SITE.netlify.app/admin/`.
9. In **Domain management**, add `bydomingo.com`, then follow Netlify's DNS instructions.

## Publishing content

At `/admin/`, choose Poetry, Robots, Music, or Video, then choose **New**. Fill the form and publish. Netlify rebuilds after the CMS commits the new Markdown/media files to GitHub.

## Important media note

Images and short audio clips can be uploaded through the CMS. Avoid uploading large video files to GitHub. For video, upload to Vimeo, YouTube (unlisted is possible), or another video host and paste its URL.

## Email icon

The envelope links to `hello@bydomingo.com`. Create that mailbox/forwarding address or replace it in `src/components/Header.astro`.
