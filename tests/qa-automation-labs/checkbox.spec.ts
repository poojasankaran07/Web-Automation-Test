import { test, expect } from "../../fixtures/qa-automation-labs/fixtures";

test.describe.only("CheckBox Flow", () => {
  test("CheckBox Flow", async ({ page, menusPage, checkBoxPage }) => {
    // await page.goto("https://testing.qaautomationlabs.com/");
    await page.goto("/", {
      waitUntil: "domcontentloaded",
    });
    await menusPage.testingMenu.click();
    await expect(menusPage.dashboardBanner).toBeVisible();
    await checkBoxPage.checkBoxMenu.click();

    await test.step("Single Checkbox", async () => {
      await expect(checkBoxPage.singleCheckBox).toBeVisible();
      await expect(checkBoxPage.singleCheckBox).toBeEnabled();
      await expect(checkBoxPage.singleCheckBox).not.toBeChecked();
      await checkBoxPage.singleCheckBox.check();
      await expect(checkBoxPage.singleCheckBox).toBeChecked();
      await expect(checkBoxPage.checkBoxMessage).toBeVisible();

      await checkBoxPage.singleCheckBox.uncheck();
      await expect(checkBoxPage.enableCheckBoxes(1)).not.toBeChecked();
      await expect(checkBoxPage.checkBoxMessage).not.toBeVisible();
    });

    await test.step("Disabled Checkbox", async () => {
      await expect(checkBoxPage.enableCheckBoxes(1)).toBeEnabled();
      await checkBoxPage.enableCheckBoxes(1).check();
      await expect(checkBoxPage.enableCheckBoxes(1)).toBeChecked();

      await expect(checkBoxPage.enableCheckBoxes(2)).toBeEnabled();
      await checkBoxPage.enableCheckBoxes(2).check();
      await expect(checkBoxPage.enableCheckBoxes(2)).toBeChecked();

      await expect(checkBoxPage.disableCheckBoxes(3)).toBeDisabled();
      await expect(checkBoxPage.disableCheckBoxes(4)).toBeDisabled();
    });

    await test.step("Multiple Checkbox", async () => {
      await checkBoxPage.checkUncheckAllButton.click();
      await expect(checkBoxPage.multipleCheckBox(1)).toBeChecked();
      await expect(checkBoxPage.multipleCheckBox(2)).toBeChecked();
      await expect(checkBoxPage.multipleCheckBox(3)).toBeChecked();
      await expect(checkBoxPage.multipleCheckBox(4)).toBeChecked();

      await checkBoxPage.checkUncheckAllButton.click();
      await expect(checkBoxPage.multipleCheckBox(1)).not.toBeChecked();
      await expect(checkBoxPage.multipleCheckBox(2)).not.toBeChecked();
      await expect(checkBoxPage.multipleCheckBox(3)).not.toBeChecked();
      await expect(checkBoxPage.multipleCheckBox(4)).not.toBeChecked();
    });
  });
});
