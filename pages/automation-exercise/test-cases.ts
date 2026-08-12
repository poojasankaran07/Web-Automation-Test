import { Page } from "@playwright/test";

class TestCasesPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get testCasesHeaading() {
    return this.page.locator("h2", { hasText: "Test Cases" });
  }
}

export default TestCasesPage;
