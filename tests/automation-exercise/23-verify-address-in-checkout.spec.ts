import { test, expect } from "../../fixtures/test-fixtures";
import dataGenerator from "../../utils/data-generator";

const user = {
  name: dataGenerator.generateName(),
  lastName: dataGenerator.generateLastName(),
  email: dataGenerator.generateEmail(),
  company: dataGenerator.generateCompany(),
  address: dataGenerator.generateAddress(),
  address2: dataGenerator.generateAddress2(),
  country: "India",
  state: "Karnataka",
  city: "Bangalore",
  zipcode: "560038",
  mobileNumber: "9999999999",
};

test.describe("Verify address details in checkout page", () => {
  test("Verify address details in checkout page Flow", async ({
    page,
    homePage,
    productsPage,
    cartPage,
    registerPage,
    checkoutPage,
  }) => {
    const addedProducts: {
      id: number;
      name: string;
      price: string;
    }[] = [];

    await test.step("Open home page and verify it is visible", async () => {
      await homePage.open();
      await expect(homePage.automationLogoImage).toBeVisible();
    });

    await test.step(`Navigate to signup page`, async () => {
      await homePage.goToSignupOrLogin();
    });

    await test.step(`Fill all details in Signup and create account`, async () => {
      await registerPage.startSignup(user.name, user.email);
      await expect(registerPage.enterAccountInformation).toBeVisible();

      await registerPage.fillAccountInformation({
        name: user.name,
        email: user.email,
        password: "Test@123",
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

      await registerPage.createAccount();
      await expect(registerPage.accountCreated).toBeVisible();
    });

    await test.step(`Click 'Continue' button & verify that 'Logged in as username' is visible`, async () => {
      await registerPage.continueAfterAccountCreation();
      await expect(homePage.loggedInUser).toContainText(
        `Logged in as ${user.name}`,
      );
    });

    await test.step(`Navigate to products page`, async () => {
      await homePage.goToProducts();
    });

    await test.step(`Add products to cart & go to cart page`, async () => {
      await productsPage.productCard(1).hover();

      const product1 = await productsPage.getProductDetails(1);
      await productsPage.addToCart(1);
      addedProducts.push(product1);

      await productsPage.viewCart();
    });

    await test.step(`Verify that cart page is displayed`, async () => {
      await expect(cartPage.productRow(1)).toBeVisible();
    });

    await test.step(`Click Proceed To Checkout`, async () => {
      await cartPage.proceedToCheckout();
    });

    await test.step("Verify delivery address", async () => {
      await expect(
        checkoutPage.addressCompany(checkoutPage.deliveryAddress),
      ).toContainText(user.company);

      await expect(
        checkoutPage.address1(checkoutPage.deliveryAddress),
      ).toContainText(user.address);

      await expect(
        checkoutPage.address2(checkoutPage.deliveryAddress),
      ).toContainText(user.address2);

      await expect(
        checkoutPage.cityStateZip(checkoutPage.deliveryAddress),
      ).toContainText(`${user.city} ${user.state} ${user.zipcode}`);

      await expect(
        checkoutPage.country(checkoutPage.deliveryAddress),
      ).toContainText(user.country);

      await expect(
        checkoutPage.phone(checkoutPage.deliveryAddress),
      ).toContainText(user.mobileNumber);
    });

    await test.step("Verify billing address", async () => {
      await expect(
        checkoutPage.addressCompany(checkoutPage.deliveryAddress),
      ).toContainText(user.company);

      await expect(
        checkoutPage.address1(checkoutPage.deliveryAddress),
      ).toContainText(user.address);

      await expect(
        checkoutPage.address2(checkoutPage.deliveryAddress),
      ).toContainText(user.address2);

      await expect(
        checkoutPage.cityStateZip(checkoutPage.billingAddress),
      ).toContainText(`${user.city} ${user.state} ${user.zipcode}`);

      await expect(
        checkoutPage.country(checkoutPage.billingAddress),
      ).toContainText(user.country);

      await expect(
        checkoutPage.phone(checkoutPage.billingAddress),
      ).toContainText(user.mobileNumber);
    });

    await test.step(`Click 'Delete Account' button`, async () => {
      await homePage.deleteAccount();
      await expect(registerPage.accountDeleted).toBeVisible();
      await registerPage.continueAfterAccountCreation();
      await expect(homePage.signupOrLogin).toBeVisible();
    });
  });
});
