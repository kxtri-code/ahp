# Asia Highland Partners

A responsive, animated website for Asia Highland Partners, including the signature Arise Nagaland event experience and a volunteer registration journey.

The homepage opens with the supplied AHP logo reveal and transitions to the client-provided outreach map. The homepage story, mission model, country focus, founder profile and journal use the supplied field photography. Arise Nagaland has its own reveal and a full-screen, web-optimised version of the supplied event film.

## Pages

- `/` — Asia Highland Partners home page
- `/arise-nagaland` — Arise Nagaland event page with a video-led hero
- `/arise-register` — Arise Nagaland event registration and confirmation
- `/join` — Join the Movement volunteer form with downloadable ID card
- `/team` — Team gallery with individual profile views
- `/blog` — Demo journal with featured stories and article views
- `/our-story` — Month-by-month story archive
- `/cms` — Demo content manager for pages, people, posts, stories and registrations

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deployment

The project is ready for Vercel. Import the repository, keep the detected Vite settings, and deploy. The included `vercel.json` preserves direct access to all page routes.

## Content manager and forms

The demo content manager password is `ahp2026`. It can manage:

- Homepage map, headings, story, founder profile, mission cards and country photography
- AHP and Arise video asset URLs, event dates, venue and registration status
- Team profiles, blog posts, publish/draft status and monthly story entries
- Volunteer applications and Arise registrations
- Image uploads, JSON backup/import and registration exports

Content, uploaded images, volunteer applications and Arise registrations are saved in the current browser's local storage. This makes the Vercel demo fully interactive without third-party credentials. For production, connect the forms and content manager to authenticated cloud storage (for example Supabase) so updates and registrations are shared across devices and administrators.

## Technology

React, Vite, Framer Motion and Lucide icons.
