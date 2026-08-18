import { test, expect } from "../../fixtures/qa-automation-labs/fixtures";

test.describe("Dropdown Flow", () => {
  test("Dropdown Flow", async ({ page, menusPage, dropdownPage }) => {
    await page.goto("/", {
      waitUntil: "domcontentloaded",
    });
    await menusPage.testingMenu.click();
    await expect(menusPage.dashboardBanner).toBeVisible();
    await dropdownPage.dropdownMenu.click();

    await test.step("Single Select Option", async () => {
      await dropdownPage.singleSelectDropdown.selectOption("Apple");
      await expect(dropdownPage.singleDropdownResult).toHaveText(
        "You selected: Apple",
      );
      await expect(dropdownPage.singleSelectDropdown).toHaveValue("Apple");

      await dropdownPage.singleSelectDropdown.selectOption("Banana");
      await expect(dropdownPage.singleDropdownResult).toHaveText(
        "You selected: Banana",
      );
      await expect(dropdownPage.singleSelectDropdown).toHaveValue("Banana");

      await dropdownPage.singleSelectDropdown.selectOption("Mango");
      await expect(dropdownPage.singleDropdownResult).toHaveText(
        "You selected: Mango",
      );
      await expect(dropdownPage.singleSelectDropdown).toHaveValue("Mango");

      await dropdownPage.singleSelectDropdown.selectOption("Orange");
      await expect(dropdownPage.singleDropdownResult).toHaveText(
        "You selected: Orange",
      );
      await expect(dropdownPage.singleSelectDropdown).toHaveValue("Orange");
    });

    await test.step("Multi Selection Option", async () => {
      await dropdownPage.multipleDropdownSelect.selectOption([
        "India",
        "USA",
        "UK",
        "Canada",
        "Australia",
      ]);
      await expect(dropdownPage.multipleDropdownSelect).toHaveValues([
        "India",
        "USA",
        "UK",
        "Canada",
        "Australia",
      ]);
    });
  });
});
