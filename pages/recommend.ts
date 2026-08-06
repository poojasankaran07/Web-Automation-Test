import { Page } from '@playwright/test';

class RecommendPage {
    private page: Page
    constructor(page: Page) {
        this.page = page;
    }

    get recommendedSection() {
        return this.page.locator('.recommended_items');
    }

    productCard(productName: string) {
        return this.recommendedSection
            .locator('.single-products')
            .filter({
                has: this.page.locator('p', { hasText: productName })
            });
    }

    addToCart(productName: string) {
        return this.productCard(productName)
            .locator('.add-to-cart');
    }

    async addRecommendedItemToCart(itemName: string) {
        await this.addToCart(itemName).click();
    }
}

export default RecommendPage;