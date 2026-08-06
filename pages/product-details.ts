import { Page } from "@playwright/test";

class ProductsPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get productsList() {
    return this.page.locator(".features_items");
  }

  productCard(productId: number) {
    return this.page.locator(
      `.product-image-wrapper:has(a[data-product-id="${productId}"])`,
    );
  }

  viewProductLink(productId: number) {
    return this.productCard(productId).locator(
      `a[href="/product_details/${productId}"]`,
    );
  }

  async viewProduct(productId: number) {
    await this.viewProductLink(productId).click();
  }

  async openProductDetails(productId: number) {
    await this.viewProduct(productId);
  }

  async verifyProductDetailPage(productId: number) {
    return this.page.url().includes(`/product_details/${productId}`);
  }

  addToCartButton(productId: number) {
    return this.productCard(productId)
      .locator(".productinfo a.add-to-cart, .product-overlay a.add-to-cart")
      .first();
  }

  async addToCart(productId: number) {
    const button = this.addToCartButton(productId);
    await button.waitFor({ state: "visible", timeout: 10000 });
    await button.click({ force: true });
    await this.page.waitForSelector("#cartModal", {
      state: "visible",
      timeout: 10000,
    });
  }

  async getProductDetails(productId: number) {
    const product = this.productCard(productId);
    return {
      id: productId,
      name: await product.locator(".productinfo p").innerText(),
      price: await product.locator(".productinfo h2").innerText(),
    };
  }

  get continueShoppingButton() {
    return this.page.locator('#cartModal button:has-text("Continue Shopping")');
  }

  async continueShopping() {
    await this.page.waitForSelector("#cartModal", {
      state: "visible",
      timeout: 10000,
    });
    await this.continueShoppingButton.click({ force: true });
    await this.page.waitForSelector("#cartModal", {
      state: "hidden",
      timeout: 10000,
    });
  }

  get viewCartButton() {
    return this.page.locator('#cartModal a:has-text("View Cart")');
  }

  async viewCart() {
    await this.page.waitForSelector("#cartModal", {
      state: "visible",
      timeout: 10000,
    });
    await Promise.all([
      this.page.waitForURL("**/view_cart", { timeout: 10000 }),
      this.viewCartButton.click({ force: true }),
    ]);
  }

  get productInformation() {
    return this.page.locator(".product-information");
  }

  get productName() {
    return this.productInformation.locator("h2");
  }

  get category() {
    return this.productInformation
      .locator("p")
      .filter({ hasText: "Category:" });
  }

  get price() {
    return this.productInformation.locator("span").first();
  }

  get availability() {
    return this.productInformation
      .locator("p")
      .filter({ hasText: "Availability:" });
  }

  get condition() {
    return this.productInformation
      .locator("p")
      .filter({ hasText: "Condition:" });
  }

  get brand() {
    return this.productInformation.locator("p").filter({ hasText: "Brand:" });
  }

  get quantityInput() {
    return this.page.locator("#quantity");
  }
}

export default ProductsPage;
