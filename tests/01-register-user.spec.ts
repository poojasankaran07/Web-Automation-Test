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

test.describe('User register Flow', () => {
  test('Register User Flow', async ({ page, registerPage, homePage }) => {
    await test.step('Verify that home page is visible successfully', async () => {
      await page.goto('https://automationexercise.com/');
      await expect(homePage.automationLogoImage).toBeVisible();
    })

    await test.step(`Click on 'Signup / Login' button & verify 'New User Signup!' is visible`, async () => {
      await common.safeClick(page, homePage.signupOrLogin);
      await expect(registerPage.newUserSignup).toBeVisible();
    })

    await test.step(`Enter name and email address & click 'Signup' button to verify that 'ENTER ACCOUNT INFORMATION' is visible`, async () => {
      await common.fillValue(registerPage.signupName, user.name);
      await common.fillValue(registerPage.signupEmail, user.email);
      await common.safeClick(page, registerPage.signupButton);
      await expect(registerPage.enterAccountInformation).toBeVisible();
    })

    await test.step(`Fill details: Title, Name, Email, Password, Date of birth`, async () => {
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
    })

    await test.step(`Select checkbox 'Sign up for our newsletter!'`, async () => {
      await registerPage.newsletterSignupCheckbox.check();
      await expect(registerPage.newsletterSignupCheckbox).toBeChecked();
    })

    await test.step(`Select checkbox 'Receive special offers from our partners!'`, async () => {
      await registerPage.specialOfferCheckbox.check();
      await expect(registerPage.specialOfferCheckbox).toBeChecked();
    })

    await test.step(`Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number`, async () => {
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
    })

    await test.step(`Click 'Create Account button' & verify that 'ACCOUNT CREATED!' is visible`, async () => {
      await common.safeClick(page, registerPage.createAccountButton);
      await expect(registerPage.accountCreated).toBeVisible();
    })

    await test.step(`Click 'Continue' button & verify that 'Logged in as username' is visible`, async () => {
      await common.safeClick(page, registerPage.continueButtonAfterAccountCreationAndDeletion);
      await expect(homePage.loggedInUser).toContainText(`Logged in as ${user.name}`);
    })

    await test.step(`Click 'Delete Account' button`, async () => {
      await common.safeClick(page, homePage.deleteAccount);
      await expect(registerPage.accountDeleted).toBeVisible();
      await common.safeClick(page, registerPage.continueButtonAfterAccountCreationAndDeletion);
      await expect(homePage.signupOrLogin).toBeVisible();
    })
  })

});