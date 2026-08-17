import { test, expect } from "../../fixtures/qa-automation-labs/fixtures";

test.describe("Iframe Flow", () => {
  test("Iframe Flow", async ({ page, menusPage, iframePage }) => {
    await page.goto("https://testing.qaautomationlabs.com/");
    await menusPage.testingMenu.click();
    await expect(menusPage.dashboardBanner).toBeVisible();
    await iframePage.iframeMenu.click();

    await test.step("Click `Click Me` button in frame 1 and verify the message", async () => {
      await iframePage.submitButtonInIframe1.click();
      await expect(iframePage.frameMessage).toHaveText(
        "You have clicked on iframe 1 button",
      );
    });

    await test.step("Click `Click Me` button in frame 2 and verify the message", async () => {
      await iframePage.submitButtonInIframe2.click();
      await expect(iframePage.frameMessage).toHaveText(
        "You have clicked on iframe 2 button",
      );
    });
  });
});
