// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Website Core Functionality', () => {
  test('homepage should load correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle(/Thockverse/);
    
    // Check main header exists
    await expect(page.locator('header')).toBeVisible();
    
    // Check footer exists
    await expect(page.locator('footer')).toBeVisible();
    
    // Check main content loads
    await expect(page.locator('main')).toBeVisible();
  });

  test('navigation should work correctly', async ({ page }) => {
    await page.goto('/');
    
    // Test navigation links
    const navLinks = [
      { text: 'Switches', href: '/switches' },
      { text: 'Keyboards', href: '/keyboards' },
      { text: 'Tutorials', href: '/tutorials' },
      { text: 'News', href: '/news' },
      { text: 'About', href: '/about' }
    ];

    for (const link of navLinks) {
      // Click the navigation link
      await page.locator(`nav a:has-text("${link.text}")`).click();
      
      // Wait for navigation
      await page.waitForURL(`**${link.href}**`);
      
      // Verify we're on the correct page
      expect(page.url()).toContain(link.href);
      
      // Verify page loads without errors
      await expect(page.locator('main')).toBeVisible();
      
      // Go back to home
      await page.goto('/');
    }
  });

  test('should have no 404 errors on main pages', async ({ page }) => {
    const pages = ['/', '/switches', '/keyboards', '/tutorials', '/news', '/about', '/contact', '/privacy'];
    
    for (const pagePath of pages) {
      const response = await page.goto(pagePath);
      expect(response?.status()).toBe(200);
      
      // Should not show 404 error content
      const content = await page.textContent('body');
      expect(content).not.toContain('404');
      expect(content).not.toContain('Page Not Found');
    }
  });

  test('header should be responsive', async ({ page }) => {
    await page.goto('/');
    
    // Desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    const desktopNav = page.locator('nav.hidden.md\\:flex');
    await expect(desktopNav).toBeVisible();
    
    // Mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileButton = page.locator('#mobile-menu-button');
    await expect(mobileButton).toBeVisible();
  });

  test('search functionality should exist', async ({ page }) => {
    await page.goto('/');
    
    // Check if search input exists
    const searchInput = page.locator('input[type="search"]');
    await expect(searchInput).toBeVisible();
    
    // Test search functionality
    await searchInput.fill('cherry mx');
    await searchInput.press('Enter');
    
    // Should navigate to search page
    await page.waitForURL('**/search**');
    expect(page.url()).toContain('/search');
  });

  test('theme toggle should work', async ({ page }) => {
    await page.goto('/');
    
    // Find theme toggle
    const themeToggle = page.locator('#theme-toggle');
    await expect(themeToggle).toBeVisible();
    
    // Get initial theme state
    const initialHtmlClass = await page.locator('html').getAttribute('class');
    
    // Click theme toggle
    await themeToggle.click();
    
    // Wait for theme change
    await page.waitForTimeout(500);
    
    // Verify theme changed
    const newHtmlClass = await page.locator('html').getAttribute('class');
    expect(newHtmlClass).not.toBe(initialHtmlClass);
  });

  test('sidebar should display when enabled', async ({ page }) => {
    await page.goto('/');
    
    // Desktop view should show sidebar
    await page.setViewportSize({ width: 1200, height: 800 });
    const sidebar = page.locator('#sidebar, [class*="sidebar"]');
    
    // Check if sidebar content exists
    const latestPosts = page.locator('text=Latest Posts, text=Popular Switches');
    await expect(latestPosts).toHaveCount(2);
  });

  test('footer should contain required information', async ({ page }) => {
    await page.goto('/');
    
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Should contain links to important pages
    await expect(footer.locator('a[href="/about"]')).toBeVisible();
    await expect(footer.locator('a[href="/contact"]')).toBeVisible();
    await expect(footer.locator('a[href="/privacy"]')).toBeVisible();
  });

  test('should be accessible', async ({ page }) => {
    await page.goto('/');
    
    // Check for skip link
    const skipLink = page.locator('a:has-text("Skip to content")');
    await expect(skipLink).toBeInDOM();
    
    // Check main landmark
    await expect(page.locator('main')).toBeVisible();
    
    // Check heading hierarchy
    const h1 = page.locator('h1');
    await expect(h1).toHaveCountGreaterThan(0);
  });

  test('should load within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const endTime = Date.now();
    
    const loadTime = endTime - startTime;
    expect(loadTime).toBeLessThan(5000); // Should load within 5 seconds
  });

  test('should not have console errors', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForTimeout(2000); // Wait for JS to execute

    // Check for critical errors (ignore network errors for missing assets)
    const criticalErrors = errors.filter(error => 
      !error.includes('404') && 
      !error.includes('Failed to load resource') &&
      !error.toLowerCase().includes('favicon')
    );

    expect(criticalErrors.length).toBe(0);
  });

  test('content should be properly styled', async ({ page }) => {
    await page.goto('/');
    
    // Check if CSS is loading
    const body = page.locator('body');
    const backgroundColor = await body.evaluate(el => getComputedStyle(el).backgroundColor);
    
    // Should not be default white background (should be dark theme)
    expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    expect(backgroundColor).not.toBe('rgb(255, 255, 255)');
  });
});