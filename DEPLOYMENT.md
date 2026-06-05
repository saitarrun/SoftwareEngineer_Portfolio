# Deployment Guide

Portfolio deployed on Vercel with GitHub integration.

## Deployment Architecture

```
GitHub (Repository)
  ↓
Pull Request → Preview Deployment
  ↓
Merge to main → Production Deployment (saitarrun.dev)
```

## Prerequisites

1. **Vercel Account** (Free tier sufficient)
   - Sign up: https://vercel.com/signup
   - Already connected to GitHub repository

2. **GitHub Repository**
   - Repository: https://github.com/saitarrun/SoftwareEngineer_Portfolio
   - Remote: `git remote -v`

3. **Environment Variables**
   - Set in Vercel Project Settings
   - Not committed to GitHub

## Environment Variables

### Required (Vercel Project Settings)

```
VITE_CONTACT_EMAIL=your-email@example.com
```

### Optional (CAPTCHA)

```
VITE_TURNSTILE_SITE_KEY=your-turnstile-key
```

### Analytics (Optional)

```
VITE_ANALYTICS_ID=your-analytics-id
```

**Setup in Vercel:**

1. Project Settings → Environment Variables
2. Add variable name and value
3. Select environments (Development, Preview, Production)
4. Save

## Branch Protection

GitHub branch `main` is protected:

- ✓ Require status checks to pass
- ✓ Require code reviews (optional)
- ✓ Dismiss stale review approvals
- ✓ Require branches to be up to date

**Setup (if needed):**

1. GitHub → Settings → Branches
2. Add rule for `main`
3. Enable protection options

## Deployment Workflow

### Development

```bash
git checkout -b feature/your-feature
# Make changes
npm run dev  # Test locally
npm run build  # Verify build
git push origin feature/your-feature
```

### Pull Request (Preview)

1. Create PR on GitHub
2. Vercel automatically deploys preview
3. Preview URL posted as comment
4. Test changes at preview URL
5. Request review (optional)

### Production (Main)

```bash
# After PR approved & merged to main
git push origin main  # Automatically triggers deploy
# Production live at saitarrun.dev
```

## Custom Domain Setup

Current: https://saitarrun.dev (configured)

**To change domain:**

1. Vercel → Project Settings → Domains
2. Add new domain
3. Update DNS records (provided by Vercel)
4. Wait for DNS propagation (~24-48 hours)

## HTTPS & Security

✓ HTTPS enforced (Vercel automatic)
✓ HSTS header set (31536000s max-age)
✓ CSP configured (vercel.json)
✓ Security headers implemented

**Verify:**

```bash
curl -I https://saitarrun.dev
# Check for Strict-Transport-Security header
```

## Analytics

Optional: Add analytics to track visitors

**Google Analytics (if enabled):**

1. Create account: https://analytics.google.com
2. Get tracking ID
3. Set VITE_ANALYTICS_ID in Vercel env vars
4. Reference in code: `window.gtag` (if implemented)

**Vercel Analytics:**

- Available in Project → Analytics
- No configuration needed
- Free tier: 1,000 events/month

## Monitoring

**Vercel Dashboard:**

- https://vercel.com/dashboard
- Deployment history
- Build logs
- Performance metrics
- Error tracking

**Deployment Logs:**

1. Vercel Dashboard → Project
2. Deployments tab
3. Select deployment → View logs

**Errors:**

- Check Vercel build logs
- Run `npm run build` locally to reproduce
- Review error message + line numbers

## Performance Monitoring

**Web Vitals:**

- Vercel Analytics → Web Vitals
- Tracks LCP, CLS, INP
- Real user monitoring

**Local Testing:**

```bash
npm run build
npm run preview  # Test production build locally
```

## Rollback

If production breaks:

1. **Immediate:** Previous deployment auto-available
2. **Via Vercel Dashboard:**
   - Deployments → Right-click deployment
   - "Promote to Production"
3. **Via Git:**
   - `git revert <commit-hash>`
   - `git push origin main`

## CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/deploy.yml`):

1. **On Push/PR to main:**
   - Checkout code
   - Install dependencies
   - Type check & build
   - Deploy to Vercel

2. **Secrets Required:**
   - `VERCEL_TOKEN` (personal access token)
   - `VERCEL_ORG_ID` (organization ID)
   - `VERCEL_PROJECT_ID` (project ID)

**Setup Secrets (GitHub):**

1. GitHub → Settings → Secrets → Actions
2. Add:
   - VERCEL_TOKEN (from https://vercel.com/account/tokens)
   - VERCEL_ORG_ID (from Vercel Project Settings)
   - VERCEL_PROJECT_ID (from Vercel Project Settings)

## Troubleshooting

### Build Fails

```bash
# 1. Check locally
npm run build

# 2. Clear cache
rm -rf node_modules package-lock.json
npm install
npm run build

# 3. Check Vercel logs for specific errors
```

### Environment Variables Not Loading

```bash
# Verify in Vercel
vercel env ls

# Check in code
console.log(import.meta.env.VITE_CONTACT_EMAIL)  # Should not be empty
```

### HTTPS Not Working

```bash
# Verify via curl
curl -I https://saitarrun.dev

# Should show:
# HTTP/2 200
# Strict-Transport-Security: max-age=31536000
```

### Deployment URL Not Updating

1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Clear browser cache
3. Wait 5-10 minutes for CDN propagation

## Maintenance

**Weekly:**

- Monitor Vercel Analytics for errors
- Check Web Vitals scores

**Monthly:**

- Review deployment logs
- Check for security updates: `npm audit`
- Update dependencies: `npm update`

**Quarterly:**

- Review performance metrics
- Analyze user analytics
- Plan feature updates

## Disaster Recovery

**If main branch issues:**

1. Create hotfix branch
2. Fix issue
3. PR to main
4. Merge & deploy

**If domain issues:**

1. Temporarily point to Vercel URL
2. Update DNS to fallback
3. Fix configuration
4. Restore custom domain

**Backups:**

- GitHub: All code versioned
- Vercel: Automatic snapshots
- Environment: Documented in `DEPLOYMENT.md`

## Support

**Vercel Docs:** https://vercel.com/docs
**GitHub Docs:** https://docs.github.com
**Contact:** saitarrunpitta@gmail.com
