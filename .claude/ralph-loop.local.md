---
active: true
iteration: 36
max_iterations: 40
completion_promise: "<promise>COMPLETE</promise>"
started_at: "2026-01-05T18:14:40Z"
---


You are in the Growth OS codebase at growthos.fyi. Fix remaining audit issues: SSR share page, robots and sitemap correctness, pluralization spacing bug, and export copy consistency.

Constraints:
- Keep current UI and layout.
- Use Next.js App Router primitives.
- No auth, no database, no heavy dependencies.
- Be honest in copy. If PDF export is only via printing, say Print to PDF.

Work items:

1) SSR share page at path /s with query param d:
- Render meaningful server-side HTML from the decoded payload.
- Decode and decompress d using the same algorithm as the builder share link.
- Validate payload with existing zod schema for GrowthSpecInput.
- Generate the spec server-side using the existing generator.
- Render a readable view with headings and content sections:
  KPI Tree, Activation Definition, Tracking Plan, Dashboard Pack.
- Add actions:
  Edit in Builder linking to /builder with the same d,
  Copy Markdown,
  Download md file.
- Add dynamic metadata for OpenGraph and Twitter using decoded payload.

2) Builder prefill:
- On /builder read query param d, decode client-side, populate wizard state.
- If decode fails, show a toast and keep current state.

3) robots.txt and sitemap.xml:
- robots.txt must reference the correct sitemap URL: https://www.growthos.fyi/sitemap.xml
- Do not index /s pages: disallow /s in robots.txt and add noindex metadata on /s page.
- Implement sitemap.xml route that returns valid XML and HTTP 200, includes static routes, and excludes /s.

4) Fix pluralization and spacing bug:
- Remove broken strings like module s and example s everywhere.
- Create a small pluralize helper and replace all occurrences.
- Add at least one unit test for pluralize.

5) Copy consistency for exports:
- Ensure landing and pricing describe the same export formats: Markdown, JSON, and Print to PDF if supported.

Acceptance criteria:
- View-source of /s?d=... contains headings and readable spec content.
- /s has OpenGraph and Twitter metadata.
- /builder?d=... loads prefilled builder state.
- robots.txt references the correct sitemap URL and disallows /s, and sitemap.xml works.
- No module s or example s anywhere.
- pnpm build succeeds and tests pass.

When done, output exactly: <promise>COMPLETE</promise>

