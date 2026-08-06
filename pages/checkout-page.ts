import { Locator, Page } from '@playwright/test';

type CardDetails = {
    name: string;
    number: string;
    cvv: string;
    expiryMonth: string;
    expiryYear: string;
};

type AddressDetails = {
    company: string;
    address1: string;
    address2: string;
    cityStateZip: string;
    country: string;
    phone: string;
};

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

    addressCompany(section: Locator) {
        return section.locator('.address_address1.address_address2').nth(0);
    }

    address1(section: Locator) {
        return section.locator('.address_address1.address_address2').nth(1);
    }

    address2(section: Locator) {
        return section.locator('.address_address1.address_address2').nth(2);
    }

    cityStateZip(addressSection: Locator) {
        return addressSection.locator('.address_city.address_state_name.address_postcode');
    }

    country(addressSection: Locator) {
        return addressSection.locator('.address_country_name');
    }

    phone(addressSection: Locator) {
        return addressSection.locator('.address_phone');
    }

    get downloadInvoiceButton() {
        return this.page.getByRole('link', { name: 'Download Invoice' });
    }

    get continueButtonAfterOrderPlaced() {
        return this.page.getByTestId('continue-button');
    }

    async fillPaymentDetails(cardDetails: CardDetails) {
        await this.cardName.fill(cardDetails.name);
        await this.cardNumber.fill(cardDetails.number);
        await this.cardCvv.fill(cardDetails.cvv);
        await this.cardExpiryMonth.fill(cardDetails.expiryMonth);
        await this.cardExpiryYear.fill(cardDetails.expiryYear);
    }

    async placeOrder(comment: string, cardDetails: CardDetails) {
        if (comment) {
            await this.checkoutComment.fill(comment);
        }

        await this.fillPaymentDetails(cardDetails);
        await this.finalPayButton.click();
    }

    async downloadInvoice() {
        await this.downloadInvoiceButton.click();
    }

    private async getAddressSectionDetails(section: Locator) {
        return {
            company: await this.addressCompany(section).innerText(),
            address1: await this.address1(section).innerText(),
            address2: await this.address2(section).innerText(),
            cityStateZip: await this.cityStateZip(section).innerText(),
            country: await this.country(section).innerText(),
            phone: await this.phone(section).innerText(),
        };
    }

    private compareAddresses(expected: AddressDetails, actual: AddressDetails) {
        return expected.company === actual.company &&
            expected.address1 === actual.address1 &&
            expected.address2 === actual.address2 &&
            expected.cityStateZip === actual.cityStateZip &&
            expected.country === actual.country &&
            expected.phone === actual.phone;
    }

    async verifyDeliveryAndBillingAddress(delivery: AddressDetails, billing: AddressDetails) {
        const actualDelivery = await this.getAddressSectionDetails(this.deliveryAddress);
        const actualBilling = await this.getAddressSectionDetails(this.billingAddress);

        return {
            deliveryMatches: this.compareAddresses(delivery, actualDelivery),
            billingMatches: this.compareAddresses(billing, actualBilling),
            actualDelivery,
            actualBilling,
        };
    }
}

export default CheckoutPage;
