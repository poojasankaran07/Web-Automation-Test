import { test, expect } from '../fixtures/test-fixtures';
import common from '../utils/common-functions';
import dataGenerator from '../utils/data-generator';

const getInTouchText = {
    name: dataGenerator.generateName(),
    email: dataGenerator.generateEmail(),
    subject: dataGenerator.generateSubject(),
    message: dataGenerator.generateMessage()
};

test.describe('Contact Us Form', () => {
    test('Contact Us Form Flow', async ({ page, homePage, contactUsPage }) => {
        await test.step('Verify that home page is visible successfully', async () => {
            await page.goto('/');
            await expect(homePage.automationLogoImage).toBeVisible();
        })

        await test.step(`Click on 'Contact Us' button & verify 'GET IN TOUCH' is visible`, async () => {
            await common.safeClick(page, homePage.contactUs);
            await expect(contactUsPage.getInTouch).toBeVisible();
        })

        await test.step(`Enter name, email, subject and message`, async () => {
            await common.fillValue(contactUsPage.name, getInTouchText.name);
            await common.fillValue(contactUsPage.email, getInTouchText.email);
            await common.fillValue(contactUsPage.subject, getInTouchText.subject);
            await common.fillValue(contactUsPage.message, getInTouchText.message);
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

            await common.safeClick(page, contactUsPage.submitButton);
            await expect(contactUsPage.submittedSuccessMessage).toBeVisible();
        })

        await test.step(`Click 'Home' button and verify that landed to home page successfully`, async () => {
            await common.safeClick(page, contactUsPage.homeButton);
            await expect(homePage.automationLogoImage).toBeVisible();
        })
    })
});