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

    async selectCategory(categoryName: string) {
        await this.category(categoryName).click();
    }

    womenSubCategory(name: string) {
        return this.page.locator(`#Women .panel-body a`, { hasText: name });
    }

    menSubCategory(name: string) {
        return this.page.locator(`#Men .panel-body a`, { hasText: name });
    }

    async selectSubcategory(categoryName: string, subcategoryName: string) {
        await this.selectCategory(categoryName);
        if (categoryName.toLowerCase() === 'women') {
            await this.womenSubCategory(subcategoryName).click();
        } else if (categoryName.toLowerCase() === 'men') {
            await this.menSubCategory(subcategoryName).click();
        } else {
            await this.page.locator(`a[href="#${categoryName}"]`).click();
            await this.page.locator(`a`, { hasText: subcategoryName }).click();
        }
    }

    categoryPageTitle(category: string, subCategory: string) {
        return this.page.getByText(`${category} - ${subCategory} Products`);
    }
};

export default CategoryPage;