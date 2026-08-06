import { Page } from "@playwright/test";

class RegisterUser {
    private page: Page

    constructor(page: Page) {
        this.page = page;
    }

    get newUserSignup() {
        return this.page.locator('h2', { hasText: 'New User Signup!' });
    }

    get signupName() {
        return this.page.getByTestId('signup-name');
    }

    get signupEmail() {
        return this.page.getByTestId('signup-email');
    }

    get signupButton() {
        return this.page.getByTestId('signup-button');
    }

    get enterAccountInformation() {
        return this.page.getByRole('heading', { name: 'Enter Account Information' });
    }

    get mrRadio() {
        return this.page.getByLabel('Mr.');
    }

    get mrsRadio() {
        return this.page.getByLabel('Mrs.');
    }

    get accountInfoName() {
        return this.page.getByTestId('name');
    }

    get accountInfoEmail() {
        return this.page.getByTestId('email');
    }

    get accountInfoPassword() {
        return this.page.getByTestId('password');
    }

    get dobDay() {
        return this.page.getByTestId('days');
    }

    get dobMonth() {
        return this.page.getByTestId('months');
    }

    get dobYear() {
        return this.page.getByTestId('years');
    }

    get newsletterSignupCheckbox() {
        return this.page.getByRole('checkbox', { name: 'Sign up for our newsletter!' });
    }

    get specialOfferCheckbox() {
        return this.page.getByRole('checkbox', { name: 'Receive special offers from our partners!' });
    }

    get addressInfoFirstName() {
        return this.page.getByTestId('first_name');
    }

    get addressInfoLastName() {
        return this.page.getByTestId('last_name');
    }

    get addressInfoCompany() {
        return this.page.getByTestId('company');
    }

    get addressInfoAddress() {
        return this.page.getByTestId('address');
    }

    get addressInfoAddress2() {
        return this.page.getByTestId('address2');
    }

    get addressInfoCountry() {
        return this.page.getByTestId('country');
    }

    get addressInfoState() {
        return this.page.getByTestId('state');
    }

    get addressInfoCity() {
        return this.page.getByTestId('city');
    }

    get addressInfoZipcode() {
        return this.page.getByTestId('zipcode');
    }

    get addressInfoMobileNumber() {
        return this.page.getByTestId('mobile_number');
    }

    get createAccountButton() {
        return this.page.getByTestId('create-account');
    }

    get accountCreated() {
        return this.page.getByTestId('account-created');
    }

    get continueButtonAfterAccountCreationAndDeletion() {
        return this.page.getByTestId('continue-button');
    }

    get accountDeleted() {
        return this.page.getByTestId('account-deleted');
    }

    get emailExistError() {
        return this.page.getByText('Email Address already exist!');
    }

    async startSignup(name: string, email: string) {
        await this.signupName.fill(name);
        await this.signupEmail.fill(email);
        await this.signupButton.click();
    }

    async fillAccountInformation(user: {
        name: string;
        email: string;
        password: string;
        title?: 'Mr.' | 'Mrs.';
        dobDay?: string;
        dobMonth?: string;
        dobYear?: string;
        newsletter?: boolean;
        specialOffers?: boolean;
        firstName?: string;
        lastName?: string;
        company?: string;
        address?: string;
        address2?: string;
        country?: string;
        state?: string;
        city?: string;
        zipcode?: string;
        mobileNumber?: string;
    }) {
        const title = user.title ?? 'Mr.';
        if (title === 'Mr.') {
            await this.mrRadio.check();
        } else {
            await this.mrsRadio.check();
        }

        await this.accountInfoPassword.fill(user.password);
        await this.dobDay.selectOption(user.dobDay ?? '10');
        await this.dobMonth.selectOption(user.dobMonth ?? 'January');
        await this.dobYear.selectOption(user.dobYear ?? '2000');

        if (user.newsletter) {
            await this.newsletterSignupCheckbox.check();
        }

        if (user.specialOffers) {
            await this.specialOfferCheckbox.check();
        }

        await this.addressInfoFirstName.fill(user.firstName ?? user.name);
        await this.addressInfoLastName.fill(user.lastName ?? user.name);
        await this.addressInfoCompany.fill(user.company ?? '');
        await this.addressInfoAddress.fill(user.address ?? '');
        await this.addressInfoAddress2.fill(user.address2 ?? '');
        if (user.country) {
            await this.addressInfoCountry.selectOption(user.country);
        }
        await this.addressInfoState.fill(user.state ?? '');
        await this.addressInfoCity.fill(user.city ?? '');
        await this.addressInfoZipcode.fill(user.zipcode ?? '');
        await this.addressInfoMobileNumber.fill(user.mobileNumber ?? '');
    }

    async createAccount() {
        await this.createAccountButton.click();
    }

    async continueAfterAccountCreation() {
        await this.continueButtonAfterAccountCreationAndDeletion.click();
    }

    async deleteAccount() {
        await this.page.getByRole('link', { name: ' Delete Account' }).click();
    }
}

export default RegisterUser;
