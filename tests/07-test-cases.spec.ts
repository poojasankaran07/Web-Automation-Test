import { Page, test, expect, BrowserContext } from '@playwright/test';
import HomePage from '../pages/home-page';
import RegisterUser from '../pages/register-user';
import LoginPage from '../pages/login-page';
import TestCasesPage from '../pages/test-cases';
import { expectUrl } from '../utils/helper';

let context: BrowserContext;
let page: Page;
let registerPage: RegisterUser;
let homePage: HomePage;
let loginPage: LoginPage
let testCasesPage: TestCasesPage

test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://automationexercise.com/');
    homePage = new HomePage(page);
    registerPage = new RegisterUser(page);
    loginPage = new LoginPage(page);
    testCasesPage = new TestCasesPage(page);
});

test.describe('Verify Test Cases Page', () => {
    test('Verify Test Cases Page Flow', async () => {
        await test.step('Verify that home page is visible successfully', async () => {
            await expect(homePage.automationLogoImage).toBeVisible();
        })

        await test.step(`Click on 'Test Cases' button & verify user is navigated to test cases page successfully`, async () => {
            await homePage.testCases.click();
            await expectUrl(page, '/test_cases')
            await expect(testCasesPage.testCasesHeaading).toBeVisible();
        })
    })
})