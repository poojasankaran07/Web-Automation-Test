import { test, expect } from '../fixtures/test-fixtures';
import { expectUrl } from '../utils/helper';


test.describe('Verify Test Cases Page', () => {
    test('Verify Test Cases Page Flow', async ({ page, homePage, testCasesPage}) => {
        await test.step('Verify that home page is visible successfully', async () => {
            await page.goto('https://automationexercise.com/');
            await expect(homePage.automationLogoImage).toBeVisible();
        })

        await test.step(`Click on 'Test Cases' button & verify user is navigated to test cases page successfully`, async () => {
            await homePage.testCases.click();
            await expectUrl(page, '/test_cases')
            await expect(testCasesPage.testCasesHeaading).toBeVisible();
        })
    })
})