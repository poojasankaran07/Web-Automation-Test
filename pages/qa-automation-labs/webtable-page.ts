import { Page } from "@playwright/test";

class WebtablePage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    get webtableMenu() {
        return this.page.getByRole('link', { name: 'Web Table' })
            .and(this.page.locator('a.nav-link'));
    }

    get name() {
        return this.page.getByTestId('webtable-add-name');
    }

    get country() {
        return this.page.getByTestId('webtable-add-country');
    }

    get addRecordButton() {
        return this.page.getByTestId('webtable-add-btn');
    }

    get tableSearch() {
        return this.page.getByTestId('webtable-search');
    }

    get tableBody() {
        return this.page.getByTestId('webtable-tbody');
    }

    get tableRows() {
        return this.tableBody.locator('tr');
    }

    getRowByName(name: string) {
        return this.tableRows.filter({
            hasText: name
        });
    }

}

export default WebtablePage;
