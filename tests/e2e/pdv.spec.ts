import { test, expect } from '@playwright/test';

test.describe('PDV - Ponto de Venda', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/vendedor/pdv');
  });

  test('should display PDV page', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('PDV');
    await expect(page.locator('text=Produtos')).toBeVisible();
    await expect(page.locator('text=Carrinho')).toBeVisible();
  });

  test('should show products grid', async ({ page }) => {
    const products = page.locator('[class*="grid"] button');
    await expect(products.first()).toBeVisible();
  });

  test('should add product to cart', async ({ page }) => {
    const firstProduct = page.locator('[class*="grid"] button').first();
    await firstProduct.click();
    
    await expect(page.locator('text=Carrinho')).toContainText('1 item');
  });

  test('should show cart total', async ({ page }) => {
    const firstProduct = page.locator('[class*="grid"] button').first();
    await firstProduct.click();
    
    await expect(page.locator('text=Total:')).toBeVisible();
    await expect(page.locator('text=R$')).toBeVisible();
  });

  test('should clear cart', async ({ page }) => {
    const firstProduct = page.locator('[class*="grid"] button').first();
    await firstProduct.click();
    
    await page.click('text=Limpar');
    
    await expect(page.locator('text=Nenhum item')).toBeVisible();
  });

  test('should have pedidos em andamento section', async ({ page }) => {
    await expect(page.locator('text=Pedidos em Andamento')).toBeVisible();
  });
});
