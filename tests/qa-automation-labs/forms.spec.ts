import { test, expect } from "../../fixtures/qa-automation-labs/fixtures";

test.describe("Forms Flow", () => {
  test("Forms Flow", async ({ page, menusPage, formsPage }) => {
    await page.goto("https://testing.qaautomationlabs.com/");
    await menusPage.testingMenu.click();
    await expect(menusPage.dashboardBanner).toBeVisible();
    await formsPage.formsMenu.click();

    await test.step("Forms and Validation", async () => {
      await formsPage.firstName.fill("Pooja");
      await formsPage.middleName.fill("S");
      await formsPage.lastName.fill("Sankaran");
      await formsPage.email.fill("pooja@yopmail.com");
      await formsPage.password.fill("Test@123");
      await formsPage.address.fill("123 Main Road, Bengaluru");
      await formsPage.city.fill("Bengaluru");
      await formsPage.state.fill("Karnataka");
      await formsPage.pincode.fill("123456");
      await formsPage.submitButton.click();
      await expect(formsPage.formSubmitSuccessMessage).toBeVisible();
    });
  });
});
