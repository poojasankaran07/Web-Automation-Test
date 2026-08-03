import { Page, test, expect, BrowserContext } from '@playwright/test';
import HomePage from '../pages/home-page';
import RegisterUser from '../pages/register-user';

let page: Page;
let registerPage: RegisterUser;
let homePage: HomePage;
let context: BrowserContext;

const existingUserDetail = {
    name: 'Existing UserTest',
    email: 'existingusertest@yopmail.com',
    password: 'Test@123'
}

test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://automationexercise.com/');
    homePage = new HomePage(page);
    registerPage = new RegisterUser(page);
});

test.describe('Register User with existing email', () => {
    test('Register User with existing email Flow', async () => {
        await test.step('Verify that home page is visible successfully', async () => {
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