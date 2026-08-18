import { test, expect } from "../../fixtures/qa-automation-labs/fixtures";

test.describe("File Upload Flow", () => {
  test("File Upload Flow", async ({ page, menusPage, fileUploadPage }) => {
    await page.goto("https://testing.qaautomationlabs.com/");
    await menusPage.testingMenu.click();
    await expect(menusPage.dashboardBanner).toBeVisible();
    await fileUploadPage.uploadMenu.click();

    await test.step("Upload the file and verify the file name", async () => {
      await fileUploadPage.fileUploadButton.setInputFiles({
        name: "fileUpload.txt",
        mimeType: "text/plain",
        buffer: Buffer.from("Sample test file"),
      });
      // await fileUploadPage.fileUploadButton.setInputFiles('./fileUpload.txt');
      await expect(fileUploadPage.uploadedFileInfo).toContainText(
        "fileUpload.txt",
      );
    });
  });
});
