import { test, expect } from '@playwright/test';

test('should register and login a user', async ({ page }) => {
    // Register
    await page.goto('/register');
    await page.waitForLoadState('networkidle');

    await page.fill('input[type="text"]', 'E2E User');
    await page.fill('input[type="email"]', `e2e-${Date.now()}@example.com`);
    await page.fill('input[type="password"]', 'password123');
    await page.selectOption('select', 'client');
    await page.click('button[type="submit"]');

    // Should redirect to dashboard
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.locator('h1')).toContainText('Welcome, E2E User');

    // Logout
    await page.click('button:has-text("Logout")');
    await expect(page).toHaveURL(/\/login/);
});
