# GHGL Design Review Change Ledger

## GHGL-006 — Labeled responsive Home mocks gallery

- Previous behavior: The static design-review site contained approved logo options and logo website previews only.
- Requested behavior: Add a Mocks area and publish the existing Home concept set with explicit 1440, 1280, 1024, 768, 576, and 320 pixel labels.
- Reason: Give stakeholders one stable, accessible location for reviewing page concepts and their intended breakpoints.
- Parity impact: None. This is a design-review archive and makes no functional-parity claim.
- Files/assets affected: `index.html`, `archive.css`, `mocks/index.html`, `mocks/home.html`, six files under `mocks/home/`, and `README.md`.
- Validation: Local link and asset resolution; exact six-figure/breakpoint check; Git whitespace check; semantic structure and responsive CSS review.
- Migration: None.
- Rollback: Revert the GHGL-006 pull request; no production code, schema, or stored data is affected.
- Evidence: GitHub issue #1 and the GHGL-006 pull request.

## GHGL-007 — Responsive overflow and image layout-shift fixes

- Previous behavior: A 320px minimum body width produced horizontal scrolling when the vertical scrollbar reduced the usable client width; mock-gallery images did not declare intrinsic dimensions.
- Requested behavior: Reflow cleanly at the required 320px viewport and reserve the correct aspect ratio for every mock-gallery image before it loads.
- Reason: Resolve the P1 and P2 findings from the GHGL-006 code review.
- Parity impact: None. This remains a static design-review archive with no production behavior or parity claim.
- Files affected: `archive.css`, `index.html`, `mocks/index.html`, `mocks/home.html`, `tests/archive.test.mjs`, `package.json`, and `.github/workflows/static-quality.yml`.
- Tests added first: Node regression tests for forced minimum width, missing/non-positive dimensions, non-PNG assets, and declared dimensions that disagree with each PNG header.
- Verification: `node --test tests/*.test.mjs`, local link/asset resolution, PNG dimension matching, and Git whitespace validation.
- Accessibility/responsive impact: Removes unintended horizontal scrolling at the minimum supported viewport and reduces cumulative layout shift without changing image rendering or accessible names.
- Security/privacy impact: None; no scripts execute in the browser and no user data, forms, integrations, or credentials are introduced.
- Migration: None.
- Rollback: Revert the GHGL-007 pull request; no schema, stored data, or regenerated mock assets are involved.
- Evidence: GitHub issue #3, red/green regression output in the ticket commits, and the GHGL-007 pull request CI run.
