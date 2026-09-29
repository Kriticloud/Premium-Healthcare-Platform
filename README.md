# SmileOS dental care platform preview

SmileOS is a React and Vite frontend preview for exploring a dental care experience: provider discovery, appointment scheduling, treatment timelines, records, and payment dashboards. All providers, reviews, appointment slots, patient timelines, documents, and payment details are sample content.

## Run locally

Requirements: Node.js 20 or 22 and npm 10 or later.

```bash
npm ci
npm run dev
```

To enable the landing page's sales email link, copy `.env.example` to `.env.local` and set `VITE_SALES_EMAIL` to a public sales inbox. This value is included in the public client bundle; never put credentials or secrets in a `VITE_*` variable. Production builds read the same setting from the deployment host's build environment.

Run the unit tests and create a type-checked production build with:

```bash
npm test
npm run build
```

`npm run build` runs strict TypeScript checking before creating the Vite bundle. GitHub Actions also checks for high-severity dependency advisories and runs the provider-filter tests on pushes and pull requests.

## Static deployment

The project emits a static `dist/` bundle. Pushing to `copilot/healthcare-showcase-foundation` runs `.github/workflows/deploy-pages.yml`, which builds, tests, and deploys the showcase to GitHub Pages at `https://kriticloud.github.io/Premium-Healthcare-Platform/` when Pages deployments are enabled for the repository. The workflow configures the project-site asset base path and SPA fallback. The `public/_headers` and `public/_redirects` files are honored only by hosts that support the Netlify/Cloudflare Pages convention; GitHub Pages does not apply custom response headers. The app intentionally remains `noindex` because its displayed data is illustrative. Do not use this static demo to collect or display real patient information.

For another host, configure HTTPS, the correct project base path (if any), SPA route fallback, and equivalent security headers there. The content security policy in `public/_headers` permits the current Unsplash demo images; remove that origin when replacing them with approved assets.

## Demo and production boundaries

This repository is a frontend demo, not a live healthcare service. The appointment journey lets a visitor choose a sample provider, date, time, and treatment interest, then saves that non-identifying demo selection in the current browser. The patient dashboard can display, reschedule, and cancel those local demo appointments; sample slots are checked for conflicts in that browser. Clearing browser storage removes them. Nothing is sent to a practice, no real slot is reserved, and the app does not send email or collect payment.

There is no authentication, authorization, backend, shared database, live scheduling integration, payment processor, or clinical-record service in this project. Browser storage is only for this non-PHI product demo; it is not a secure or shared patient record. Do not use it to collect real patient or health information, or present it as a production clinical system or as meeting HIPAA or other regulatory requirements.

Before a real-patient launch, the owner must select and configure approved identity, hosting, database, scheduling/EHR, communications, and payment providers; implement tenant isolation, access controls, audit logging, retention and incident-response policies; and complete applicable privacy, legal, security, accessibility, and clinical-safety reviews. The placeholder records and provider identities must be replaced with verified, consented data. No compliance or production-readiness claim is made by this repository.
