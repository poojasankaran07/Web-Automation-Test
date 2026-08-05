import { test, expect } from '../fixtures/test-fixtures';
import { safeClick } from '../utils/helper';

test.describe('Verify Product quantity in Cart', () => {
    test('Verify Product quantity in Cart Flow', async ({ page, homePage, productsPage }) => {
        await test.step('Verify that home page is visible successfully', async () => {
            await page.goto('https://automationexercise.com/');
            await expect(homePage.automationLogoImage).toBeVisible();
        })

        await test.step(`Click on 'Products' button & verify user is navigated to ALL PRODUCTS page`, async () => {
            await safeClick(page, homePage.products);
        })

        await test.step(`Verify the products list is visible`, async () => {
            await safeClick(page, homePage.products);
            await expect(productsPage.productsList).toBeVisible();
        })

        await test.step(`Click on 'View Product' of first product & verify product detail is opened`, async () => {
            await safeClick(page, productsPage.viewProduct(1));
            await expect(productsPage.productInformation).toBeVisible();
        })

        await test.step(`Increase quantity to 4`, async () => {
            await productsPage.quantityInput.fill('4');
            // await page.waitForTimeout(3000);
            // await productsPage.quantityInput.press('ArrowUp');
            // await page.waitForTimeout(3000);
            // await productsPage.quantityInput.press('ArrowUp');
            // await page.waitForTimeout(3000);
            // await productsPage.quantityInput.press('ArrowUp');
        })
    })
})