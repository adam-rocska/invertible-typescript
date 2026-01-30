---
title: Mintlify features
description: Extra features you can adopt without writing code.
---

This docs setup stays Markdown-only. If you want more later, Mintlify supports:

## OpenAPI pages

Add an API spec and reference it in `docs.json`.

```json
{
  "openapi": {
    "file": "openapi.json"
  }
}
```

## Tabs and callouts (Markdown-only)

Use components directly in Markdown:

````md
:::note
You can call out important details.
:::

:::tabs
::tab{title="TypeScript"}
```ts
const hello = "world";
```
::
::tab{title="JavaScript"}
```js
const hello = "world";
```
::
:::
````

## Code group and copy buttons

Mintlify adds copy buttons automatically to code blocks.

## API playgrounds

If you add OpenAPI specs, Mintlify renders live API explorers.

## Custom domains and analytics

Set `favicon`, `logo`, `analytics`, and `redirects` in `docs.json`.

If you want any of these turned on, I can wire them up while keeping your content Markdown-only.
