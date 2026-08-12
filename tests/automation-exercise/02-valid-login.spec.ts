import { test, expect } from "../../fixtures/test-fixtures";

const existingUserDetail = {
  name: "Existing UserTest",
  email: "existingusertest@yopmail.com",
  password: "Test@123",
};

test.describe("Login User with correct email and password", () => {
  test("Login User with correct email and password Flow", async ({
    homePage,
    loginPage,
  }) => {
    await test.step("Open home page and verify it is visible", async () => {
      await homePage.open();
      await expect(homePage.automationLogoImage).toBeVisible();
    });

    await test.step(`Navigate to login page and verify login form is visible`, async () => {
      await homePage.goToSignupOrLogin();
      await expect(loginPage.loginToAccount).toBeVisible();
    });

    await test.step("Login with correct email and password", async () => {
      await loginPage.login(
        existingUserDetail.email,
        existingUserDetail.password,
      );
    });

    await test.step(`Verify that 'Logged in as username' is visible`, async () => {
      await expect(homePage.loggedInUser).toContainText(
        `Logged in as ${existingUserDetail.name}`,
      );
    });
  });
});
