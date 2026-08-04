import { test, expect } from '../fixtures/test-fixtures';
import { safeClick } from '../utils/helper';

const random = Math.floor(Math.random() * 100000);

const user = {
    name: `TestName_${random}`,
    lastName: `TestLastName_${random}`,
    email: `testemail${random}@yopmail.com`,
    company: `Company_${random}`,
    address: `123 Main Street ${random}`,
    address2: `Near_${random}`,
    country: 'India',
    state: 'Karnataka',
    city: 'Bangalore',
    zipcode: '560038',
    mobileNumber: '9999999999'
};

const cardDetails = {
    cardName: `TestName_${random}`,
    cardNumber: '12345',
    cardCvv: '123',
    expiryMonth: '12',
    expiryYear: '2030'
}

test.describe('Verify All Products and product detail page', () => {
    test('Verify All Products and product detail page Flow', async ({ page, homePage, productsPage, cartPage, registerPage, checkoutPage }) => {
        const addedProducts: {
            id: number;
            name: string;
            price: string;
        }[] = [];

        await test.step('Verify that home page is visible successfully', async () => {
            await page.goto('https://automationexercise.com/');
            await expect(homePage.automationLogoImage).toBeVisible();
        })

        await test.step(`Click on 'Products' button & verify user is navigated to ALL PRODUCTS page`, async () => {
            await safeClick(page, homePage.products);
        })

        await test.step(`Add products to cart & go to cart page`, async () => {
            await productsPage.productCard(1).hover();

            const product1 = await productsPage.getProductDetails(1);
            await safeClick(page, productsPage.addToCart(1));
            addedProducts.push(product1);

            await safeClick(page, productsPage.viewCart);
        })

        await test.step(`Verify that cart page is displayed`, async () => {
            await expect(cartPage.productRow(1)).toBeVisible();
        })

        await test.step(`Click Proceed To Checkout & Click 'Register / Login' button`, async () => {
            await safeClick(page, cartPage.proceedToCheckout);
            await safeClick(page, cartPage.registerOrLoginLink);
        })

        await test.step(`Fill all details in Signup and create account`, async () => {
            await registerPage.signupName.fill(user.name);
            await registerPage.signupEmail.fill(user.email);
            await safeClick(page, registerPage.signupButton);
            await expect(registerPage.enterAccountInformation).toBeVisible();

            const chooseMr = Math.random() < 0.5;
            if (chooseMr) {
                await registerPage.mrRadio.check();
                await expect(registerPage.mrRadio).toBeChecked();
            } else {
                await registerPage.mrsRadio.check();
                await expect(registerPage.mrsRadio).toBeChecked();
            }

            await expect(registerPage.accountInfoName).toHaveValue(user.name);
            await expect(registerPage.accountInfoName).toBeEditable();

            await expect(registerPage.accountInfoEmail).toHaveValue(user.email);
            await expect(registerPage.accountInfoEmail).not.toBeEditable();

            await registerPage.accountInfoPassword.fill('Test@123');

            await registerPage.dobDay.selectOption('10');
            await registerPage.dobMonth.selectOption('January');
            await registerPage.dobYear.selectOption('2000');

            await registerPage.newsletterSignupCheckbox.check();
            await expect(registerPage.newsletterSignupCheckbox).toBeChecked();

            await registerPage.specialOfferCheckbox.check();
            await expect(registerPage.specialOfferCheckbox).toBeChecked();

            await registerPage.addressInfoFirstName.fill(user.name);
            await registerPage.addressInfoLastName.fill(user.lastName);
            await registerPage.addressInfoCompany.fill(user.company);
            await registerPage.addressInfoAddress.fill(user.address);
            await registerPage.addressInfoAddress2.fill(user.address2);
            await registerPage.addressInfoCountry.selectOption(user.country);
            await registerPage.addressInfoState.fill(user.state);
            await registerPage.addressInfoCity.fill(user.city);
            await registerPage.addressInfoZipcode.fill(user.zipcode);
            await registerPage.addressInfoMobileNumber.fill(user.mobileNumber);

            await safeClick(page, registerPage.createAccountButton);
            await expect(registerPage.accountCreated).toBeVisible();
        })

        await test.step(`Click 'Continue' button & verify that 'Logged in as username' is visible`, async () => {
            await safeClick(page, registerPage.continueButtonAfterAccountCreationAndDeletion);
            await expect(homePage.loggedInUser).toContainText(`Logged in as ${user.name}`);
        })

        await test.step(`Click 'Cart' button & Click 'Proceed To Checkout' button`, async () => {
            await safeClick(page, homePage.cart);
            await safeClick(page, cartPage.proceedToCheckout);
        })

        await test.step(`Enter description in comment text area and click 'Place Order'`, async () => {
            await checkoutPage.checkoutComment.fill('Random Text Passed');
            await safeClick(page, checkoutPage.placeorder);
        })

        await test.step(`Enter payment details: Name on Card, Card Number, CVC, Expiration date`, async () => {
            await checkoutPage.cardName.fill(cardDetails.cardName);
            await checkoutPage.cardNumber.fill(cardDetails.cardNumber);
            await checkoutPage.cardCvv.fill(cardDetails.cardCvv);
            await checkoutPage.cardExpiryMonth.fill(cardDetails.expiryMonth);
            await checkoutPage.cardExpiryYear.fill(cardDetails.expiryYear);
        })

        await test.step(`Click 'Pay and Confirm Order' button & verify success message`, async () => {
            await safeClick(page, checkoutPage.finalPayButton);
            await expect(checkoutPage.orderConfirmationMessage).toBeVisible();
        })

        await test.step(`Click 'Delete Account' button`, async () => {
            await safeClick(page, homePage.deleteAccount);
            await expect(registerPage.accountDeleted).toBeVisible();
            await safeClick(page, registerPage.continueButtonAfterAccountCreationAndDeletion);
            await expect(homePage.signupOrLogin).toBeVisible();
        })
    })
})