import { test, expect } from "../../fixtures/qa-automation-labs/fixtures";

test.describe("Drag and Drop Flow", () => {
  test("Drag and Drop Flow", async ({ page, menusPage, dragDropPage }) => {
    await page.goto("https://testing.qaautomationlabs.com/");
    await menusPage.testingMenu.click();
    await expect(menusPage.dashboardBanner).toBeVisible();
    await dragDropPage.dragDropMenu.click();

    await test.step("Drag item 1 to item 2", async () => {
      await expect(dragDropPage.allItems).toHaveText([
        "Item 1:- Inbox",
        "Item 2:- Work",
        "Item 3:- Personal",
        "Item 4:- Important",
        "Item 5:- Archive",
      ]);
      await dragDropPage.itemsList(1).dragTo(dragDropPage.itemsList(3));

      await expect(dragDropPage.allItems).toHaveText([
        "Item 2:- Work",
        "Item 1:- Inbox",
        "Item 3:- Personal",
        "Item 4:- Important",
        "Item 5:- Archive",
      ]);
    });
  });
});
