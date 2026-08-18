import { Page } from "@playwright/test";

class ListBoxPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get listBoxMenu() {
    return this.page
      .getByRole("link", { name: "List Box" })
      .and(this.page.locator("a.nav-link"));
  }

  get sourceBox() {
    return this.page.getByTestId("listbox-source");
  }

  get targetBox() {
    return this.page.getByTestId("listbox-target");
  }

  buttons(buttons: "add" | "add-all" | "remove" | "remove-all") {
    return this.page.getByTestId(`listbox-${buttons}-btn`);
  }
}

export default ListBoxPage;
