# Ivanoff Workshop

A content site built to attract search and social traffic with articles, then route readers to the things you build.

## Design

**Three content types, one loop.**

| Type | Purpose | Where it lives |
|---|---|---|
| Articles | Long-form, search-targeted writing. Each one comes out of a build and promotes it. | `src/content/articles/*.md` |
| Notes | Short posts and links. Cheap to publish, keeps the site fresh. | `src/content/notes/*.md` |
| Builds | One page per project: status, stack, store links, and every article about it. | `src/content/builds/*.md` |

An article's `builds:` field references the builds collection. That renders a promo callout at the top of the article, lists the article on the build's page, and fails the build on a typo.

**Traffic features already wired:** canonical URLs, Open Graph and Twitter cards, Article and SoftwareApplication JSON-LD, sitemap, RSS (articles and notes), tag pages, related articles, reading time, table of contents, full-text search (Pagefind), prefetching, dark mode, newsletter capture.

## Writing

```bash
npm run dev
```

Add a file under `src/content/articles/`:

```md
---
title: Your title
description: One or two sentences, under 200 characters. This is the search snippet.
publishDate: 2026-10-15
tags: [supabase, ios]
builds: [runtour]        # ids = filenames in src/content/builds
featured: false          # true pins it to the top of the home page
draft: true              # drafts show in dev, hidden in production builds
---
```

## Before you deploy

1. Set `site` in `astro.config.mjs` and the sitemap URL in `public/robots.txt` to your domain.
2. Fill in `src/lib/site.ts`: name, tagline, social links, email, and `newsletterAction` (Buttondown or similar). The newsletter form is hidden until that is set.
3. Replace `public/og-default.png` if you want a different social card.
4. Add `url`, `appStore`, `repo` links to each build in `src/content/builds/`.

```bash
npm run build      # static site + search index in dist/
npm run preview
```

Deployed on Cloudflare (Workers static assets, the successor to Pages) at https://ivanoff-workshop.furmanstudios.workers.dev. Ship a new version with `npm run deploy`. Config lives in `wrangler.jsonc`.
