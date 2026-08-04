import { test, expect } from '../fixtures/test-fixtures';

test.describe('Verify All Products and product detail page', () => {
    test('Verify All Products and product detail page Flow', async ({ page, homePage, searchProduct }) => {
        await test.step('Verify that home page is visible successfully', async () => {
            await page.goto('https://automationexercise.com/');
            await expect(homePage.automationLogoImage).toBeVisible();
        })

        await test.step(`Click on 'Products' button & verify user is navigated to ALL PRODUCTS page`, async () => {
            await homePage.products.click();
        })

        await test.step(`Enter product name in search input and click search button`, async () => {
            const productName = 'Winter Top';
            await searchProduct.searchProductField.fill(productName);
            await searchProduct.searchIcon.click();
            await expect(searchProduct.searchedProduct(productName)).toBeVisible();
        })
    })
})