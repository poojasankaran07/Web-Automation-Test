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

test.describe('User register Flow', () => {
  test('Register User Flow', async ({ page, registerPage, homePage }) => {
    await test.step('Verify that home page is visible successfully', async () => {
      await page.goto('https://automationexercise.com/');
      await expect(homePage.automationLogoImage).toBeVisible();
    })

    await test.step(`Click on 'Signup / Login' button & verify 'New User Signup!' is visible`, async () => {
      await safeClick(page, homePage.signupOrLogin);
      await expect(registerPage.newUserSignup).toBeVisible();
    })

    await test.step(`Enter name and email address & click 'Signup' button to verify that 'ENTER ACCOUNT INFORMATION' is visible`, async () => {
      await registerPage.signupName.fill(user.name);
      await registerPage.signupEmail.fill(user.email);
      await safeClick(page, registerPage.signupButton);
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

      await registerPage.accountInfoPassword.fill('Test@123');

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
    })

    await test.step(`Click 'Create Account button' & verify that 'ACCOUNT CREATED!' is visible`, async () => {
      await safeClick(page, registerPage.createAccountButton);
      await expect(registerPage.accountCreated).toBeVisible();
    })

    await test.step(`Click 'Continue' button & verify that 'Logged in as username' is visible`, async () => {
      await safeClick(page, registerPage.continueButtonAfterAccountCreationAndDeletion);
      await expect(homePage.loggedInUser).toContainText(`Logged in as ${user.name}`);
    })

    await test.step(`Click 'Delete Account' button`, async () => {
      await safeClick(page, homePage.deleteAccount);
      await expect(registerPage.accountDeleted).toBeVisible();
      await safeClick(page, registerPage.continueButtonAfterAccountCreationAndDeletion);
      await expect(homePage.signupOrLogin).toBeVisible();
    })
  })

});