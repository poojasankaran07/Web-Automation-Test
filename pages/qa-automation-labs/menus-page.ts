import { Page } from "@playwright/test";

class MenusPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get testingMenu() {
    return this.page.getByTestId("nav-testing");
  }

  get dashboardBanner() {
    return this.page.getByTestId("dashboard-hero");
  }
}

export default MenusPage;
