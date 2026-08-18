import { Page } from "@playwright/test";

class WindowModalPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get windowModalPopupMenu() {
    return this.page
      .getByRole("link", { name: "Window Popup Modal" })
      .and(this.page.locator("a.nav-link"));
  }

  openModalPopup(modal: "success" | "info" | "primary" | "danger") {
    return this.page.getByTestId(`modal-open-${modal}-btn`);
  }

  modalBody(modal: "success" | "info" | "primary" | "danger") {
    return this.page.getByTestId(`modal-${modal}-body`);
  }

  closeButton(modal: "success" | "info" | "primary" | "danger") {
    return this.page.getByTestId(`modal-${modal}-close-btn`);
  }
}

export default WindowModalPage;
