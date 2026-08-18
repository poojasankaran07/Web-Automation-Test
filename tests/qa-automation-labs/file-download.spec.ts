import { test, expect } from "../../fixtures/qa-automation-labs/fixtures";

test.describe("Download File Flow", () => {
  test("Download File Flow", async ({ page, menusPage, downloadPage }) => {
    await page.goto("/", {
      waitUntil: "domcontentloaded",
    });
    await menusPage.testingMenu.click();
    await expect(menusPage.dashboardBanner).toBeVisible();
    await downloadPage.downloadMenu.click();

    await test.step("Click on Show Alert and verify the alert message and output message", async () => {
      await downloadPage.textArea.fill("Test");
      await downloadPage.generateFileButton.click();
      const downloadPromise = page.waitForEvent("download");
      await downloadPage.downloadFile.click();
      const downloadedFile = await downloadPromise;
      const fileName = downloadedFile.suggestedFilename();
      expect(fileName).toContain("myfile.txt");

      const path = await downloadedFile.path();
      expect(path).not.toBeNull();
    });
  });
});
