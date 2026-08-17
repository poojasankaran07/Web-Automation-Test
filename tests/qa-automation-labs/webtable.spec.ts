import { test, expect } from "../../fixtures/qa-automation-labs/fixtures";

test.describe("Web Table Flow", () => {
  test("Web Table Flow", async ({ page, menusPage, webtablePage }) => {
    await page.goto("https://testing.qaautomationlabs.com/");
    await menusPage.testingMenu.click();
    await expect(menusPage.dashboardBanner).toBeVisible();
    await webtablePage.webtableMenu.click();

    await test.step("Add Record in table", async () => {
      await webtablePage.name.fill("Pooja S");
      await webtablePage.country.fill("India");
      await webtablePage.addRecordButton.click();
    });

    await test.step("Search the added record in table", async () => {
      await webtablePage.tableSearch.fill("Pooja S");
      await page.keyboard.press("Enter");

      const row = webtablePage.getRowByName("Pooja S");

      await expect(row).toHaveCount(1);
      await expect(row).toContainText("Pooja S");
      await expect(row).toContainText("India");
    });
  });
});
