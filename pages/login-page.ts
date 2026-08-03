import { Page } from '@playwright/test';

class LoginPage {
    private page: Page
    constructor(page: Page) {
        this.page = page;
    }

    get loginToAccount() {
        return this.page.locator('h2', { hasText: 'Login to your account' });
    }

    get loginEmail() {
        return this.page.getByTestId('login-email');
    }

    get loginPassword() {
        return this.page.getByTestId('login-password');
    }

    get loginButton() {
        return this.page.getByTestId('login-button');
    }

    get invalidLoginError() {
        return this.page.getByText('Your email or password is incorrect!');
    }

}

export default LoginPage;