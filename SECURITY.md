# Security Policy

This document outlines security practices and policies for the Engineer Portfolio.

## Security Headers

The site implements security headers via `vercel.json`:

- **Strict-Transport-Security** (HSTS): Forces HTTPS, preload for maximum security
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **X-Frame-Options**: Prevents clickjacking (DENY)
- **X-XSS-Protection**: XSS protection for older browsers
- **Referrer-Policy**: Controls referrer information leakage
- **Permissions-Policy**: Disables geolocation, microphone, camera
- **Content-Security-Policy**: Restricts resource loading to trusted sources

## Input Validation

All user inputs are validated using `src/utils/validation.ts`:

- **Email**: Regex validation + length check (max 254 chars)
- **Name**: Alphanumeric, spaces, hyphens, apostrophes only (2-100 chars)
- **Message**: Length validation (10-5000 chars)
- **Sanitization**: Removes angle brackets, limits string length

## Rate Limiting

Contact form implements client-side rate limiting:

- Max 3 submission attempts per 60 seconds
- Prevents spam and DOS attacks
- Enforced per IP (in production)

## Dependencies

Security vulnerabilities are checked regularly:

```bash
npm audit
npm audit fix
```

Current vulnerabilities in production dependencies are tracked and updated.

## Environment Variables

**Never commit secrets to GitHub.**

Use `.env.local` (not committed) for:

- `VITE_CONTACT_EMAIL`: Contact form destination
- `VITE_TURNSTILE_SITE_KEY`: CAPTCHA key (optional)

See `.env.example` for template.

## HTTPS Enforcement

Site requires HTTPS (enforced via Vercel + HSTS header).

Redirect from HTTP to HTTPS is automatic on Vercel.

## Content Security Policy

CSP allows only:

- Scripts: Self, unsafe-inline (Framer Motion), LinkedIn embed, Turnstile
- Styles: Self, unsafe-inline, Google Fonts
- Fonts: Self, Google Fonts
- Images: Self, data URIs, HTTPS
- Frames: LinkedIn, Turnstile (for CAPTCHA)
- XHR: Self, Turnstile API

## XSS Prevention

- No `dangerouslySetInnerHTML` used
- All user input sanitized before display
- SVG icons from trusted library (Lucide)
- Third-party scripts (LinkedIn, Turnstile) loaded safely

## CSRF Protection

Contact form uses SOP (Same-Origin Policy) for CSRF protection.

If API endpoint implemented, add CSRF tokens.

## Data Privacy

- No cookies set by default
- No third-party analytics (optional)
- LinkedIn embed loads per their privacy policy
- Contact form data not stored (direct email)

## Reporting Security Issues

Found a vulnerability? **Do not open a public issue.**

Contact: saitarrunpitta@gmail.com

Include:

- Type of vulnerability
- Location in code
- Steps to reproduce
- Impact assessment

We'll investigate and respond within 48 hours.

## Compliance

✓ OWASP Top 10
✓ WCAG 2.2 Accessibility
✓ GDPR-ready (no data collection)
✓ Content Security Policy Level 3
