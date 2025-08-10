// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Orbital Comparison Tool', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to switches page where orbital comparison tool should be
    await page.goto('/switches');
  });

  test('should display orbital comparison component', async ({ page }) => {
    // Check if orbital comparison component exists
    const orbitalComparison = page.locator('#orbital-comparison');
    await expect(orbitalComparison).toBeVisible();
    
    // Check for title
    await expect(page.locator('text=Orbital Switch Comparison')).toBeVisible();
    
    // Check for description
    await expect(page.locator('text=Click switches to add them to orbit')).toBeVisible();
  });

  test('should display available switches for clicking', async ({ page }) => {
    // Check if switches are displayed
    const switches = page.locator('#orbital-comparison .switch-item');
    expect(await switches.count()).toBeGreaterThan(0);
    
    // Check if first switch has required attributes
    const firstSwitch = switches.first();
    await expect(firstSwitch).toHaveAttribute('data-switch-id');
    await expect(firstSwitch).toHaveAttribute('data-switch-data');
  });

  test('should have orbital zone display area', async ({ page }) => {
    // Check orbital zone exists
    const orbitalZone = page.locator('#orbital-zone');
    await expect(orbitalZone).toBeVisible();
    
    // Check for instructions
    await expect(page.locator('text=Click switches below to add them to orbit')).toBeVisible();
  });

  test('should have control buttons', async ({ page }) => {
    // Check clear orbit button
    const clearButton = page.locator('#clear-orbit');
    await expect(clearButton).toBeVisible();
    await expect(clearButton).toHaveText('Clear Orbit');
    
    // Check auto arrange button
    const autoButton = page.locator('#auto-orbit');
    await expect(autoButton).toBeVisible();
    await expect(autoButton).toHaveText('Auto Arrange');
  });

  test('should auto-arrange switches when auto arrange button is clicked', async ({ page }) => {
    // Click auto arrange button
    await page.locator('#auto-orbit').click();
    
    // Wait a moment for the animation
    await page.waitForTimeout(2000);
    
    // Check if switches appear in orbit
    const orbitingSwitches = page.locator('#orbiting-switches .orbital-switch');
    expect(await orbitingSwitches.count()).toBeGreaterThan(0);
    
    // Check if comparison panel becomes visible
    const comparisonPanel = page.locator('#comparison-panel');
    await expect(comparisonPanel).toBeVisible();
  });

  test('should show comparison table when switches are in orbit', async ({ page }) => {
    // Auto arrange to get switches in orbit
    await page.locator('#auto-orbit').click();
    await page.waitForTimeout(2000);
    
    // Check comparison panel is visible
    const comparisonPanel = page.locator('#comparison-panel');
    await expect(comparisonPanel).toBeVisible();
    
    // Check comparison table exists
    const comparisonTableEl = page.locator('#comparison-table table');
    await expect(comparisonTableEl).toBeVisible();
    
    // Check table has headers
    const comparisonTable = page.locator('#comparison-table');
    await expect(comparisonTable.locator('text=Property')).toBeVisible();
    await expect(comparisonTable.locator('text=Type')).toBeVisible();
    await expect(comparisonTable.locator('text=Actuation Force')).toBeVisible();
    await expect(comparisonTable.locator('text=Rating')).toBeVisible();
  });

  test('should clear orbit when clear button is clicked', async ({ page }) => {
    // First auto arrange to get switches in orbit
    await page.locator('#auto-orbit').click();
    await page.waitForTimeout(2000);
    
    // Verify switches are in orbit
    let orbitingSwitches = page.locator('#orbiting-switches .orbital-switch');
    expect(await orbitingSwitches.count()).toBeGreaterThan(0);
    
    // Click clear button
    await page.locator('#clear-orbit').click();
    
    // Verify orbit is cleared
    orbitingSwitches = page.locator('#orbiting-switches .orbital-switch');
    await expect(orbitingSwitches).toHaveCount(0);
    
    // Verify comparison panel is hidden
    const comparisonPanel = page.locator('#comparison-panel');
    await expect(comparisonPanel).not.toBeVisible();
  });

  test('should handle click to add functionality', async ({ page }) => {
    // Get the first switch from orbital comparison component
    const firstSwitch = page.locator('#orbital-comparison .switch-item').first();
    
    // Click the switch to add it to orbit
    await firstSwitch.click();
    
    // Wait for animation
    await page.waitForTimeout(1000);
    
    // Check if switch was added to orbit
    const orbitingSwitches = page.locator('#orbiting-switches .orbital-switch');
    expect(await orbitingSwitches.count()).toBeGreaterThanOrEqual(1);
  });

  test('should show orbital animations', async ({ page }) => {
    // Auto arrange switches
    await page.locator('#auto-orbit').click();
    await page.waitForTimeout(2000);
    
    // Check if orbital switches have animation styles
    const orbitalSwitch = page.locator('#orbiting-switches .orbital-switch').first();
    await expect(orbitalSwitch).toBeVisible();
    
    // Check for orbital path animation
    const orbitalPath = page.locator('.orbital-path').first();
    await expect(orbitalPath).toBeVisible();
    
    // Verify animation is applied
    const style = await orbitalPath.getAttribute('style');
    expect(style).toContain('animation');
  });

  test('should allow removing switches from orbit', async ({ page }) => {
    // Auto arrange switches
    await page.locator('#auto-orbit').click();
    await page.waitForTimeout(2000);
    
    // Hover over first orbital switch to show remove button
    const orbitalSwitch = page.locator('#orbiting-switches .orbital-switch').first();
    await orbitalSwitch.hover();
    
    // Click remove button
    const removeButton = page.locator('.remove-switch').first();
    await expect(removeButton).toBeVisible();
    await removeButton.click();
    
    // Wait for removal animation
    await page.waitForTimeout(500);
    
    // Verify switch was removed
    const remainingSwwiches = page.locator('#orbiting-switches .orbital-switch');
    const count = await remainingSwwiches.count();
    expect(count).toBeLessThan(3); // Started with 3, should now be less
  });

  test('should be responsive on mobile', async ({ page, isMobile }) => {
    if (isMobile) {
      // Check if component is visible on mobile
      const orbitalComparison = page.locator('#orbital-comparison');
      await expect(orbitalComparison).toBeVisible();
      
      // Check if orbital zone is appropriately sized
      const orbitalZone = page.locator('#orbital-zone');
      const box = await orbitalZone.boundingBox();
      expect(box?.height).toBeGreaterThan(200); // Should have reasonable height on mobile
      
      // Check if switches grid is responsive
      const switchesGrid = page.locator('#orbital-comparison .grid');
      await expect(switchesGrid).toBeVisible();
    }
  });

  test('should display switch tooltips on hover', async ({ page }) => {
    // Auto arrange switches first
    await page.locator('#auto-orbit').click();
    await page.waitForTimeout(2000);
    
    // Hover over orbital switch
    const orbitalSwitch = page.locator('#orbiting-switches .orbital-switch').first();
    await orbitalSwitch.hover();
    
    // Wait for tooltip animation
    await page.waitForTimeout(300);
    
    // Check if tooltip is visible
    const tooltip = page.locator('.switch-in-orbit .absolute.-bottom-12');
    await expect(tooltip).toBeVisible();
  });
});