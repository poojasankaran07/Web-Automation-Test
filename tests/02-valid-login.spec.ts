import { test, expect } from '../fixtures/test-fixtures';
import common from '../utils/common-functions';

const existingUserDetail = {
    name: 'Existing UserTest',
    email: 'existingusertest@yopmail.com',
    password: 'Test@123'
}

test.describe('Login User with correct email and password', () => {
    test('Login User with correct email and password Flow', async ({ page, homePage, loginPage }) => {
        await test.step('Verify that home page is visible successfully', async () => {
            await page.goto('/');
            await expect(homePage.automationLogoImage).toBeVisible();
        })

        await test.step(`Click on 'Signup / Login' button & verify 'Login to your account' is visible`, async () => {
            await common.safeClick(page, homePage.signupOrLogin);
            await expect(loginPage.loginToAccount).toBeVisible();
        })

        await test.step('Enter correct email address and password', async () => {
            await common.fillValue(loginPage.loginEmail, existingUserDetail.email);
            await common.fillValue(loginPage.loginPassword, existingUserDetail.password);
            await common.safeClick(page, loginPage.loginButton);
        })

        await test.step(`Verify that 'Logged in as username' is visible`, async () => {
            await expect(homePage.loggedInUser).toContainText(`Logged in as ${existingUserDetail.name}`);
        })
    })
});