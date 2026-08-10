import { test, expect } from "../fixtures/test-fixtures";
import common from "../utils/common-functions";

test.describe("View Brand Products", () => {
  test("View & Cart Brand Products Flow", async ({
    page,
    homePage,
    brandPage,
  }) => {
    await test.step("Verify that home page is visible successfully", async () => {
      await page.goto("/");
      await expect(homePage.automationLogoImage).toBeVisible();
    });

    await test.step("Click on 'Products' button and verify navigation to products page", async () => {
      await common.safeClick(page, homePage.products);
      await expect(brandPage.brandsHeading).toBeVisible();
    });

    await test.step("Verify that Brands are visible on left side bar", async () => {
      await expect(brandPage.brandLink("Polo")).toBeVisible();
      await expect(brandPage.brandLink("H&M")).toBeVisible();
    });

    await test.step("Click on a brand name and verify brand products page", async () => {
      await brandPage.selectBrand("Polo");
      await expect(brandPage.brandPageTitle("Polo")).toBeVisible();
      await expect(brandPage.brandProductsSection).toBeVisible();
    });

    await test.step("Click on another brand name and verify the new brand page", async () => {
      await brandPage.selectBrand("H&M");
      await expect(brandPage.brandPageTitle("H&M")).toBeVisible();
      await expect(brandPage.brandProductsSection).toBeVisible();
    });
  });
});
