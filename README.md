# Eslam - Mobile Applications Engineer Portfolio

Personal portfolio website built with vanilla HTML, CSS, and JavaScript.

## Live Site

https://deveslam1.github.io/

## Overview

This project is a static, single-page portfolio with anchored sections:
- Home
- Services
- Process
- Projects
- Skills
- Certificates
- Experience
- Contact

## Tech Stack

- HTML5
- CSS3 (custom properties, grid/flex layouts, animations)
- Vanilla JavaScript (filters, carousels, reveal effects, smooth section navigation)

## Key Features

- Responsive layout for desktop and mobile
- Project filtering and search
- Certificate filtering and carousel controls
- Interactive cards and reveal animations
- Sticky navigation with active-link scroll spy
- Floating "Hire Me" CTA linked to Contact section

## Recent Updates

- Fixed section navigation to `#contact` not stopping early.
- Improved anchor scrolling reliability on mobile by using native `scrollIntoView`.
- Removed section-level `content-visibility` optimization that caused incorrect long-distance anchor offsets.

## Run Locally

No build step is required.

1. Clone the repository.
2. Open `index.html` in your browser.

Optional local server:

```bash
python -m http.server 5500
```

Then open `http://localhost:5500`.

## Deploy

GitHub Pages deployment from the `main` branch:

```bash
git add .
git commit -m "docs: update README"
git push origin main
```

## Customize Content

Main content lives in:
- `index.html`
- `styles_improved.css`
- `script.js`
- `assets/Eslam_Mahmoud_CV.html` and `assets/Eslam_Mahmoud_CV.pdf`

Update profile information, project cards, links, and section copy directly in `index.html`; update the CV HTML source before regenerating the PDF.
