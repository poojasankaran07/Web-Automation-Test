import { test, expect } from '../fixtures/test-fixtures';
import common from '../utils/common-functions';
import dataGenerator from '../utils/data-generator';

test.describe('Add review on product', () => {
    test('Add review on product Flow', async ({ page, homePage, productsPage, reviewPage }) => {
        await test.step('Verify that home page is visible successfully', async () => {
            await page.goto('/');
            await expect(homePage.automationLogoImage).toBeVisible();
        })

        await test.step(`Click on 'Products' button & verify user is navigated to ALL PRODUCTS page`, async () => {
            await common.safeClick(page, homePage.products);
        })

        await test.step(`Verify the products list is visible`, async () => {
            await expect(productsPage.productsList).toBeVisible();
        })

        await test.step(`Click on 'View Product' of first product & verify user is landed to product detail page`, async () => {
            await productsPage.viewProduct(1);
        })

        await test.step(`Verify 'Write Your Review' is visible`, async () => {
            await expect(reviewPage.reviewSection).toBeVisible();
        })

        await test.step(`Enter name, email and review & click 'Submit' button`, async () => {
            await reviewPage.submitReview({
                name: dataGenerator.generateName('Name'),
                email: dataGenerator.generateEmail('email', 'test.com'),
                review: dataGenerator.generateReviewText(),
            });
        })

        await test.step(`Verify success message is visible`, async () => {
            await expect(reviewPage.reviewSuccessMessage).toBeVisible();
        })
    })
})