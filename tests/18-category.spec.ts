import { test, expect } from '../fixtures/test-fixtures';
import { safeClick } from '../utils/helper';

test.describe('View Category Products', () => {
    test('View Category Products Flow', async ({ page, homePage, categoryPage }) => {
        await test.step('Verify that home page is visible successfully', async () => {
            await page.goto('https://automationexercise.com/');
            await expect(homePage.automationLogoImage).toBeVisible();
        })

        await test.step(`Verify that categories are visible on left side bar`, async () => {
            await expect(categoryPage.categoryHeading).toBeVisible();
        })

        await test.step(`Click on 'Women' category & click any subcategory under Women`, async () => {
            await safeClick(page, categoryPage.category('Women'));
            await expect(categoryPage.womenSubCategory('Tops')).toBeVisible();
            await safeClick(page, categoryPage.womenSubCategory('Tops'));
        })

        await test.step(`Verify that category page is displayed and confirm text`, async () => {
            await expect(categoryPage.categoryPageTitle('Women', 'Tops')).toBeVisible();
        })

        await test.step(`Click on 'Men' category & click any subcategory under Men`, async () => {
            await safeClick(page, categoryPage.category('Men'));
            await expect(categoryPage.menSubCategory('Jeans')).toBeVisible();
            await safeClick(page, categoryPage.menSubCategory('Jeans'));
        })

        await test.step(`Verify that user is navigated to that category page of Men`, async () => {
            await expect(categoryPage.categoryPageTitle('Men', 'Jeans')).toBeVisible();
        })
    })
});