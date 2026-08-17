import { Page } from "@playwright/test";

class CheckBoxPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    get checkBoxMenu() {
        return this.page.getByRole('link', { name: 'Checkbox' })
            .and(this.page.locator('a.nav-link'));
    }

    get singleCheckBox() {
        return this.page.getByTestId('checkbox-single');
    }

    get checkBoxMessage() {
        return this.page.getByTestId("checkbox-message");
    }

    enableCheckBoxes(num: 1 | 2) {
        return this.page.getByText(`Enable Checkbox ${num}`);
    }

    disableCheckBoxes(num: 3 | 4) {
        return this.page.getByText(`Disable Checkbox ${num}`);
    }

    get checkUncheckAllButton() {
        return this.page.getByTestId('checkbox-toggle-all-btn')
    }

    multipleCheckBox(checkboxNumber: 1 | 2 | 3 | 4) {
        return this.page.getByTestId(`checkbox-multi-${checkboxNumber}`)
    }
}
export default CheckBoxPage;

