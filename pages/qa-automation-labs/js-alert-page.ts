import { Page } from "@playwright/test";

class JsAlertPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    get jsAlertMenu() {
        return this.page
            .getByRole("link", { name: "JavaScript Alert" })
            .and(this.page.locator("a.nav-link"));
    }

    get showAlertbutton() {
        return this.page.getByTestId('alert-show-alert-btn');
    }

    get showConfirmButton() {
        return this.page.getByTestId('alert-show-confirm-btn');
    }

    get showPromptButton() {
        return this.page.getByTestId('alert-show-prompt-btn');
    }

    get alertMessageOutput() {
        return this.page.getByTestId('alert-output');
    }

}

export default JsAlertPage;
