import { Page } from "@playwright/test";
import common from "../utils/common-functions";

class BrandPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get brandsHeading() {
    return this.page.locator("div.brands_products h2", {
      hasText: "Brands",
    });
  }

  brandLink(brandName: string) {
    return this.page.locator("div.brands-name ul li a", {
      hasText: brandName,
    });
  }

  async selectBrand(brandName: string) {
    await common.safeClick(this.page, this.brandLink(brandName));
  }

  get brandProductsSection() {
    return this.page.locator(".features_items");
  }

  brandPageTitle(brandName: string) {
    return this.page.getByRole("heading", {
      name: `Brand - ${brandName} Products`,
    });
  }
}

export default BrandPage;
