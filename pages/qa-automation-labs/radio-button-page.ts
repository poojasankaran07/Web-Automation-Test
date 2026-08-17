import { Page } from "@playwright/test";

class RadioButtonPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    get radioButtonMenu() {
        return this.page.getByRole('link', { name: 'Radio Button' })
            .and(this.page.locator('a.nav-link'));
    }

    genderRadioButtonSingle(gender: 'male' | 'female') {
        return this.page.getByTestId(`radio-gender-${gender}`);
    }

    get showGenderButton() {
        return this.page.getByTestId('radio-show-gender-btn');
    }

    get selectedGender() {
        return this.page.getByTestId('radio-result');
    }

    radioButtons(num: 1 | 2) {
        return this.page.getByText(`Radio Button ${num}`);
    }

    get disabledRadioButton() {
        return this.page.getByTestId('radio-button-disabled');
    }

    genderInComboSection(gender: 'male' | 'female') {
        return this.page.getByTestId(`radio-combo-gender-${gender}`);
    }

    ageInComboSection(age: 'radio-age-under-18' | 'radio-age-18-35' | 'radio-age-35-plus') {
        return this.page.getByTestId(age);
    }

    get showSelectedValues() {
        return this.page.getByTestId('radio-show-values-btn');
    }

    get comboResultMessage() {
        return this.page.getByTestId('radio-combo-result');
    }
}

export default RadioButtonPage;
