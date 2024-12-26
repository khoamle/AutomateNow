import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
require('dotenv').config();

const standardUsername = process.env.STANDARD_USER as string
const lockedOutUsername = process.env.LOCKED_OUT_USER as string
const problemUsername = process.env.PROBLEM_USER as string
const password = process.env.PASSWORD as string


test('Login as standard user',async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.loginToAccount(standardUsername, password)
});

test('Login as lockedOut user',async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.loginToAccount(lockedOutUsername, password)
});

test('Login as problem user',async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.loginToAccount(problemUsername, password)
});

