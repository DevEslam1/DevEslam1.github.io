# Eslam — Mobile Applications Engineer Portfolio

A premium, dark-themed personal portfolio website built with **vanilla HTML, CSS, and JavaScript** — zero dependencies, instant GitHub Pages deployment.

## 🚀 Live Site

[https://deveslam1.github.io/](https://deveslam1.github.io/)

## 📄 Pages

| Page | Description |
|---|---|
| **Home** | Hero with availability badge, CTA buttons, and floating tech labels |
| **Projects** | Filterable project showcase with featured cards and archive grid |
| **Stack (Skills)** | Technical competencies, development lifecycle, core stack highlight |
| **Certificates** | Searchable certificate grid with featured credential |
| **Experience** | Vertical timeline covering the learning journey + career highlights sidebar |
| **Contact** | Contact form with validation, FAQ section, and social links |

## 🎨 Design System

**Midnight Tech** theme:
- **Colors**: True-black background (`#0a0a0a`), Electric Blue (`#adc6ff`) + Cyan (`#44e2cd`) + Purple (`#ddb7ff`) accents
- **Typography**: Space Grotesk (headlines) + Inter (body)
- **Effects**: Glassmorphism panels, ambient glow orbs, gradient text, pulsing availability badge
- **Layout**: 1200px max-width container, 8px base spacing unit

## 🛠 Tech Stack

- **HTML5** — Semantic markup, ARIA roles, Open Graph meta tags
- **CSS3** — CSS Custom Properties, Grid, Flexbox, animations, IntersectionObserver transitions
- **Vanilla JS** — Hash-based SPA router, filter chips, live search, form validation

## 📦 Deployment

This is a static site — just push to `main` on `Eslam.github.io` and GitHub Pages serves it automatically.

```bash
git add .
git commit -m "feat: production portfolio site"
git push origin main
```

## ✏️ Customization

Update the following in `index.html` to personalize:
- Your **name**, **email**, **GitHub/LinkedIn/Twitter** links
- Project titles, descriptions, and tech stacks
- Certificate names, issuers, and years
- Timeline entries and career highlights
- Contact details (location, handles)

To integrate a real contact form, replace the `setTimeout` in `script.js` with a [Formspree](https://formspree.io/) fetch call:

```js
const res = await fetch('https://formspree.io/f/YOUR_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, subject, message })
});
```
