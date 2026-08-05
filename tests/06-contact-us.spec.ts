import { test, expect } from '../fixtures/test-fixtures';
import { safeClick } from '../utils/helper';

const random = Math.floor(Math.random() * 100000);

const getInTouchText = {
    name: `TestName_${random}`,
    email: `testemail${random}@yopmail.com`,
    subject: `Adding Subject - ${random}`,
    message: `Adding a message to get in touch with the team - ${random}`
};

test.describe('Contact Us Form', () => {
    test('Contact Us Form Flow', async ({ page, homePage, contactUsPage }) => {
        await test.step('Verify that home page is visible successfully', async () => {
            await page.goto('https://automationexercise.com/');
            await expect(homePage.automationLogoImage).toBeVisible();
        })

        await test.step(`Click on 'Contact Us' button & verify 'GET IN TOUCH' is visible`, async () => {
            await safeClick(page, homePage.contactUs);
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

            await safeClick(page, contactUsPage.submitButton);
            await expect(contactUsPage.submittedSuccessMessage).toBeVisible();
        })

        await test.step(`Click 'Home' button and verify that landed to home page successfully`, async () => {
            await safeClick(page, contactUsPage.homeButton);
            await expect(homePage.automationLogoImage).toBeVisible();
        })
    })
});