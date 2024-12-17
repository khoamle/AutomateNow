import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://practice-automation.com/');
  await page.getByRole('link', { name: 'JavaScript Delays' }).click();
  await page.getByRole('button', { name: 'Start' }).click();
  await page.locator('#delay').click();
  await expect(page.locator('#delay')).toHaveValue('Liftoff!');
  await expect(page.locator('#delay')).toHaveValue('Liftoff!');
  await expect(page.locator('#delay')).toHaveValue('Liftoff!');
});