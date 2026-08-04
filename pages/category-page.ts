import { Page } from '@playwright/test';

class CategoryPage {
    private page: Page
    constructor(page: Page) {
        this.page = page;
    }

    get categoryHeading() {
        return this.page.locator('h2', { hasText: 'Category' });
    }

    category(name: string) {
        return this.page.locator(`a[href="#${name}"]`);
    }

    womenSubCategory(name: string) {
        return this.page.locator(`#Women .panel-body a`, { hasText: name });
    }

    menSubCategory(name: string) {
        return this.page.locator(`#Men .panel-body a`, { hasText: name });
    }

    categoryPageTitle(category: string, subCategory: string) {
        return this.page.getByText(`${category} - ${subCategory} Products`);
    }
};

export default CategoryPage;