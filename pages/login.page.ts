import { type Locator, type Page } from '@playwright/test';

export class LoginPage{
  readonly username: Locator;
  readonly password: Locator;
  readonly loginBtn: Locator;
  readonly page: Page;

  constructor(page: Page) {
    this.page = page
    this.username = page.getByRole('textbox', {name: 'Username'})
    this.password = page.getByRole('textbox', {name: 'Password'})
    this.loginBtn = page.getByRole('button', {name: 'Login'})
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async loginToAccount(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginBtn.click();
  }
}