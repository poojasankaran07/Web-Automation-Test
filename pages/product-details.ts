import { Page } from '@playwright/test';

class ProductsPage {
    private page: Page
    constructor(page: Page) {
        this.page = page;
    }

    get productsList() {
        return this.page.locator('.features_items');
    }

    productCard(productId: number) {
        return this.page.locator(
            `.product-image-wrapper:has(a[data-product-id="${productId}"])`
        );
    }

    viewProduct(productId: number) {
        return this.productCard(productId)
            .locator(`a[href="/product_details/${productId}"]`);
    }

    addToCart(productId: number) {
        return this.productCard(productId)
            .locator('.product-overlay a.add-to-cart');
    }

    async getProductDetails(productId: number) {

        const product = this.productCard(productId);

        return {
            id: productId,
            name: await product.locator('.productinfo p').innerText(),
            price: await product.locator('.productinfo h2').innerText()
        };
    }

    get continueShopping() {
        return this.page.getByText('Continue Shopping');
    }

    get viewCart() {
        return this.page.getByRole('link', { name: 'View Cart' });
    }

    get productInformation() {
        return this.page.locator('.product-information');
    }

    get productName() {
        return this.productInformation.locator('h2');
    }

    get category() {
        return this.productInformation.locator('p').filter({ hasText: 'Category:' });
    }

    get price() {
        return this.productInformation.locator('span').first();
    }

    get availability() {
        return this.productInformation.locator('p').filter({ hasText: 'Availability:' });
    }

    get condition() {
        return this.productInformation.locator('p').filter({ hasText: 'Condition:' });
    }

    get brand() {
        return this.productInformation.locator('p').filter({ hasText: 'Brand:' });
    }
}

export default ProductsPage;