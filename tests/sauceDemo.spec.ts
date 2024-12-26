import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import testData from '../testData/testData.json'
import { log } from 'console';

const username = testData.standardUser.username
const password = testData.standardUser.password


test('Login',async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.loginToAccount(username, password)
});


