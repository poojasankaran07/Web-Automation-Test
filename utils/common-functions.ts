import { Locator, Page } from "@playwright/test";

class CommonFunctions {

    async safeClick(page: Page, locator: Locator) {
        try {
            await locator.click({ timeout: 30000 });
        } catch (error) {
            if (page.url().includes('#google_vignette')) {
                await page.goBack();
                await locator.click();
            } else {
                throw error;
            }
        }
    }

    async fillValue(locator: Locator, value: string) {
        await locator.waitFor({ state: 'visible' });
        await locator.fill(value);
    }
}

export default new CommonFunctions();
