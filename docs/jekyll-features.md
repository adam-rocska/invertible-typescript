---
title: Jekyll features
description: What this site uses and extra features you can enable later.
---

This site already uses a bunch of Jekyll features:

- **Data files** (`_data/navigation.yml`) for navigation.
- **Layouts** and **includes** to keep pages consistent.
- **Sass/SCSS** for styling in `assets/css/style.scss`.
- **Pretty permalinks** for clean URLs.
- **Liquid** templating for nav, TOC, and search index.

## Optional features you can add later

### Blog posts

Create `_posts` and add `YYYY-MM-DD-title.md` files:

```md
---
layout: post
title: "Announcing 1.2.0"
---

Post content here.
```

### Pagination

Enable in `_config.yml`:

```yml
paginate: 5
paginate_path: "/blog/page:num/"
```

### Tags and categories

Add to a post:

```md
---
layout: post
title: "New API"
tags: [api, types]
---
```

Then loop over `site.tags` to generate tag pages.

### SEO tags

Add the plugin and include tag:

```yml
plugins:
  - jekyll-seo-tag
```

Then add `{% raw %}{% seo %}{% endraw %}` to `head.html`.

### Sitemaps

```yml
plugins:
  - jekyll-sitemap
```

### Multiple doc versions

```yml
collections:
  v1:
    output: true
    permalink: /v1/:path/
  v2:
    output: true
    permalink: /v2/:path/
```

### Redirects

```yml
plugins:
  - jekyll-redirect-from
```

Then in front matter:

```md
redirect_from:
  - /old-url/
```
