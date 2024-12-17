import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://practice-automation.com/form-fields/');
  await page.getByTestId('name-input').click();
  await page.getByTestId('name-input').fill('Help me');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('password');
  await page.getByTestId('drink1').check();
  await page.getByTestId('drink2').check();
  await page.getByTestId('drink3').check();
});