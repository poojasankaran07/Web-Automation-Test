import { test, expect } from '../fixtures/test-fixtures';
import common from '../utils/common-functions';
import dataGenerator from '../utils/data-generator';

const user = {
    name: dataGenerator.generateName(),
    lastName: dataGenerator.generateLastName(),
    email: dataGenerator.generateEmail(),
    company: dataGenerator.generateCompany(),
    address: dataGenerator.generateAddress(),
    address2: dataGenerator.generateAddress2(),
    country: 'India',
    state: 'Karnataka',
    city: 'Bangalore',
    zipcode: '560038',
    mobileNumber: '9999999999'
};

test.describe('Verify address details in checkout page', () => {
    test('Verify address details in checkout page Flow', async ({ page, homePage, productsPage, cartPage, registerPage, checkoutPage }) => {
        const addedProducts: {
            id: number;
            name: string;
            price: string;
        }[] = [];

        await test.step('Verify that home page is visible successfully', async () => {
            await page.goto('/');
            await expect(homePage.automationLogoImage).toBeVisible();
        })

        await test.step(`Click 'Signup / Login' button`, async () => {
            await common.safeClick(page, homePage.signupOrLogin);
        })

        await test.step(`Fill all details in Signup and create account`, async () => {
            await common.fillValue(registerPage.signupName, user.name);
            await common.fillValue(registerPage.signupEmail, user.email);
            await common.safeClick(page, registerPage.signupButton);
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

            await common.fillValue(registerPage.accountInfoPassword, 'Test@123');

            await registerPage.dobDay.selectOption('10');
            await registerPage.dobMonth.selectOption('January');
            await registerPage.dobYear.selectOption('2000');

            await registerPage.newsletterSignupCheckbox.check();
            await expect(registerPage.newsletterSignupCheckbox).toBeChecked();

            await registerPage.specialOfferCheckbox.check();
            await expect(registerPage.specialOfferCheckbox).toBeChecked();

            await common.fillValue(registerPage.addressInfoFirstName, user.name);
            await common.fillValue(registerPage.addressInfoLastName, user.lastName);
            await common.fillValue(registerPage.addressInfoCompany, user.company);
            await common.fillValue(registerPage.addressInfoAddress, user.address);
            await common.fillValue(registerPage.addressInfoAddress2, user.address2);
            await registerPage.addressInfoCountry.selectOption(user.country);
            await common.fillValue(registerPage.addressInfoState, user.state);
            await common.fillValue(registerPage.addressInfoCity, user.city);
            await common.fillValue(registerPage.addressInfoZipcode, user.zipcode);
            await common.fillValue(registerPage.addressInfoMobileNumber, user.mobileNumber);

            await common.safeClick(page, registerPage.createAccountButton);
            await expect(registerPage.accountCreated).toBeVisible();
        })

        await test.step(`Click 'Continue' button & verify that 'Logged in as username' is visible`, async () => {
            await common.safeClick(page, registerPage.continueButtonAfterAccountCreationAndDeletion);
            await expect(homePage.loggedInUser).toContainText(`Logged in as ${user.name}`);
        })

        await test.step(`Click on 'Products' button & verify user is navigated to ALL PRODUCTS page`, async () => {
            await common.safeClick(page, homePage.products);
        })

        await test.step(`Add products to cart & go to cart page`, async () => {
            await productsPage.productCard(1).hover();

            const product1 = await productsPage.getProductDetails(1);
            await common.safeClick(page, productsPage.addToCart(1));
            addedProducts.push(product1);

            await common.safeClick(page, productsPage.viewCart);
        })

        await test.step(`Verify that cart page is displayed`, async () => {
            await expect(cartPage.productRow(1)).toBeVisible();
        })

        await test.step(`Click Proceed To Checkout`, async () => {
            await common.safeClick(page, cartPage.proceedToCheckout);
        })

        await test.step('Verify delivery address', async () => {
            await expect(checkoutPage.addressCompany(checkoutPage.deliveryAddress))
                .toContainText(user.company);

            await expect(checkoutPage.address1(checkoutPage.deliveryAddress))
                .toContainText(user.address);

            await expect(checkoutPage.address2(checkoutPage.deliveryAddress))
                .toContainText(user.address2);

            await expect(checkoutPage.cityStateZip(checkoutPage.deliveryAddress))
                .toContainText(`${user.city} ${user.state} ${user.zipcode}`);

            await expect(checkoutPage.country(checkoutPage.deliveryAddress))
                .toContainText(user.country);

            await expect(checkoutPage.phone(checkoutPage.deliveryAddress))
                .toContainText(user.mobileNumber);
        });


        await test.step('Verify billing address', async () => {
            await expect(checkoutPage.addressCompany(checkoutPage.deliveryAddress))
                .toContainText(user.company);

            await expect(checkoutPage.address1(checkoutPage.deliveryAddress))
                .toContainText(user.address);

            await expect(checkoutPage.address2(checkoutPage.deliveryAddress))
                .toContainText(user.address2);

            await expect(checkoutPage.cityStateZip(checkoutPage.billingAddress))
                .toContainText(`${user.city} ${user.state} ${user.zipcode}`);

            await expect(checkoutPage.country(checkoutPage.billingAddress))
                .toContainText(user.country);

            await expect(checkoutPage.phone(checkoutPage.billingAddress))
                .toContainText(user.mobileNumber);
        });

        await test.step(`Click 'Delete Account' button`, async () => {
            await common.safeClick(page, homePage.deleteAccount);
            await expect(registerPage.accountDeleted).toBeVisible();
            await common.safeClick(page, registerPage.continueButtonAfterAccountCreationAndDeletion);
            await expect(homePage.signupOrLogin).toBeVisible();
        })
    })
})