import { Page } from "@playwright/test";

class CartPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  productRow(productId: number) {
    return this.page.locator(`#product-${productId}`);
  }

  productName(productId: number) {
    return this.productRow(productId).locator(".cart_description h4 a");
  }

  productPrice(productId: number) {
    return this.productRow(productId).locator(".cart_price p");
  }

  productQuantity(productId: number) {
    return this.productRow(productId).locator(".cart_quantity button");
  }

  productTotal(productId: number) {
    return this.productRow(productId).locator(".cart_total_price");
  }

  get proceedToCheckoutButton() {
    return this.page.getByText("Proceed To Checkout");
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }

  get registerOrLoginButton() {
    return this.page.getByRole("link", { name: "Register / Login" });
  }

  async registerOrLogin() {
    await this.registerOrLoginButton.click();
  }

  deleteProductButton(productId: number) {
    return this.page.locator(`[data-product-id="${productId}"]`);
  }

  async removeProduct(productId: number) {
    await this.deleteProductButton(productId).click();
  }
}

export default CartPage;
