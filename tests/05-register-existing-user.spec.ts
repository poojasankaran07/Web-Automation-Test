import { test, expect } from '../fixtures/test-fixtures';

const existingUserDetail = {
    name: 'Existing UserTest',
    email: 'existingusertest@yopmail.com',
    password: 'Test@123'
}

test.describe('Register User with existing email', () => {
    test('Register User with existing email Flow', async ({ page, homePage, registerPage}) => {
        await test.step('Verify that home page is visible successfully', async () => {
            await page.goto('https://automationexercise.com/');
            await expect(homePage.automationLogoImage).toBeVisible();
        })

        await test.step(`Click on 'Signup / Login' button & verify 'New User Signup!' is visible`, async () => {
            await homePage.signupOrLogin.click();
            await expect(registerPage.newUserSignup).toBeVisible();
        })

        await test.step(`Enter name and already registered email address`, async () => {
            await registerPage.signupName.fill(existingUserDetail.name);
            await registerPage.signupEmail.fill(existingUserDetail.email);
            await registerPage.signupButton.click();
            await expect(registerPage.emailExistError).toBeVisible();
        })
    })
});