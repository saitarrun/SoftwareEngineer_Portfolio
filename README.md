# Software Engineer Portfolio

Full-stack portfolio showcasing 3+ years of experience building production-scale systems, ML models, and cloud infrastructure.

**Live:** https://saitarrun.dev | **GitHub:** https://github.com/saitarrun/SoftwareEngineer_Portfolio

## Features

✓ **Responsive Design**
- Mobile-first (375px+)
- Desktop optimized (1280px max-width)
- 2-3 column grids on desktop
- Full-width buttons on mobile

✓ **Performance**
- Vite build system
- Lazy-loaded 3D background
- Optimized animations
- <2.5s LCP target

✓ **Accessibility**
- WCAG 2.2 Level AA
- Keyboard navigation
- Screen reader support
- 44×44px touch targets

✓ **Security**
- OWASP Top 10 compliant
- Content Security Policy
- Input validation & rate limiting
- HTTPS enforced

✓ **SEO**
- Meta tags & Open Graph
- JSON-LD structured data
- Sitemap.xml & robots.txt

## Tech Stack

**Frontend:** React 18 + TypeScript + Tailwind CSS + Framer Motion + Three.js + Vite

**Deployment:** Vercel + GitHub + GitHub Actions

## Quick Start

```bash
# Install
npm install

# Develop
npm run dev     # http://localhost:5173

# Build
npm run build

# Preview
npm run preview
```

### Environment Setup

Create `.env.local`:
```bash
VITE_CONTACT_EMAIL=your-email@example.com
VITE_TURNSTILE_SITE_KEY=optional-captcha-key
VITE_ANALYTICS_ID=optional-analytics-id
```

See `.env.example` for template.

## Deployment

**Automatic (GitHub → Vercel):**
- Push to `main` → GitHub Actions → Production deployment
- Create PR → Preview deployment + automated checks

**Manual:**
```bash
vercel --prod
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full guide.

## Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide & troubleshooting
- [GITHUB_SETUP.md](./GITHUB_SETUP.md) - Branch protection & CI/CD
- [SECURITY.md](./SECURITY.md) - Security policy & practices
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Development workflow

## Performance Targets

| Metric | Target | Status |
|--------|--------|--------|
| Lighthouse Performance | 90+ | ✓ |
| Lighthouse Accessibility | 95+ | ✓ |
| LCP | <2.5s | ✓ |
| CLS | <0.1 | ✓ |

View live: [Vercel Analytics](https://vercel.com/dashboard) or [PageSpeed Insights](https://pagespeed.web.dev)

## Contributing

1. Fork or branch: `git checkout -b feature/your-feature`
2. Develop: `npm run dev`
3. Build: `npm run build`
4. Push & create PR
5. GitHub Actions runs checks
6. Merge after approval

See [GITHUB_SETUP.md](./GITHUB_SETUP.md) for branch protection rules.

## Development Commands

```bash
npm run dev         # Start dev server
npm run build       # Production build
npm run preview     # Preview build locally
npm audit           # Check security
npm audit fix       # Fix vulnerabilities
```

## File Structure

```
src/
  components/        # React components (Hero, Projects, Skills, etc.)
  utils/            # Validation, helpers
  three/            # 3D background
  index.css         # Global styles
public/
  sitemap.xml
  robots.txt
.github/
  workflows/
    deploy.yml      # CI/CD pipeline
```

## Customization

**Update content:**
- Hero: `src/components/Hero.tsx`
- Projects: `src/components/Projects.tsx`
- Experience: `src/components/Experience.tsx`
- Skills: `src/components/Skills.tsx`
- Contact: `src/components/Contact.tsx`

**Update colors:**
- Edit CSS variables in `src/index.css`
- Or update `tailwind.config.js`

**Update fonts:**
- Google Fonts in `index.html`
- Font family in `tailwind.config.js`

## Monitoring

- **Vercel Dashboard:** https://vercel.com/dashboard
- **GitHub Actions:** https://github.com/saitarrun/SoftwareEngineer_Portfolio/actions
- **Web Vitals:** Vercel Analytics

## Browser Support

Chrome, Firefox, Safari, Edge (latest versions)

## Troubleshooting

**Build fails:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Type errors:**
```bash
npx tsc --noEmit
```

**Performance issues:**
- Check Vercel Analytics → Web Vitals
- Run `npm run build` to see bundle size
- Profile in Chrome DevTools

See [DEPLOYMENT.md](./DEPLOYMENT.md) for more troubleshooting.

## License

MIT License - © 2026 Sai Tarrun Pitta

## Contact

- **Email:** saitarrunpitta@gmail.com
- **GitHub:** https://github.com/saitarrun
- **LinkedIn:** https://linkedin.com/in/saitarrunpitta

---

Built with ❤️ • Deployed on Vercel • Optimized for performance & accessibility

