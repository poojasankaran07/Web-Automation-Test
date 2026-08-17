import { Page } from "@playwright/test";

class NotificationPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    get notificationMenu() {
        return this.page
            .getByRole("link", { name: "Notifications" })
            .and(this.page.locator("a.nav-link"));
    }

    get successMessageButton() {
        return this.page.getByRole("button", { name: "Success Message" });
    }

    get infoMessageButton() {
        return this.page.getByRole("button", { name: "Info Message" });
    }

    get primaryMessageButton() {
        return this.page.getByRole("button", { name: "Primary Message" });
    }

    get errorMessageButton() {
        return this.page.getByRole("button", { name: "Error Message" });
    }

    get notifications() {
        return this.page.getByRole("alert");
    }
}

export default NotificationPage;
