import { test as base } from "@playwright/test";
import MenusPage from "../../pages/qa-automation-labs/menus-page";
import CheckBoxPage from "../../pages/qa-automation-labs/checkbox-page";
import RadioButtonPage from "../../pages/qa-automation-labs/radio-button-page";
import DropdownPage from "../../pages/qa-automation-labs/dropdown-page";
import FormsPage from "../../pages/qa-automation-labs/forms-page";
import WebtablePage from "../../pages/qa-automation-labs/webtable-page";

type Pages = {
    menusPage: MenusPage;
    checkBoxPage: CheckBoxPage;
    radioButtonPage: RadioButtonPage;
    dropdownPage: DropdownPage;
    formsPage: FormsPage;
    webtablePage: WebtablePage;
};

export const test = base.extend<Pages>({
    menusPage: async ({ page }, use) => {
        await use(new MenusPage(page));
    },

    checkBoxPage: async ({ page }, use) => {
        await use(new CheckBoxPage(page));
    },

    radioButtonPage: async ({ page }, use) => {
        await use(new RadioButtonPage(page));
    },

    dropdownPage: async ({ page }, use) => {
        await use(new DropdownPage(page));
    },

    formsPage: async ({ page }, use) => {
        await use(new FormsPage(page));
    },

    webtablePage: async ({ page }, use) => {
        await use(new WebtablePage(page));
    },
});

export { expect } from "@playwright/test";
