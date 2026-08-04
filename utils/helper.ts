import { Locator, Page } from "@playwright/test";

export async function safeClick(page: Page, locator: Locator) {
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