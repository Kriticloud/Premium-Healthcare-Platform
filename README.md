# SmileOS dental care platform preview

SmileOS is a React and Vite frontend prototype for exploring a dental care experience: provider discovery, appointment scheduling, treatment timelines, records, and payment dashboards.

## Run locally

Requirements: Node.js 20 or later and npm.

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Demo and production boundaries

This repository is a frontend preview, not a live healthcare service. Provider profiles, reviews, appointments, clinical records, and financial details shown in the UI are sample data. The appointment journey is an interactive preview only: it does not reserve a slot, contact a practice, persist entered details, send email, or collect payment. Use fictional contact details when trying it.

There is no authentication, authorization, backend, database, scheduling integration, payment processor, or clinical-record service in this project. Do not use it to collect real patient or health information, or present it as a production clinical system or as meeting HIPAA or other regulatory requirements. Before using with real patients or payments, the application needs a properly secured backend and integrations, privacy and security review, accessibility and operational testing, and the applicable legal and compliance work.

The production build currently remains marked `noindex` so this sample-data prototype is not indexed as a live healthcare service.
