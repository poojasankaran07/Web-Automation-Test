import { test, expect } from '../fixtures/test-fixtures';
import { expectUrl } from '../utils/helper';

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
            await homePage.signupOrLogin.click();
            await expect(loginPage.loginToAccount).toBeVisible();
        })

        await test.step('Enter correct email address and password', async () => {
            await loginPage.loginEmail.fill(existingUserDetail.email);
            await loginPage.loginPassword.fill(existingUserDetail.password);
            await loginPage.loginButton.click();
        })

        await test.step(`Verify that 'Logged in as username' is visible`, async () => {
            await expect(homePage.loggedInUser).toContainText(`Logged in as ${existingUserDetail.name}`);
        })

        await test.step(`Click 'Logout' button & Verify that user is navigated to login page`, async () => {
            await homePage.logout.click();
            await expectUrl(page, '/login');
            await expect(homePage.signupOrLogin).toBeVisible();
        })
    })
});