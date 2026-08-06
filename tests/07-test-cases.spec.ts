import { test, expect } from "../fixtures/test-fixtures";
import common from "../utils/common-functions";

test.describe("Verify Test Cases Page", () => {
  test("Verify Test Cases Page Flow", async ({
    page,
    homePage,
    testCasesPage,
  }) => {
    await test.step("Verify that home page is visible successfully", async () => {
      await page.goto("/");
      await expect(homePage.automationLogoImage).toBeVisible();
    });

    await test.step(`Click on 'Test Cases' button & verify user is navigated to test cases page successfully`, async () => {
      await common.safeClick(page, homePage.testCases);
      await expect(testCasesPage.testCasesHeaading).toBeVisible();
    });
  });
});
