import { test, expect } from '../fixtures/test-fixtures';
import { safeClick } from '../utils/helper';

test.describe('Add to cart from Recommended items', () => {
    test('Add to cart from Recommended items Flow', async ({ page, homePage, productsPage, cartPage, recommendPage }) => {

        await test.step('Verify that home page is visible successfully', async () => {
            await page.goto('https://automationexercise.com/');
            await expect(homePage.automationLogoImage).toBeVisible();
        })

        await test.step(`Verify 'RECOMMENDED ITEMS' are visible`, async () => {
            await expect(recommendPage.recommendedSection).toBeVisible();
            await safeClick(page, recommendPage.addToCart('Stylish Dress'));
            await safeClick(page, productsPage.viewCart);
            await expect(cartPage.productName(4)).toHaveText('Stylish Dress');
        })
    })
})