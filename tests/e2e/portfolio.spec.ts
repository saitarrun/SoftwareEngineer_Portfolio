import { test, expect } from '@playwright/test';

test.describe('Portfolio – page load and metadata', () => {
  test('has correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Sai Tarrun Pitta/);
  });

  test('has correct Open Graph meta tags', async ({ page }) => {
    await page.goto('/');
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /Sai Tarrun Pitta/);
    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveAttribute('content', /og-image\.png/);
  });
});

test.describe('Portfolio – navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('navbar is visible with logo and name', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    await expect(nav).toContainText('Sai Tarrun Pitta');
  });

  test('navbar contains section links', async ({ page }) => {
    for (const link of ['Experience', 'Projects', 'Skills', 'Contact']) {
      await expect(page.locator('nav').getByText(link, { exact: true }).first()).toBeVisible();
    }
  });

  test('Resume button is present in navbar', async ({ page }) => {
    await expect(page.locator('nav').getByText('Resume')).toBeVisible();
  });

  test('section anchor links have correct hrefs', async ({ page }) => {
    const links = ['experience', 'projects', 'skills', 'contact'];
    for (const id of links) {
      await expect(page.locator(`nav a[href="#${id}"]`).first()).toBeAttached();
    }
  });
});

test.describe('Portfolio – Hero section', () => {
  test('hero contains engineer name', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText(/Sai/i).first()).toBeVisible({ timeout: 10_000 });
  });

  test('chat FAB button is visible on the page', async ({ page }) => {
    await page.goto('/');
    const fab = page.getByLabel(/open chat/i);
    await expect(fab).toBeVisible({ timeout: 5_000 });
  });
});

test.describe('Portfolio – Experience section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('#experience').scrollIntoViewIfNeeded();
  });

  test('Experience heading is present', async ({ page }) => {
    await expect(page.locator('#experience')).toBeVisible({ timeout: 8_000 });
  });

  test('Pacific Life experience card is visible', async ({ page }) => {
    await expect(page.locator('#experience').getByText('Pacific Life')).toBeVisible({
      timeout: 8_000,
    });
  });

  test('CSUF software developer experience card is visible', async ({ page }) => {
    await expect(
      page.locator('#experience').getByText('California State University, Fullerton')
    ).toBeVisible({ timeout: 8_000 });
  });

  test('Uber experience card is visible', async ({ page }) => {
    await expect(page.locator('#experience').getByRole('heading', { name: 'Uber' })).toBeVisible({
      timeout: 8_000,
    });
  });

  test('Cognizant experience card is visible', async ({ page }) => {
    await expect(page.locator('#experience').getByText('Cognizant')).toBeVisible({
      timeout: 8_000,
    });
  });
});

test.describe('Portfolio – Projects section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('#projects').scrollIntoViewIfNeeded();
  });

  test('Projects section is present', async ({ page }) => {
    await expect(page.locator('#projects')).toBeVisible({ timeout: 8_000 });
  });

  test('Semantic Code Intelligence project is listed', async ({ page }) => {
    await expect(
      page.locator('#projects').getByText('Semantic Code Intelligence Platform')
    ).toBeVisible({
      timeout: 8_000,
    });
  });

  test('Open-SWE contribution project is listed', async ({ page }) => {
    await expect(
      page.locator('#projects').getByText('Open-SWE Open-Source Contributor')
    ).toBeVisible({
      timeout: 8_000,
    });
  });

  test('project GitHub links are present', async ({ page }) => {
    const githubLinks = page.locator('#projects a[href*="github.com"]');
    await expect(githubLinks.first()).toBeAttached({ timeout: 8_000 });
  });
});

test.describe('Portfolio – Skills section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('#skills').scrollIntoViewIfNeeded();
  });

  test('Skills section is present', async ({ page }) => {
    await expect(page.locator('#skills')).toBeVisible({ timeout: 8_000 });
  });

  test('key technologies are listed', async ({ page }) => {
    for (const tech of ['Python', 'React.js', 'AWS', 'Docker']) {
      await expect(page.getByText(tech, { exact: true }).first()).toBeVisible({ timeout: 8_000 });
    }
  });
});

test.describe('Portfolio – Education section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('#education').scrollIntoViewIfNeeded();
  });

  test('Education section is present', async ({ page }) => {
    await expect(page.locator('#education')).toBeVisible({ timeout: 8_000 });
  });

  test('Cal State Fullerton is listed', async ({ page }) => {
    await expect(
      page.locator('#education').getByText(/California State University|Cal State Fullerton/i)
    ).toBeVisible({ timeout: 8_000 });
  });

  test('GITAM bachelor degree is listed', async ({ page }) => {
    await expect(page.locator('#education').getByText('GITAM University')).toBeVisible({
      timeout: 8_000,
    });
    await expect(
      page.locator('#education').getByText('Bachelor of Technology in Computer Science')
    ).toBeVisible({ timeout: 8_000 });
    await expect(
      page
        .locator('#education')
        .getByText(/Software Engineering Fundamentals.*Database Management Systems/)
    ).toBeVisible({ timeout: 8_000 });
  });
});

test.describe('Portfolio – Contact section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('#contact').scrollIntoViewIfNeeded();
  });

  test('Contact section is present', async ({ page }) => {
    await expect(page.locator('#contact')).toBeVisible({ timeout: 8_000 });
  });
});
