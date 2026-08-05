import { test, expect } from '../fixtures/test-fixtures';
import common from '../utils/common-functions';

const existingUserDetail = {
    name: 'Existing UserTest',
    email: 'existingusertest@yopmail.com',
    password: 'Test@123'
}

test.describe('Register User with existing email', () => {
    test('Register User with existing email Flow', async ({ page, homePage, registerPage}) => {
        await test.step('Verify that home page is visible successfully', async () => {
            await page.goto('/');
            await expect(homePage.automationLogoImage).toBeVisible();
        })

        await test.step(`Click on 'Signup / Login' button & verify 'New User Signup!' is visible`, async () => {
            await common.safeClick(page, homePage.signupOrLogin);
            await expect(registerPage.newUserSignup).toBeVisible();
        })

        await test.step(`Enter name and already registered email address`, async () => {
            await common.fillValue(registerPage.signupName, existingUserDetail.name);
            await common.fillValue(registerPage.signupEmail, existingUserDetail.email);
            await common.safeClick(page, registerPage.signupButton);
            await expect(registerPage.emailExistError).toBeVisible();
        })
    })
});