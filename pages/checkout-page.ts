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

    get deliveryAddress() {
        return this.page.locator('#address_delivery');
    }

    get billingAddress() {
        return this.page.locator('#address_invoice');
    }

    addressCompany(section: any) {
        return section.locator('.address_address1.address_address2').nth(0);
    }

    address1(section: any) {
        return section.locator('.address_address1.address_address2').nth(1);
    }

    address2(section: any) {
        return section.locator('.address_address1.address_address2').nth(2);
    }

    cityStateZip(addressSection: any) {
        return addressSection.locator('.address_city.address_state_name.address_postcode');
    }

    country(addressSection: any) {
        return addressSection.locator('.address_country_name');
    }

    phone(addressSection: any) {
        return addressSection.locator('.address_phone');
    }

    get downloadInvoiceButton() {
        return this.page.getByRole('link', { name: 'Download Invoice' });
    }

    get continueButtonAfterOrderPlaced() {
        return this.page.getByTestId('continue-button');
    }

}

export default CheckoutPage;