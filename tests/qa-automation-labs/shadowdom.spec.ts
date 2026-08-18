import { test, expect } from "../../fixtures/qa-automation-labs/fixtures";

test.describe("Shadow DOM Flow", () => {
  test("Shadow DOM Flow", async ({ page, menusPage, shadowDomPage }) => {
    await page.goto("/", {
      waitUntil: "domcontentloaded",
    });
    await menusPage.testingMenu.click();
    await expect(menusPage.dashboardBanner).toBeVisible();
    await shadowDomPage.shadowDomMenu.click();

    await test.step("Verify the text outside shadow DOM", async () => {
      await expect(shadowDomPage.outsideShadowDom).toHaveText(
        "This is outside Shadow DOM",
      );
    });

    await test.step("Verify the text inside shadow DOM", async () => {
      await expect(shadowDomPage.insideShadowDom).toHaveText(
        "Hello from Shadow DOM!",
      );
    });
  });
});
