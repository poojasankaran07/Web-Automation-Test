import { test, expect } from '../fixtures/test-fixtures';
import common from '../utils/common-functions';

test.describe('Verify All Products and product detail page', () => {
    test('Verify All Products and product detail page Flow', async ({ page, homePage, productsPage }) => {
        await test.step('Verify that home page is visible successfully', async () => {
            await page.goto('https://automationexercise.com/');
            await expect(homePage.automationLogoImage).toBeVisible();
        })

        await test.step(`Click on 'Products' button & verify user is navigated to ALL PRODUCTS page`, async () => {
            await common.safeClick(page, homePage.products);
        })

        await test.step(`Verify the products list is visible`, async () => {
            await expect(productsPage.productsList).toBeVisible();
        })

        await test.step(`Click on 'View Product' of first product & verify user is landed to product detail page`, async () => {
            await common.safeClick(page, productsPage.viewProduct(1));
        })

        await test.step(`Verify product name, category, price, availability, condition, brand are visible`, async () => {
            await expect(productsPage.productInformation).toBeVisible();
            await expect(productsPage.productName).toBeVisible();
            await expect(productsPage.category).toBeVisible();
            await expect(productsPage.price).toBeVisible();
            await expect(productsPage.availability).toBeVisible();
            await expect(productsPage.condition).toBeVisible();
            await expect(productsPage.brand).toBeVisible();
        })
    })
})