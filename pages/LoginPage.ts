import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput = '#user-name';
  readonly passwordInput = '#password';
  readonly loginButton = '#login-button';
  readonly errorMessage = '[data-test="error"]';
 
  

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

    // Clear input fields
  private async clearInputs() {
    await this.page.fill(this.usernameInput, '');
    await this.page.fill(this.passwordInput, '');
  }

  //Login without user name password
  async loginWithoutInputs() {
    await this.clearInputs();
    await this.page.click(this.loginButton);
  }

  //Login with valid credentials - username only
  async loginUsernameOnly(username: string) {
    await this.clearInputs();
    await this.page.fill(this.usernameInput, username);
    await this.page.click(this.loginButton);
  }

  //Login with valid credentials - password only
  async loginPasswordOnly(password: string) {
    await this.clearInputs();
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }


  //Login with valid credentials 
  async login(username: string, password: string) {
    await this.clearInputs();
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

    // Assert that error message is getting visible
  async assertErrorMessage(message: string) {
    await expect(this.page.locator(this.errorMessage)).toContainText(message);
  }
}
