import { test, expect } from '../fixtures/test-fixtures';

const randomEmail = `email_${Math.floor(Math.random() * 100000)}@test.com`;

test.describe('Verify All Products and product detail page', () => {
    test('Verify All Products and product detail page Flow', async ({ page, homePage, subscriptionPage }) => {
        await test.step('Verify that home page is visible successfully', async () => {
            await page.goto('https://automationexercise.com/');
            await expect(homePage.automationLogoImage).toBeVisible();
        })

        await test.step(`Scroll down to footer & verify text 'SUBSCRIPTION'`, async () => {
            await expect(subscriptionPage.subscriptionText).toBeVisible();
            await expect(subscriptionPage.subscriptionText).toHaveText('Subscription');
        })

        await test.step(`Enter email address in input and click arrow button`, async () => {
            await subscriptionPage.subscriptionEmail.fill(randomEmail);
            await subscriptionPage.subscribeEmailEnterButton.click();
        })

        await test.step(`Verify success message 'You have been successfully subscribed!' is visible`, async () => {
            await expect(subscriptionPage.successfulSubscribeMessage).toBeVisible();
            await expect(subscriptionPage.successfulSubscribeMessage).toHaveText('You have been successfully subscribed!');
            await expect(subscriptionPage.successfulSubscribeMessage).toBeHidden();
        })
    })
})