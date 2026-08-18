import { Page } from "@playwright/test";

class ShadowDomPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get shadowDomMenu() {
    return this.page
      .getByRole("link", { name: "Shadow DOM" })
      .and(this.page.locator("a.nav-link"));
  }

  get outsideShadowDom() {
    return this.page.getByTestId("shadow-outside-heading");
  }

  get insideShadowDom() {
    return this.page.getByTestId("shadow-box");
  }
}

export default ShadowDomPage;
