import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Login Test Suite', () => {

  let loginPage: LoginPage;
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);

    await loginPage.goto();
  });

  test('Login without credentials', async () => {
    await loginPage.loginWithoutInputs();
    await loginPage.assertErrorMessage('Epic sadface: Username is required');
  });

  test('Login with invalid credentials', async () => {
    await loginPage.login('wronguser', 'wrongpassword');
    await loginPage.assertErrorMessage(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  test('Login with username only', async () => {
    await loginPage.loginUsernameOnly('standard_user');
    await loginPage.assertErrorMessage('Epic sadface: Password is required');
  });

  test('Login with password only', async () => {
    await loginPage.loginPasswordOnly('secret_sauce');
    await loginPage.assertErrorMessage('Epic sadface: Username is required');
  });

  test('Login with valid credentials', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
    await productsPage.assertOnProductsPage();
  });

});

