import { Page } from '@playwright/test';

class CheckoutPage {
    private page: Page
    constructor(page: Page) {
        this.page = page;
    }

    get checkoutComment() {
        return this.page.locator('.form-control');
    }

    get placeorder() {
        return this.page.getByRole('link', { name: 'Place Order' });
    }

    get cardName() {
        return this.page.getByTestId('name-on-card');
    }

    get cardNumber() {
        return this.page.getByTestId('card-number');
    }

    get cardCvv() {
        return this.page.getByTestId('cvc');
    }

    get cardExpiryMonth() {
        return this.page.getByTestId('expiry-month');
    }

    get cardExpiryYear() {
        return this.page.getByTestId('expiry-year');
    }

    get finalPayButton() {
        return this.page.getByTestId('pay-button');
    }

    get orderConfirmationMessage() {
        return this.page.getByText('Congratulations! Your order has been confirmed!');
    }
}

export default CheckoutPage;