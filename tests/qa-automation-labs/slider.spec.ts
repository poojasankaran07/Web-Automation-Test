import { test, expect } from "../../fixtures/qa-automation-labs/fixtures";

test.describe("Slider Flow", () => {
  test("Slider Flow", async ({ page, menusPage, sliderPage }) => {
    await page.goto("/", {
      waitUntil: "domcontentloaded",
    });
    await menusPage.testingMenu.click();
    await expect(menusPage.dashboardBanner).toBeVisible();
    await sliderPage.sliderMenu.click();

    await test.step("Slider value for 1st slider", async () => {
      await expect(sliderPage.sliderValue(1)).toHaveText("10");
      await sliderPage.slider(1).fill("100");
      await expect(sliderPage.sliderValue(1)).toHaveText("100");
    });

    await test.step("Slider value for 1st slider", async () => {
      await expect(sliderPage.sliderValue(2)).toHaveText("20");
      await sliderPage.slider(2).fill("75");
      await expect(sliderPage.sliderValue(2)).toHaveText("75");
    });
  });
});
