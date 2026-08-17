import { Page } from "@playwright/test";

class DropdownPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    get dropdownMenu() {
        return this.page.getByRole('link', { name: 'Dropdown' })
            .and(this.page.locator('a.nav-link'));
    }

    get singleSelectDropdown() {
        return this.page.getByTestId('dropdown-fruit-select');
    }

    get singleDropdownResult() {
        return this.page.getByTestId('dropdown-fruit-result');
    }

    get multipleDropdownSelect() {
        return this.page.getByTestId('dropdown-country-select');
    }
}

export default DropdownPage;
