import { test, expect } from '../fixtures/test-fixtures';

test.describe('Add to cart from Recommended items', () => {
    test('Add to cart from Recommended items Flow', async ({ page, homePage, productsPage, cartPage, recommendPage }) => {

        await test.step('Verify that home page is visible successfully', async () => {
            await page.goto('/');
            await expect(homePage.automationLogoImage).toBeVisible();
        })

        await test.step(`Verify 'RECOMMENDED ITEMS' are visible`, async () => {
            await expect(recommendPage.recommendedSection).toBeVisible();
            await recommendPage.addRecommendedItemToCart('Stylish Dress');
            await productsPage.viewCart();
            await expect(cartPage.productName(4)).toHaveText('Stylish Dress');
        })
    })
})