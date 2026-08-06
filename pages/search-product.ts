import { Page } from '@playwright/test';

class SearchProduct {
    private page: Page
    constructor(page: Page) {
        this.page = page;
    }

    get searchProductField() {
        return this.page.locator('id=search_product');
    }

    get searchIcon() {
        return this.page.locator('id=submit_search');
    }

    searchedProduct(productName: string) {
        return this.page.getByText(productName, { exact: true }).first();
    }

    async searchFor(productName: string) {
        await this.searchProductField.fill(productName);
        await this.searchIcon.click();
    }
}

export default SearchProduct;