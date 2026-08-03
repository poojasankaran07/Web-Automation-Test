import { Page, test, expect, BrowserContext } from '@playwright/test';
import HomePage from '../pages/home-page';
import RegisterUser from '../pages/register-user';
import LoginPage from '../pages/login-page';
import { expectUrl } from '../utils/helper';

let context: BrowserContext;
let page: Page;
let registerPage: RegisterUser;
let homePage: HomePage;
let loginPage: LoginPage

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
    loginPage = new LoginPage(page);

});

test.describe('Login User with correct email and password & Logout User', () => {
    test('Verify Valid Login Flow & Logout Flow', async () => {
        await test.step('Verify that home page is visible successfully', async () => {
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
    })
});