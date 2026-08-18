import { Page } from "@playwright/test";

class DragDropPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get dragDropMenu() {
    return this.page
      .getByRole("link", { name: "Drag & Drop" })
      .and(this.page.locator("a.nav-link"));
  }

  itemsList(id: 1 | 2 | 3 | 4 | 5) {
    return this.page.getByTestId(`dnd-item-${id}`);
  }

  get allItems() {
    return this.page.locator("#sortableList li");
  }
}

export default DragDropPage;
