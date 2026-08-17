import { Page } from "@playwright/test";

class IframePage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    get iframeMenu() {
        return this.page.getByRole('link', { name: 'iFrame' })
            .and(this.page.locator('a.nav-link'));
    }

    get iframe1() {
        return this.page.frameLocator('[data-testid="iframe-frame-1"]');
    }

    get iframe2() {
        return this.page.frameLocator('[data-testid="iframe-frame-2"]');
    }

    get submitButtonInIframe1() {
        return this.iframe1.getByTestId('iframe1-button');
    }

    get submitButtonInIframe2() {
        return this.iframe2.getByTestId('iframe2-button');
    }

    get frameMessage() {
        return this.page.getByTestId('iframe-message');
    }
}

export default IframePage;
