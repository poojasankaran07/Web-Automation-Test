import { test, expect } from '../fixtures/test-fixtures';
import common from '../utils/common-functions';
import dataGenerator from '../utils/data-generator';

const randomEmail = dataGenerator.generateEmail('email', 'test.com');

test.describe('Verify Subscription in home page', () => {
    test('Verify Subscription in home page Flow', async ({ page, homePage, subscriptionPage }) => {
        await test.step('Verify that home page is visible successfully', async () => {
            await page.goto('https://automationexercise.com/');
            await expect(homePage.automationLogoImage).toBeVisible();
        })

        await test.step(`Scroll down to footer & verify text 'SUBSCRIPTION'`, async () => {
            await expect(subscriptionPage.subscriptionText).toBeVisible();
            await expect(subscriptionPage.subscriptionText).toHaveText('Subscription');
        })

        await test.step(`Enter email address in input and click arrow button`, async () => {
            await common.fillValue(subscriptionPage.subscriptionEmail, randomEmail);
            await common.safeClick(page, subscriptionPage.subscribeEmailEnterButton);
        })

        await test.step(`Verify success message 'You have been successfully subscribed!' is visible`, async () => {
            await expect(subscriptionPage.successfulSubscribeMessage).toBeVisible();
            await expect(subscriptionPage.successfulSubscribeMessage).toHaveText('You have been successfully subscribed!');
            await expect(subscriptionPage.successfulSubscribeMessage).toBeHidden();
        })
    })
})