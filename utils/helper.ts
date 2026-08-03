import { Page, expect } from '@playwright/test';

export async function expectUrl(page: Page, expectedPath: string) {
    if (page.url().includes('#google_vignette')) {
        await page.goBack();
    }

    await expect(page).toHaveURL(new RegExp(`${expectedPath}$`));
}