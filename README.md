# Uneiz Shaikh

Personal portfolio for Uneiz Shaikh, a software engineer moving into AI engineering. The site is a static Next.js application. Projects and notes live in MDX, not in React components.

## Run locally

```bash
pnpm install
pnpm dev
```

The dev server uses port 43123. Production:

```bash
pnpm build
pnpm start
```

## Add a project

Create `content/projects/<slug>.mdx` with the fields in `velite.config.ts`. Put screenshots in `public/projects/<slug>/` and reference them from the file. Leave unknown fields out. Do not invent metrics, model names, or URLs.

## Add a note

Create `content/writing/<slug>.mdx` with a title, description, date, tags, and body. Drafts stay out of the site when `draft: true`.

## Profile links and files

Optional values in `lib/site.ts`: `email`, `github`, `linkedin`.

Optional files:

- `public/portrait.jpg`
- `public/uneiz-shaikh-resume.pdf`

Missing files are skipped. The build does not require them.

## Deployment

`main` is production. Other branches are preview deployments. The canonical domain is `https://uneizshaikh.dev`. Point the Vercel project at that apex domain and redirect `www` to it.
