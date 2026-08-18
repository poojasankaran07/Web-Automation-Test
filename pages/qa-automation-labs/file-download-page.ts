import { Page } from "@playwright/test";

class DownloadPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get downloadMenu() {
    return this.page
      .getByRole("link", { name: "File Download" })
      .and(this.page.locator("a.nav-link"));
  }

  get textArea() {
    return this.page.getByTestId("download-text-input");
  }

  get generateFileButton() {
    return this.page.getByTestId("download-generate-btn");
  }

  get downloadFile() {
    return this.page.getByTestId("download-link");
  }
}

export default DownloadPage;
