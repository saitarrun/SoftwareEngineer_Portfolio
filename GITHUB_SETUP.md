# GitHub Repository Setup

Production-ready GitHub configuration for deployment automation.

## Branch Protection Rules

**Protect `main` branch:**

1. GitHub → Settings → Branches
2. Add rule for branch name pattern: `main`
3. Enable:
   - ✓ Require a pull request before merging
   - ✓ Require status checks to pass before merging
   - ✓ Require branches to be up to date before merging
   - ✓ Require code reviews before merging (optional, 1 reviewer)
   - ✓ Dismiss stale pull request approvals

This prevents:

- Direct commits to main
- Merging without passing CI
- Merging without review (optional)

## Pull Request Workflow

**Feature Development:**

```bash
# 1. Create feature branch
git checkout -b feature/your-feature

# 2. Make changes
# ... code ...

# 3. Commit changes
git add .
git commit -m "feat: describe your feature"

# 4. Push to GitHub
git push origin feature/your-feature

# 5. Create Pull Request on GitHub
# - Title: concise description
# - Description: explain changes, testing notes
# - Link any related issues
```

**PR Checklist (template in repo):**

- [ ] Tests pass locally (`npm run build`)
- [ ] No new warnings/errors
- [ ] Updated documentation (if needed)
- [ ] Security review (no secrets committed)
- [ ] Accessibility verified (if UI changes)

**Review & Merge:**

1. GitHub automatically runs CI checks
2. Reviewer approves PR (if required)
3. All checks pass
4. Click "Merge pull request"
5. Delete feature branch (optional)

## CI/CD Pipeline

Automated via GitHub Actions (`.github/workflows/deploy.yml`):

**On PR:**

- Build check
- Type check
- Generate preview deployment

**On Merge to main:**

- Build check
- Type check
- Deploy to production

**Status Badges:**
Add to README.md:

```markdown
[![Deploy Status](https://github.com/saitarrun/SoftwareEngineer_Portfolio/workflows/Deploy%20to%20Vercel/badge.svg)](https://github.com/saitarrun/SoftwareEngineer_Portfolio/actions)
```

## Secrets Management

**GitHub Secrets (for CI/CD):**

Settings → Secrets and variables → Actions

Required secrets:

- `VERCEL_TOKEN` - Vercel personal access token
- `VERCEL_ORG_ID` - Vercel organization ID
- `VERCEL_PROJECT_ID` - Vercel project ID

Optional secrets:

- `VITE_CONTACT_EMAIL` - Contact form email
- `VITE_TURNSTILE_SITE_KEY` - CAPTCHA key

**Never commit:**

- `.env.local` files
- API keys
- Credentials
- Secrets

Use `.gitignore` to prevent accidental commits.

## GitHub Actions

**Workflow file:** `.github/workflows/deploy.yml`

Features:

- Runs on push to main and PRs
- Type checks with TypeScript
- Builds production bundle
- Deploys to Vercel
- Posts deployment URLs as PR comments

**View workflow runs:**

1. GitHub → Actions
2. Select "Deploy to Vercel"
3. Click run to see logs

## Code Review

**Best Practices:**

1. **Clear PR Descriptions:**
   - What changed
   - Why it changed
   - How to test
   - Related issues

2. **Focused PRs:**
   - Single feature per PR
   - Easier to review
   - Faster to merge

3. **Meaningful Commits:**
   - Clear commit messages
   - Logical grouping
   - Squash if needed

4. **Testing:**
   - Test locally before PR
   - Verify in preview deployment
   - Check error logs

## Dependency Management

**Dependabot:** (`.github/dependabot.yml`)

- Automatic updates weekly
- Security patches as needed
- Auto-creates PRs
- Run tests before merging

**Manual updates:**

```bash
npm update              # Update to latest versions
npm audit fix          # Fix security vulnerabilities
```

## Labels & Issues

**Suggested labels:**

- `bug` - Bug reports
- `feature` - Feature requests
- `enhancement` - Improvements
- `documentation` - Docs updates
- `performance` - Performance improvements
- `security` - Security fixes

## Releases

**Create a release:**

1. GitHub → Releases → Draft a new release
2. Choose tag: v1.0.0 (semantic versioning)
3. Release notes: describe changes
4. Publish release

Vercel automatically creates release deployment.

## Monitoring

**GitHub:**

- Actions → View workflow runs
- Check build/deploy status
- Review PR checks

**Vercel:**

- Dashboard → Deployments
- Monitor production deployment
- Check Web Vitals
- Review error logs

## Collaboration

**Add team members:**

1. GitHub → Settings → Collaborators
2. Add username
3. Grant appropriate role:
   - Maintain: merge PRs, manage branches
   - Write: push changes
   - Read: view only

## Documentation

Maintain these files:

- `README.md` - Project overview
- `DEPLOYMENT.md` - Deployment guide
- `SECURITY.md` - Security policy
- `CONTRIBUTING.md` - Contributing guidelines
- `.github/PULL_REQUEST_TEMPLATE.md` - PR template

## Security

**Best Practices:**

- ✓ Branch protection enabled
- ✓ Status checks required
- ✓ No direct commits to main
- ✓ Secrets not in code
- ✓ Dependabot security updates
- ✓ Code reviews (optional)

**Audit:**

```bash
npm audit
npm audit fix
```

## Troubleshooting

**Workflow not triggering:**

- Check `.github/workflows/*.yml` syntax
- Verify branch name matches
- Check GitHub Actions enabled

**PR checks failing:**

- Run `npm run build` locally
- Check Vercel deploy logs
- Review GitHub Actions output

**Secrets not working:**

- Verify secret name matches env var
- Re-create secret if needed
- Check Vercel env vars separately
