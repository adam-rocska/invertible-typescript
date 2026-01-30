# Docs

This folder hosts the GitHub Pages site built with Jekyll.

## Local preview

```bash
bundle exec jekyll serve --source docs --livereload
```

If you don't use Bundler, you can install Jekyll globally and run:

```bash
jekyll serve --source docs
```

## Structure

- `_docs/`: documentation pages (collection)
- `_data/navigation.yml`: sidebar nav
- `_layouts/` and `_includes/`: page templates
- `assets/`: CSS, JS, images

## Search

Search is client-side. The index is generated at `search.json` from the docs collection.
