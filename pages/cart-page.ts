import { Page } from '@playwright/test';

class CartPage {
    private page: Page
    constructor(page: Page) {
        this.page = page;
    }

    productRow(productId: number) {
        return this.page.locator(`#product-${productId}`);
    }


    productName(productId: number) {
        return this.productRow(productId)
            .locator('.cart_description h4 a');
    }


    productPrice(productId: number) {
        return this.productRow(productId)
            .locator('.cart_price p');
    }


    productQuantity(productId: number) {
        return this.productRow(productId)
            .locator('.cart_quantity button');
    }


    productTotal(productId: number) {
        return this.productRow(productId)
            .locator('.cart_total_price');
    }
}

export default CartPage;