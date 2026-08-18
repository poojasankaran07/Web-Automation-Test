import { Page } from "@playwright/test";

class SliderPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    get sliderMenu() {
        return this.page
            .getByRole("link", { name: "Slider" })
            .and(this.page.locator("a.nav-link"));
    }

    slider(sliderNumber: number) {
        return this.page.getByTestId(`slider-${sliderNumber}`);
    }

    sliderValue(valueNumber: number) {
        return this.page.getByTestId(`slider-${valueNumber}-value`);
    }
}

export default SliderPage;
