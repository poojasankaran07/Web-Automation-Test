import { test, expect } from '../fixtures/test-fixtures';

test.describe('Verify Subscription in home page', () => {
    test('Verify Subscription in home page Flow', async ({ page, homePage, subscriptionPage }) => {
        await test.step('Verify that home page is visible successfully', async () => {
            await page.goto('/');
            await expect(homePage.automationLogoImage).toBeVisible();
        })

        await test.step(`Scroll down to footer & verify text 'SUBSCRIPTION'`, async () => {
            // await subscriptionPage.subscriptionText.scrollIntoViewIfNeeded();
            // await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            await page.evaluate(() =>
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth',
                })
            );
            await expect(subscriptionPage.subscriptionText).toBeVisible();
            await expect(subscriptionPage.subscriptionText).toHaveText('Subscription');
        })

        await test.step(`Scroll up page to top & verify the slider carousel`, async () => {
            // await page.evaluate(() => window.scrollTo(0, 0));
            await page.evaluate(() =>
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                })
            );
            await expect(homePage.sliderCarousel).toBeVisible();
        })
    })
})