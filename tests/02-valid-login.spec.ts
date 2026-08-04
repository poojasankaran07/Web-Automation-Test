import { test, expect } from '../fixtures/test-fixtures';
import { safeClick } from '../utils/helper';

const existingUserDetail = {
    name: 'Existing UserTest',
    email: 'existingusertest@yopmail.com',
    password: 'Test@123'
}

test.describe('Login User with correct email and password & Logout User', () => {
    test('Verify Valid Login Flow & Logout Flow', async ({ page, homePage, loginPage }) => {
        await test.step('Verify that home page is visible successfully', async () => {
            await page.goto('https://automationexercise.com/');
            await expect(homePage.automationLogoImage).toBeVisible();
        })

        await test.step(`Click on 'Signup / Login' button & verify 'Login to your account' is visible`, async () => {
            await safeClick(page, homePage.signupOrLogin);
            await expect(loginPage.loginToAccount).toBeVisible();
        })

        await test.step('Enter correct email address and password', async () => {
            await loginPage.loginEmail.fill(existingUserDetail.email);
            await loginPage.loginPassword.fill(existingUserDetail.password);
            await safeClick(page, loginPage.loginButton);
        })

        await test.step(`Verify that 'Logged in as username' is visible`, async () => {
            await expect(homePage.loggedInUser).toContainText(`Logged in as ${existingUserDetail.name}`);
        })
    })
});