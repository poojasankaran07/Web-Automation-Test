import { test, expect } from "../../fixtures/test-fixtures";
import dataGenerator from "../../utils/data-generator";

const user = {
  name: dataGenerator.generateName(),
  lastName: dataGenerator.generateLastName(),
  email: dataGenerator.generateEmail(),
  password: "Test@123",
  company: dataGenerator.generateCompany(),
  address: dataGenerator.generateAddress(),
  address2: dataGenerator.generateAddress2(),
  country: "India",
  state: "Karnataka",
  city: "Bangalore",
  zipcode: "560038",
  mobileNumber: "9999999999",
};

test.describe("User register Flow", () => {
  test("Register User Flow", async ({ registerPage, homePage }) => {
    await test.step("Open home page and verify it is visible", async () => {
      await homePage.open();
      await expect(homePage.automationLogoImage).toBeVisible();
    });

    await test.step(`Navigate to signup page and verify 'New User Signup!' is visible`, async () => {
      await homePage.goToSignupOrLogin();
      await expect(registerPage.newUserSignup).toBeVisible();
    });

    await test.step(`Enter name and email address & start signup`, async () => {
      await registerPage.startSignup(user.name, user.email);
      await expect(registerPage.enterAccountInformation).toBeVisible();
    });

    await test.step(`Fill account and address information`, async () => {
      await registerPage.fillAccountInformation({
        name: user.name,
        email: user.email,
        password: user.password,
        title: "Mr.",
        dobDay: "10",
        dobMonth: "January",
        dobYear: "2000",
        newsletter: true,
        specialOffers: true,
        firstName: user.name,
        lastName: user.lastName,
        company: user.company,
        address: user.address,
        address2: user.address2,
        country: user.country,
        state: user.state,
        city: user.city,
        zipcode: user.zipcode,
        mobileNumber: user.mobileNumber,
      });

      await expect(registerPage.accountInfoName).toHaveValue(user.name);
      await expect(registerPage.accountInfoEmail).toHaveValue(user.email);
      await expect(registerPage.newsletterSignupCheckbox).toBeChecked();
      await expect(registerPage.specialOfferCheckbox).toBeChecked();
    });

    await test.step(`Click 'Create Account button' & verify that 'ACCOUNT CREATED!' is visible`, async () => {
      await registerPage.createAccount();
      await expect(registerPage.accountCreated).toBeVisible();
    });

    await test.step(`Click 'Continue' button & verify that 'Logged in as username' is visible`, async () => {
      await registerPage.continueAfterAccountCreation();
      await expect(homePage.loggedInUser).toContainText(
        `Logged in as ${user.name}`,
      );
    });

    await test.step(`Click 'Delete Account' button`, async () => {
      await registerPage.deleteAccount();
      await expect(registerPage.accountDeleted).toBeVisible();
      await registerPage.continueAfterAccountCreation();
      await expect(homePage.signupOrLogin).toBeVisible();
    });
  });
});
