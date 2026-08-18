import { test, expect } from "../../fixtures/qa-automation-labs/fixtures";

test.describe("Notification Flow", () => {
  test("Notification Flow", async ({ page, menusPage, notificationPage }) => {
    await page.goto("https://testing.qaautomationlabs.com/");
    await menusPage.testingMenu.click();
    await expect(menusPage.dashboardBanner).toBeVisible();
    await notificationPage.notificationMenu.click();

    await test.step("Click all notification buttons and verify the notifications listed", async () => {
      await notificationPage.successMessageButton.click();
      await notificationPage.infoMessageButton.click();
      await notificationPage.primaryMessageButton.click();
      await notificationPage.errorMessageButton.click();

      await expect(notificationPage.notifications).toHaveCount(4);

      await expect(notificationPage.notifications.nth(0)).toContainText(
        "Notification Body",
      );

      await expect(notificationPage.notifications.nth(1)).toContainText(
        "Notification Body",
      );

      await expect(notificationPage.notifications.nth(2)).toContainText(
        "Notification Body",
      );

      await expect(notificationPage.notifications.nth(3)).toContainText(
        "Notification Body",
      );
    });
  });
});
