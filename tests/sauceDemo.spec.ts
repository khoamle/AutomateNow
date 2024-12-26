import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

const username = process.env.STANDARD_USER as string
const password = process.env.PASSWORD as string


test('Login',async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.loginToAccount(username, password)
});


