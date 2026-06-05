# Code Quality Standards

Automated code quality checks ensure consistency and maintainability.

## Tools

- **TypeScript** - Static type checking
- **ESLint** - Code linting (unused vars, best practices)
- **Prettier** - Code formatting (consistency)
- **Husky** - Git hooks (pre-commit checks)
- **Lint-staged** - Run checks on staged files

## Pre-commit Hooks

Automatically runs on `git commit`:

1. ESLint fix (auto-fix issues)
2. Prettier format (auto-format code)
3. Type checking (if configured)

Commit fails if checks fail → fix issues → retry commit

## Manual Checks

### Type Check

```bash
npm run type-check
# or
npx tsc --noEmit
```

Verify TypeScript compiles without errors.

### Linting

```bash
npm run lint              # Check for issues
npm run lint:fix         # Auto-fix issues
```

ESLint checks:

- Unused variables (error)
- Unused imports (error)
- No explicit `any` (warning)
- No `console.log` in production (warning)
- No `debugger` statements (error)
- Prefer `const` over `let` (error)
- No `var` keyword (error)

### Formatting

```bash
npm run format           # Format all files
npm run format:check    # Check formatting without changes
```

Prettier enforces:

- 2-space indentation
- Single quotes
- Semicolons
- Line length 100 chars
- Trailing commas (ES5)

### Full Check

```bash
npm run check  # Type check + lint + format check + build
```

This is what CI runs before deploying.

## Configuration Files

### `.eslintrc.json`

ESLint configuration:

- TypeScript parser
- React/JSX support
- Recommended rules + custom overrides
- Prettier integration (no conflicts)

**Key rules:**

- Unused variables error (allow `_prefixed`)
- No `any` types (warning)
- No console in production
- Strict mode

### `.prettierrc.json`

Prettier formatting:

- 2-space indentation
- Single quotes
- Line width 100 chars
- Trailing commas (ES5)
- Unix line endings (LF)

### `.lintstagedrc.json`

Husky hook configuration:

- TS/TSX files: eslint --fix + prettier
- JSON/MD/CSS: prettier only

## GitHub Actions Integration

CI pipeline runs checks:

```yaml
- Type check
- ESLint (no auto-fix)
- Prettier check
- Build verification
```

All must pass before merge to main.

**PR blocked if:**

- TypeScript compilation fails
- ESLint finds errors
- Prettier format mismatch
- Build fails

## Workflow

**Development:**

```bash
# 1. Make changes
vim src/components/Hero.tsx

# 2. Stage changes
git add src/components/Hero.tsx

# 3. Commit (automatic checks run)
git commit -m "feat: update hero section"
# → Pre-commit hook runs eslint + prettier
# → If errors, commit fails
# → Fix errors and retry

# 4. Push to GitHub
git push origin feature/your-feature
# → CI runs full check suite
# → If errors, PR marked as failed
# → Update code and push again
```

**Optional: Manual pre-commit checks:**

```bash
# Run all checks before committing
npm run check

# If this passes, commit will definitely pass
```

## Fixing Issues

**ESLint errors:**

```bash
# Auto-fix many issues
npm run lint:fix

# Review remaining errors
npm run lint

# Common fixes:
# - Remove unused variables
# - Fix typos
# - Follow naming conventions
```

**Prettier format issues:**

```bash
# Auto-format all files
npm run format

# Or let pre-commit handle it
git commit  # Prettier will auto-fix
```

**TypeScript errors:**

```bash
npm run type-check

# Common fixes:
# - Add type annotations
# - Fix type mismatches
# - Import missing types
```

## Bypass Checks (Avoid!)

**Skip pre-commit hooks** (not recommended):

```bash
git commit --no-verify
```

This skips Husky checks but CI will still fail.

**Better approach:**

- Fix issues locally
- Let pre-commit help with auto-fixes
- Understand and fix remaining issues

## IDE Integration

### VS Code

Install extensions:

- ESLint
- Prettier

Add to `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

This auto-formats on save + fixes ESLint issues.

### Other IDEs

- **WebStorm:** Built-in ESLint & Prettier support
- **Vim:** Install ESLint & Prettier plugins
- **Sublime:** Install ESLint & Prettier plugins

## CI/CD Pipeline

GitHub Actions runs:

```yaml
- npm run type-check
- npm run lint # No auto-fix in CI
- npm run format:check # No auto-fix in CI
- npm run build
```

**Why no auto-fix in CI?**

- Forces developers to run checks locally
- Prevents auto-fixes hiding issues
- Ensures all developers use same tools

## Best Practices

1. **Run checks before pushing:**

   ```bash
   npm run check
   ```

2. **Enable IDE auto-format on save** (VS Code guide above)

3. **Review auto-fixes:**

   ```bash
   npm run lint:fix
   git diff  # Review changes
   git add .
   git commit
   ```

4. **Understand error messages:**
   - Read ESLint output
   - Fix root cause, not symptom
   - Learn from warnings

5. **Keep config updated:**
   - Review rules periodically
   - Update tools regularly
   - Adjust rules if needed

## Troubleshooting

**Pre-commit hook not running:**

```bash
# Re-install Husky
npx husky install

# Verify hook exists
ls -la .husky/pre-commit
```

**ESLint/Prettier mismatch:**

```bash
# Should not happen with eslint-config-prettier
# But if it does, reinstall:
npm install -D eslint-config-prettier
```

**CI passes locally but fails in GitHub:**

```bash
# Different Node version? Different npm version?
# Run:
node --version
npm --version

# GitHub Actions uses Node 20, check locally too
```

## Performance

Typical check times:

- Type check: 2-3 seconds
- ESLint: 1-2 seconds
- Prettier: <1 second
- Build: 2-3 seconds
- **Total: ~6-9 seconds**

Pre-commit hooks usually run <2 seconds (only changed files).

## Future Improvements

Possible additions:

- Unit tests (Jest)
- E2E tests (Playwright)
- Coverage reporting
- Performance benchmarking
- Accessibility testing

For now, focus on code quality + type safety.
