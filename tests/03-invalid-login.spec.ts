import { test, expect } from "../fixtures/test-fixtures";

const incorrectUserDetail = {
  name: "No User",
  email: "nouser@abc.com",
  password: "Test@123",
};

test.describe("Login User with incorrect email and password", () => {
  test("Verify Invalid Login Flow", async ({ homePage, loginPage }) => {
    await test.step("Open home page and verify it is visible", async () => {
      await homePage.open();
      await expect(homePage.automationLogoImage).toBeVisible();
    });

    await test.step(`Navigate to login page and verify login form is visible`, async () => {
      await homePage.goToSignupOrLogin();
      await expect(loginPage.loginToAccount).toBeVisible();
    });

    await test.step("Login with incorrect email and password", async () => {
      await loginPage.login(
        incorrectUserDetail.email,
        incorrectUserDetail.password,
      );
    });

    await test.step(`Verify error 'Your email or password is incorrect!' is visible`, async () => {
      await expect(loginPage.invalidLoginError).toBeVisible();
    });
  });
});
