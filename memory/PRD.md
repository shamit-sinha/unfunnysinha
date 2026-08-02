# FrameCraft - Filmmaking Workshop Website PRD

## Problem Statement
Create a complete modern, premium, minimal multi-page website for an online course brand (Filmmaking Workshop) with warm beige accent, email integration, and single price point.

## Architecture
- **Frontend**: React 19 + React Router + Tailwind CSS + Shadcn UI
- **Backend**: FastAPI + MongoDB + Resend (email service)
- **Design**: Playfair Display headings + Inter body font, warm beige (#C6A87C) accent

## User Personas
- Aspiring filmmakers looking for professional training
- Content creators wanting cinematic quality
- Photographers transitioning to motion

## Core Requirements
- [x] Multi-page website (Home, About, Course, Contact, Blog)
- [x] Premium minimal design with warm beige accent
- [x] Contact form with Resend email integration
- [x] Blog articles from MongoDB (seeded)
- [x] Course page with modules, pricing, FAQ, 1-on-1 call section
- [x] About page as portfolio/projects showcase
- [x] Smooth scroll animations
- [x] Responsive design (mobile, tablet, desktop)
- [x] Sticky glassmorphism navigation
- [x] Social proof and conversion elements

## What's Been Implemented (April 15, 2026)
- Complete 5-page website (Home, About, Course, Contact, Blog)
- FastAPI backend with contact form API + blog articles API
- Resend email integration for contact form
- 6 seeded blog articles
- Accordion-based course modules and FAQ
- 1-on-1 mentoring call section on course page
- Single pricing at $497
- Scroll animations (fade-in-up, slide-in-left, scale-in, stagger children)
- Mobile responsive navigation with hamburger menu

## Prioritized Backlog
### P0 (Critical)
- None remaining

### P1 (Important)
- Add actual payment integration (Stripe) for course enrollment
- Blog article detail page (individual article view)
- CMS/admin panel for blog article management

### P2 (Nice to have)
- Newsletter signup
- Video embed for course preview
- Student count live counter animation
- SEO meta tags for each page
- Booking system for 1-on-1 calls (Calendly integration)

## Next Tasks
1. Replace placeholder images with actual photos
2. Add Stripe payment for course enrollment
3. Create blog article detail pages
4. Add Calendly integration for 1-on-1 call booking
5. SEO optimization and meta tags
