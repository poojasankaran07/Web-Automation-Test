import { Page } from '@playwright/test';

class ProductsPage {
    private page: Page
    constructor(page: Page) {
        this.page = page;
    }

    get productsList() {
        return this.page.locator('.features_items');
    }

    viewProduct(productId: number) {
        return this.page.locator(`a[href="/product_details/${productId}"]`);
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