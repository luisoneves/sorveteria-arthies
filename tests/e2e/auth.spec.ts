import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should display landing page', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('h1')).toContainText('Sorveteria Arthies');
    await expect(page.locator('text=Entrar')).toBeVisible();
    await expect(page.locator('text=Cadastrar')).toBeVisible();
  });

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/');
    
    await page.click('text=Entrar');
    await expect(page).toHaveURL('/login');
    await expect(page.locator('h2, [class*="CardTitle"]')).toContainText('Sorveteria Arthies');
  });

  test('should navigate to register page', async ({ page }) => {
    await page.goto('/');
    
    await page.click('text=Cadastrar');
    await expect(page).toHaveURL('/register');
  });
});

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should display login form', async ({ page }) => {
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should show validation errors', async ({ page }) => {
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Email inválido')).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    await page.fill('input[type="email"]', 'invalid-email');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Email inválido')).toBeVisible();
  });

  test('should validate password length', async ({ page }) => {
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', '123');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Senha deve ter no mínimo')).toBeVisible();
  });
});

test.describe('Register Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/register');
  });

  test('should display registration form', async ({ page }) => {
    await expect(page.locator('input[name="nome"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="senha"]')).toBeVisible();
  });

  test('should link to login page', async ({ page }) => {
    await page.click('text=Faça login');
    await expect(page).toHaveURL('/login');
  });
});
