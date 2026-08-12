import { test, expect } from "../../fixtures/test-fixtures";
import common from "../../utils/common-functions";

test.describe("Search Product", () => {
  test("Search Product Flow", async ({ page, homePage, searchProduct }) => {
    await test.step("Verify that home page is visible successfully", async () => {
      await page.goto("/");
      await expect(homePage.automationLogoImage).toBeVisible();
    });

    await test.step(`Click on 'Products' button & verify user is navigated to ALL PRODUCTS page`, async () => {
      await common.safeClick(page, homePage.products);
    });

    await test.step(`Enter product name in search input and click search button`, async () => {
      const productName = "Winter Top";
      await searchProduct.searchFor(productName);
      await expect(searchProduct.searchedProduct(productName)).toBeVisible();
    });
  });
});
