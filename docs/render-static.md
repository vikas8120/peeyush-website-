# Render Static Site deployment

The frontend is plain HTML, CSS, and JavaScript. It can be published directly without an npm install, compilation, or a Node server. All existing UI source and asset paths are preserved.

## Deploy using the Blueprint

1. Push this repository to GitHub.
2. In Render, select **New > Blueprint** and connect this repository.
3. Use the `main` branch and the root `render.yaml` file.
4. Review and deploy the `peeyush-frontend` static site.

The Blueprint uses `frontend/` as its root directory and publishes that directory directly. It contains no package manifest, so the backend install scripts are outside the static build root. Backend source, configuration, credentials, and local caches are outside the published directory.

## Deploy using the Static Site form

Use these equivalent settings if you are already on the manual creation form:

| Setting | Value |
|---|---|
| Service type | Static Site |
| Branch | main |
| Root Directory | `frontend` |
| Build Command | `test -f index.html` |
| Publish Directory | `.` |
| Environment variable | `SKIP_INSTALL_DEPS=true` |

The build command verifies that the homepage exists relative to the frontend root. `SKIP_INSTALL_DEPS` also explicitly disables automatic dependency installation.

For an existing manually created Static Site, update these fields in Render Settings and save the environment variable under Environment. Pushing `render.yaml` does not automatically change a manually configured service. Cancel an old in-progress deployment, then deploy the latest commit after saving the new settings.

Do not add `MONGO_URI`, `JWT_SECRET`, or other backend credentials to this static site.

## What works now

Existing static pages, styles, photos, and browser-side interactions are served from the Render CDN. The site requires no Node server to serve those files.

Login, registration, bookings, contact submission, database-backed ratings, admin data, uploads, and payment APIs still require a separately deployed backend. Existing `/api/...` requests are preserved and will not work on a standalone static site until API routing is configured.

When a public backend URL is available, Render proxy rewrites can forward `/api/*` and `/uploads/*` to it without modifying the UI source. Do not add a catch-all `/*` rewrite to `index.html`: this project has separate HTML pages, and an API failure should not return the homepage.

Local full-stack development remains `npm.cmd run dev`. For a frontend-only preview, run `npm.cmd run frontend` and open http://localhost:3001.

References: [Render Static Sites](https://render.com/docs/static-sites), [Blueprint YAML reference](https://render.com/docs/blueprint-spec), [Redirects and rewrites](https://render.com/docs/redirects-rewrites).
