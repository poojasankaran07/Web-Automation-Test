import { Page } from "@playwright/test";
import common from "../utils/common-functions";

class CategoryPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get categoryHeading() {
    return this.page.locator("h2", { hasText: "Category" });
  }

  category(name: string) {
    return this.page.locator(`a[href="#${name}"]`);
  }

  async selectCategory(categoryName: string) {
    await common.safeClick(this.page, this.category(categoryName));
  }

  womenSubCategory(name: string) {
    return this.page.locator(`#Women .panel-body a`, { hasText: name });
  }

  menSubCategory(name: string) {
    return this.page.locator(`#Men .panel-body a`, { hasText: name });
  }

  async selectSubcategory(categoryName: string, subcategoryName: string) {
    await this.selectCategory(categoryName);
    if (categoryName.toLowerCase() === "women") {
      await common.safeClick(this.page, this.womenSubCategory(subcategoryName));
    } else if (categoryName.toLowerCase() === "men") {
      await common.safeClick(this.page, this.menSubCategory(subcategoryName));
    } else {
      await common.safeClick(
        this.page,
        this.page.locator(`a[href="#${categoryName}"]`),
      );
      await common.safeClick(
        this.page,
        this.page.locator(`a`, { hasText: subcategoryName }),
      );
    }
  }

  categoryPageTitle(category: string, subCategory: string) {
    return this.page.getByText(`${category} - ${subCategory} Products`);
  }
}

export default CategoryPage;
