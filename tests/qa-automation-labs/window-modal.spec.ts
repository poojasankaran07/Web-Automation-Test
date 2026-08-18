import { test, expect } from "../../fixtures/qa-automation-labs/fixtures";

test.describe("Window Popup Modal Flow", () => {
  test("Window Popup Modal Flow", async ({
    page,
    menusPage,
    windowModalPage,
  }) => {
    await page.goto("https://testing.qaautomationlabs.com/");
    await menusPage.testingMenu.click();
    await expect(menusPage.dashboardBanner).toBeVisible();
    await windowModalPage.windowModalPopupMenu.click();

    await test.step("Click Success modal popup and verify the popup", async () => {
      await windowModalPage.openModalPopup("success").click();
      await expect(windowModalPage.modalBody("success")).toBeVisible();
      await windowModalPage.closeButton("success").click();
      await expect(windowModalPage.modalBody("success")).not.toBeVisible();
    });

    await test.step("Click info modal popup and verify the popup", async () => {
      await windowModalPage.openModalPopup("info").click();
      await expect(windowModalPage.modalBody("info")).toBeVisible();
      await windowModalPage.closeButton("info").click();
      await expect(windowModalPage.modalBody("info")).not.toBeVisible();
    });

    await test.step("Click primary modal popup and verify the popup", async () => {
      await windowModalPage.openModalPopup("primary").click();
      await expect(windowModalPage.modalBody("primary")).toBeVisible();
      await windowModalPage.closeButton("primary").click();
      await expect(windowModalPage.modalBody("primary")).not.toBeVisible();
    });

    await test.step("Click danger modal popup and verify the popup", async () => {
      await windowModalPage.openModalPopup("danger").click();
      await expect(windowModalPage.modalBody("danger")).toBeVisible();
      await windowModalPage.closeButton("danger").click();
      await expect(windowModalPage.modalBody("danger")).not.toBeVisible();
    });
  });
});
