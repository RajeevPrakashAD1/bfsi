# RivalEdge Ventures — Product Requirements & Build Log

## Original Problem Statement
Build a landing page/website for RivalEdge Ventures — a premium BFSI (Banking, Financial Services, Insurance) training and placement institute based in Patna, Bihar. The site must include a kinetic hero, About Us page, Programs/Courses section, Our Team image cards, Apply Now form with resume upload, Contact form, footer with company info and social icons, Excel export for admin, Privacy/Terms pages, and email notifications on form submission. Design: premium deep-navy + white + gold. Deliver an Awwwards-level design with framer-motion + lenis smooth scrolling.

## Architecture
- **Frontend**: React (CRA) + TailwindCSS + framer-motion + lenis + react-fast-marquee + shadcn/ui
- **Backend**: FastAPI (Python) + Motor (MongoDB async) + openpyxl (Excel) + httpx
- **Database**: MongoDB (collections: `applications`, `contact_messages`)
- **Email**: Emergent-managed Resend proxy (POST to integrations.emergentagent.com)
- **Auth**: JWT-based admin login (24h TTL)
- **File uploads**: /app/backend/uploads (uuid-named, .pdf/.doc/.docx/.rtf, ≤ 5MB)

## User Personas
1. **Prospective student** — visits landing, browses programs, applies via Apply Now form.
2. **General visitor** — reads About, uses Contact form, checks legal pages.
3. **Admin (RivalEdge staff)** — logs in at /admin, reviews applications & contacts, exports Excel.

## Core Requirements (static)
- Deep navy (#0A1128) + white + gold (#D4AF37) palette, Playfair Display + Outfit fonts
- Kinetic hero with masked line-by-line reveal
- Editorial marquee, numbered manifesto chapters
- 6 program cards + 5 team cards (Director/CEO/HR/Telecaller/DigiMktg)
- Working Apply Now (with resume) and Contact forms
- Email confirmation to admin + user via Resend
- Admin JWT login + dashboard + Excel export
- Complete footer (phone, email, location, socials, legal links, © 2026)
- Framer-motion scroll reveals + lenis smooth scrolling

## What's been implemented (2026-12)
- ✅ Backend: /api/contact, /api/applications (multipart+file), /api/admin/login, /api/admin/applications, /api/admin/contacts, /api/admin/applications/export
- ✅ Resend email integration (branded HTML wrapper) for both admin + user confirmations
- ✅ JWT admin auth with token store in localStorage
- ✅ Excel export via openpyxl with attachment headers
- ✅ Landing page: Navbar, Hero, Editorial Marquee, About Intro, Programs (6 cards), Partners Strip, Team (5 cards), Apply Form, Contact, Footer
- ✅ Routes: /, /about, /privacy, /terms, /admin/login, /admin
- ✅ Lenis smooth momentum scrolling + framer-motion reveals + micro-interactions
- ✅ Testing agent: 17/17 backend + all frontend flows passed (iteration_1.json)

## Prioritized backlog (P0/P1/P2)
- **P1** Add signed-download admin endpoint so HR can retrieve uploaded resumes from dashboard
- **P1** Hash ADMIN_PASSWORD with bcrypt (bcrypt already imported)
- **P2** Move email sends to FastAPI BackgroundTasks (non-blocking)
- **P2** Add SEO meta tags per route, sitemap.xml, OpenGraph images
- **P2** Add real photos/names/bios once client provides team details
- **P2** Add course details pages (currently cards only)
- **P2** Add testimonials / student wins section
- **P2** Add favicon + branded 404 page

## Next tasks list
- Wait for client-provided team photos/names, real courses & fees
- Add analytics (GA4 / Plausible)
- Deploy and configure production env vars
