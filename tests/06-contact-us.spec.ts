import { Page, test, expect, BrowserContext } from '@playwright/test';
import HomePage from '../pages/home-page';
import RegisterUser from '../pages/register-user';
import LoginPage from '../pages/login-page';
import ContactUsPage from '../pages/contact-us';
import { expectUrl } from '../utils/helper';

let context: BrowserContext;
let page: Page;
let registerPage: RegisterUser;
let homePage: HomePage;
let loginPage: LoginPage
let contactUsPage: ContactUsPage;

const random = Math.floor(Math.random() * 100000);

const getInTouchText = {
    name: `TestName_${random}`,
    email: `testemail${random}@yopmail.com`,
    subject: `Adding Subject - ${random}`,
    message: `Adding a message to get in touch with the team - ${random}`
};

test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://automationexercise.com/');
    homePage = new HomePage(page);
    registerPage = new RegisterUser(page);
    loginPage = new LoginPage(page);
    contactUsPage = new ContactUsPage(page);
});

test.describe('Login User with correct email and password & Logout User', () => {
    test('Verify Valid Login Flow & Logout Flow', async () => {
        await test.step('Verify that home page is visible successfully', async () => {
            await expect(homePage.automationLogoImage).toBeVisible();
        })

        await test.step(`Click on 'Contact Us' button & verify 'GET IN TOUCH' is visible`, async () => {
            await homePage.contactUs.click();
            await expect(contactUsPage.getInTouch).toBeVisible();
        })

        await test.step(`Enter name, email, subject and message`, async () => {
            await contactUsPage.name.fill(getInTouchText.name);
            await contactUsPage.email.fill(getInTouchText.email);
            await contactUsPage.subject.fill(getInTouchText.subject);
            await contactUsPage.message.fill(getInTouchText.message);
        })

        await test.step(`Upload file`, async () => {
            await contactUsPage.fileUpload.setInputFiles({
                name: 'test.txt',
                mimeType: 'text/plain',
                buffer: Buffer.from('Sample test file')
            })
            await page.waitForLoadState('domcontentloaded')
        })

        await test.step(`Click 'Submit' button & Click Ok in dialog & verify success message is visible`, async () => {
            page.on('dialog', dialog => {
                expect(dialog.message()).toBe('Press OK to proceed!');
                dialog.accept();
            });

            await contactUsPage.submitButton.click();
            await expect(contactUsPage.submittedSuccessMessage).toBeVisible();
        })

        await test.step(`Click 'Home' button and verify that landed to home page successfully`, async () => {
            await contactUsPage.homeButton.click();
            await expectUrl(page, '/');
            await expect(homePage.automationLogoImage).toBeVisible();
        })
    })
});