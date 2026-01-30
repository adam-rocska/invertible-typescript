---
title: Jekyll features
description: What this docs site uses and examples of features you can add later.
order: 11
---

This site already uses a solid chunk of Jekyll features:

- **Collections** for `/docs/*` pages.
- **Data files** (`_data/navigation.yml`) for navigation.
- **Layouts** and **includes** to keep pages consistent.
- **Front matter defaults** to keep metadata minimal.
- **Sass/SCSS** for styling.
- **Liquid** filters and loops for TOC, pagination, and nav.

## Features not used (with examples)

Below are common Jekyll features you can add later. Each example is intentionally minimal so you can drop it in when needed.

### Blog posts

Create a `_posts` folder and add files like `2026-01-30-release.md`:

```md
---
layout: post
title: "Announcing 1.2.0"
---

Post content here.
```

### Pagination

Enable pagination in `_config.yml`:

```yml
paginate: 5
paginate_path: "/blog/page:num/"
```

Then add a `blog.md` page that lists posts with pagination controls.

### Tags and categories

Add tags to a post:

```md
---
layout: post
title: "New API"
tags: [api, types]
---
```

Then generate tag pages by looping over `site.tags`.

### Collections for API versions

If you want versioned docs, add a collection:

```yml
collections:
  v1:
    output: true
    permalink: /v1/:path/
  v2:
    output: true
    permalink: /v2/:path/
```

### Includes for reusable UI blocks

You already use `callout.html`. You can add more, e.g. `tabbed-code.html` for multi-language examples.

### Custom plugins

Using the GitHub Pages action allows plugins like `jekyll-seo-tag` or `jekyll-sitemap`.

Example in `_config.yml`:

```yml
plugins:
  - jekyll-seo-tag
  - jekyll-sitemap
```

Then add `{% seo %}` in `head.html` to emit SEO metadata.

### Themes / remote themes

Instead of custom layouts you can use a theme:

```yml
remote_theme: just-the-docs/just-the-docs
```

### Incremental builds

Speed up local builds:

```yml
incremental: true
```

### Assets pipeline

You can add Jekyll asset bundling with tools like `jekyll-assets`, but it requires the plugin pipeline.

## Why these are optional

The current docs site is deliberately slim: no Ruby plugins are required to build locally, and GitHub Pages can render it with the default Jekyll build. Add features only if they solve a real workflow need.
