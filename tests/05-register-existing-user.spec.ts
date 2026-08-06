import { test, expect } from '../fixtures/test-fixtures';

const existingUserDetail = {
    name: 'Existing UserTest',
    email: 'existingusertest@yopmail.com',
    password: 'Test@123'
}

test.describe('Register User with existing email', () => {
    test('Register User with existing email Flow', async ({ homePage, registerPage}) => {
        await test.step('Open home page and verify it is visible', async () => {
            await homePage.open();
            await expect(homePage.automationLogoImage).toBeVisible();
        })

        await test.step(`Navigate to signup page and verify 'New User Signup!' is visible`, async () => {
            await homePage.goToSignupOrLogin();
            await expect(registerPage.newUserSignup).toBeVisible();
        })

        await test.step(`Enter name and already registered email address`, async () => {
            await registerPage.startSignup(existingUserDetail.name, existingUserDetail.email);
            await expect(registerPage.emailExistError).toBeVisible();
        })
    })
});