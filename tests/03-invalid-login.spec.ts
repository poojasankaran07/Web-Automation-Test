import { test, expect } from '../fixtures/test-fixtures';
import common from '../utils/common-functions';

const incorrectUserDetail = {
    name: 'No User',
    email: 'nouser@abc.com',
    password: 'Test@123'
}

test.describe('Login User with incorrect email and password', () => {
    test('Verify Invalid Login Flow', async ({ page, homePage, loginPage }) => {
        await test.step('Verify that home page is visible successfully', async () => {
            await page.goto('https://automationexercise.com/');
            await expect(homePage.automationLogoImage).toBeVisible();
        })

        await test.step(`Click on 'Signup / Login' button & verify 'Login to your account' is visible`, async () => {
            await common.safeClick(page, homePage.signupOrLogin);
            await expect(loginPage.loginToAccount).toBeVisible();
        })

        await test.step('Enter incorrect email address and password', async () => {
            await common.fillValue(loginPage.loginEmail, incorrectUserDetail.email);
            await common.fillValue(loginPage.loginPassword, incorrectUserDetail.password);
            await common.safeClick(page, loginPage.loginButton);
        })

        await test.step(`Verify error 'Your email or password is incorrect!' is visible`, async () => {
            await expect(loginPage.invalidLoginError).toBeVisible();
        })
    })


})