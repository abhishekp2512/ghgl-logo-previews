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
