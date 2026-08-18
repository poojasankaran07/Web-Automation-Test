import { test, expect } from "../../fixtures/qa-automation-labs/fixtures";

test.describe("Javascript Alert Flow", () => {
  test("Javascript Alert Flow", async ({ page, menusPage, jsAlertPage }) => {
    await page.goto("https://testing.qaautomationlabs.com/");
    await menusPage.testingMenu.click();
    await expect(menusPage.dashboardBanner).toBeVisible();
    await jsAlertPage.jsAlertMenu.click();

    await test.step("Click on Show Alert and verify the alert message and output message", async () => {
      page.once("dialog", (dialog) => {
        expect(dialog.message()).toBe("This is an alert message!");
        dialog.accept();
      });
      await jsAlertPage.showAlertbutton.click();
      await expect(jsAlertPage.alertMessageOutput).toHaveText("Alert shown.");
    });

    await test.step("Click on Show Alert and verify the alert message and output message by clicking cancel", async () => {
      page.once("dialog", (dialog) => {
        expect(dialog.message()).toBe("Do you confirm this action?");
        dialog.dismiss();
      });
      await jsAlertPage.showConfirmButton.click();
      await expect(jsAlertPage.alertMessageOutput).toHaveText(
        "You clicked Cancel on confirm button.",
      );
    });

    await test.step("Click on Show Alert and verify the alert message and output message by clicking ok", async () => {
      page.once("dialog", (dialog) => {
        expect(dialog.message()).toBe("Do you confirm this action?");
        dialog.accept();
      });
      await jsAlertPage.showConfirmButton.click();
      await expect(jsAlertPage.alertMessageOutput).toHaveText(
        "You clicked OK on confirm button.",
      );
    });

    await test.step("Click on Show Prompt and verify the alert message and pass any input", async () => {
      page.once("dialog", (dialog) => {
        expect(dialog.message()).toBe("What is your name?");
        dialog.accept("Pooja");
      });
      await jsAlertPage.showPromptButton.click();
      await expect(jsAlertPage.alertMessageOutput).toHaveText(
        "You entered: Pooja",
      );
    });

    await test.step("Click on Show Prompt and verify the alert message and pass any input", async () => {
      page.once("dialog", (dialog) => {
        expect(dialog.message()).toBe("What is your name?");
        dialog.dismiss();
      });
      await jsAlertPage.showPromptButton.click();
      await expect(jsAlertPage.alertMessageOutput).toHaveText(
        "Prompt was cancelled or empty.",
      );
    });
  });
});
