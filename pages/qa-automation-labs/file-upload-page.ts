import { Page } from "@playwright/test";

class FileUploadPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get uploadMenu() {
    return this.page
      .getByRole("link", { name: "File Upload" })
      .and(this.page.locator("a.nav-link"));
  }

  get fileUploadButton() {
    return this.page.getByTestId("upload-browse-btn");
  }

  get uploadedFileInfo() {
    return this.page.getByTestId("upload-file-info");
  }
}

export default FileUploadPage;
