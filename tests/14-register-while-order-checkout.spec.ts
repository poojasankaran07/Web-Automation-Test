import { test, expect } from "../fixtures/test-fixtures";
import common from "../utils/common-functions";
import dataGenerator from "../utils/data-generator";

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

const cardDetails = {
  cardName: dataGenerator.generateName(),
  cardNumber: "12345",
  cardCvv: "123",
  expiryMonth: "12",
  expiryYear: "2030",
};

test.describe("Place Order: Register while Checkout", () => {
  test("Place Order: Register while Checkout Flow", async ({
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

    await test.step(`Navigate to products page`, async () => {
      await homePage.goToProducts();
    });

    await test.step(`Add product to cart and go to cart page`, async () => {
      await productsPage.productCard(1).hover();

      const product1 = await productsPage.getProductDetails(1);
      await productsPage.addToCart(1);
      addedProducts.push(product1);

      await productsPage.viewCart();
    });

    await test.step(`Verify that cart page is displayed`, async () => {
      await expect(cartPage.productRow(1)).toBeVisible();
    });

    await test.step(`Click Proceed To Checkout & Click 'Register / Login' button`, async () => {
      await cartPage.proceedToCheckout();
      await cartPage.registerOrLogin();
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

      await expect(registerPage.accountInfoName).toHaveValue(user.name);
      await expect(registerPage.accountInfoEmail).toHaveValue(user.email);
      await expect(registerPage.newsletterSignupCheckbox).toBeChecked();
      await expect(registerPage.specialOfferCheckbox).toBeChecked();

      await registerPage.createAccount();
      await expect(registerPage.accountCreated).toBeVisible();
    });

    await test.step(`Click 'Continue' button & verify that 'Logged in as username' is visible`, async () => {
      await registerPage.continueAfterAccountCreation();
      await expect(homePage.loggedInUser).toContainText(
        `Logged in as ${user.name}`,
      );
    });

    await test.step(`Go to cart and proceed to checkout`, async () => {
      await homePage.goToCart();
      await cartPage.proceedToCheckout();
    });

    await test.step(`Enter description in comment text area and click 'Place Order'`, async () => {
      await checkoutPage.checkoutComment.fill("Random Text Passed");
      await checkoutPage.placeorder.click();
    });

    await test.step(`Enter payment details: Name on Card, Card Number, CVC, Expiration date`, async () => {
      await checkoutPage.cardName.fill(cardDetails.cardName);
      await checkoutPage.cardNumber.fill(cardDetails.cardNumber);
      await checkoutPage.cardCvv.fill(cardDetails.cardCvv);
      await checkoutPage.cardExpiryMonth.fill(cardDetails.expiryMonth);
      await checkoutPage.cardExpiryYear.fill(cardDetails.expiryYear);
    });

    await test.step(`Click 'Pay and Confirm Order' button & verify success message`, async () => {
      await common.safeClick(page, checkoutPage.finalPayButton);
      await expect(checkoutPage.orderConfirmationMessage).toBeVisible();
    });

    await test.step(`Click 'Delete Account' button`, async () => {
      await homePage.deleteAccount();
      await expect(registerPage.accountDeleted).toBeVisible();
      await common.safeClick(
        page,
        registerPage.continueButtonAfterAccountCreationAndDeletion,
      );
      await expect(homePage.signupOrLogin).toBeVisible();
    });
  });
});
