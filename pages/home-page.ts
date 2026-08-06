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

    get deleteAccountLink() {
        return this.page.getByRole('link', { name: ' Delete Account' });
    }

    get logoutLink() {
        return this.page.getByRole('link', { name: ' Logout' });
    }

    get contactUs() {
        return this.page.getByRole('link', { name: ' Contact us' });
    }

    async open() {
        await this.page.goto('/');
    }

    async goToSignupOrLogin() {
        await this.signupOrLogin.click();
    }

    async goToProducts() {
        await this.products.click();
    }

    async goToCart() {
        await this.cart.click();
    }

    async goToContactUs() {
        await this.contactUs.click();
    }

    async goToTestCases() {
        await this.testCases.click();
    }

    async logout() {
        await this.logoutLink.click();
    }

    async deleteAccount() {
        await this.deleteAccountLink.click();
    }

    async scrollUp() {
        await this.scrollUpIcon.click();
    }

    get testCases() {
        return this.page.locator('a[href="/test_cases"]').first();
    }

    get products() {
        return this.page.getByRole('link', { name: ' Products' });
    }

    get cart() {
        return this.page.getByRole('link', { name: ' Cart' });
    }

    get scrollUpIcon() {
        return this.page.locator('id=scrollUp');
    }

    get sliderCarousel() {
        return this.page.locator('id=slider-carousel');
    }

}

export default HomePage;