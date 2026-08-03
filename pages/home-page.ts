import { Page } from '@playwright/test';

class HomePage {
    private page: Page
    constructor(page: Page) {
        this.page = page;
    }

    get automationLogoImage() {
        return this.page.getByAltText('Website for automation practice');
    }

    get signupOrLogin() {
        return this.page.getByRole('link', { name: ' Signup / Login' });
    }

    get loggedInUser() {
        return this.page.locator('a').filter({
            hasText: 'Logged in as'
        });
    }

    get deleteAccount() {
        return this.page.getByRole('link', { name: ' Delete Account' });
    }

    get logout() {
        return this.page.getByRole('link', { name: ' Logout' });
    }

    get contactUs() {
        return this.page.getByRole('link', { name: ' Contact us' });
    }

    get testCases() {
        return this.page.locator('a[href="/test_cases"]').first();
    }

    get products() {
        return this.page.getByRole('link', { name: ' Products' });
    }

}

export default HomePage;