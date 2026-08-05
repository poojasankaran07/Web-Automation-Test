import { test, expect } from '../fixtures/test-fixtures';
import common from '../utils/common-functions';

test.describe('Verify Subscription in home page', () => {
    test('Verify Subscription in home page Flow', async ({ page, homePage, subscriptionPage }) => {
        await test.step('Verify that home page is visible successfully', async () => {
            await page.goto('https://automationexercise.com/');
            await expect(homePage.automationLogoImage).toBeVisible();
        })

        await test.step(`Scroll down to footer & verify text 'SUBSCRIPTION'`, async () => {
            await subscriptionPage.subscriptionText.scrollIntoViewIfNeeded();
            await expect(subscriptionPage.subscriptionText).toBeVisible();
            await expect(subscriptionPage.subscriptionText).toHaveText('Subscription');
        })

        await test.step(`Click on arrow at bottom right side to move upward & verify the slider carousel`, async () => {
            await common.safeClick(page, homePage.scrollUpIcon);
            await expect(homePage.sliderCarousel).toBeVisible();
        })
    })
})