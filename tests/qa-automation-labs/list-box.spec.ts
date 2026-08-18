import { test, expect } from "../../fixtures/qa-automation-labs/fixtures";

test.describe("Window Popup Modal Flow", () => {
    test("Window Popup Modal Flow", async ({ page, menusPage, listBoxPage }) => {
        await page.goto("https://testing.qaautomationlabs.com/");
        await menusPage.testingMenu.click();
        await expect(menusPage.dashboardBanner).toBeVisible();
        await listBoxPage.listBoxMenu.click();

        await test.step("Add one item from source to target and remove it", async () => {
            await listBoxPage.sourceBox.selectOption('Sakshi');
            await listBoxPage.buttons('add').click();
            await expect(listBoxPage.targetBox).toHaveText('Sakshi');

            await listBoxPage.targetBox.selectOption('Sakshi');
            await listBoxPage.buttons('remove').click();
            await expect(listBoxPage.targetBox).not.toHaveText('Sakshi');
        });

        await test.step("Add all items from source to target and remove all of it", async () => {
            await listBoxPage.buttons('add-all').click();
            await expect(listBoxPage.targetBox.locator('option')).toHaveText([
                'Sanjana',
                'Mayra',
                'Yash',
                'Ryan',
                'Niken',
                'Mohit',
                'Gaurav',
                'Yashika',
                'Riyanshi',
                'Sakshi'
            ]);

            await listBoxPage.buttons('remove-all').click();
            await expect(listBoxPage.targetBox.locator('option')).not.toHaveText([
                'Sanjana',
                'Mayra',
                'Yash',
                'Ryan',
                'Niken',
                'Mohit',
                'Gaurav',
                'Yashika',
                'Riyanshi',
                'Sakshi'
            ]);
            await expect(listBoxPage.targetBox.locator('option')).toHaveCount(0);
        });
    });
});
