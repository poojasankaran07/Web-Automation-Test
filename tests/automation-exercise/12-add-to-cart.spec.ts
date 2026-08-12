import { test, expect } from "../../fixtures/test-fixtures";

test.describe("Add Products in Cart", () => {
  test("Add Products in Cart Flow", async ({
    homePage,
    productsPage,
    cartPage,
  }) => {
    const addedProducts: {
      id: number;
      name: string;
      price: string;
    }[] = [];

    await test.step("Open home page and verify it is visible", async () => {
      await homePage.open();
      await expect(homePage.automationLogoImage).toBeVisible();
    });

    await test.step(`Navigate to products page`, async () => {
      await homePage.goToProducts();
    });

    await test.step(`Hover over first product, add to cart and continue shopping`, async () => {
      await productsPage.productCard(1).hover();

      const product1 = await productsPage.getProductDetails(1);
      await productsPage.addToCart(1);
      addedProducts.push(product1);

      await productsPage.continueShopping();
    });

    await test.step(`Hover over second product, add to cart and view cart`, async () => {
      await productsPage.productCard(2).hover();

      const product2 = await productsPage.getProductDetails(2);
      await productsPage.addToCart(2);
      addedProducts.push(product2);

      await productsPage.viewCart();
    });

    await test.step(`Verify both products are added to Cart'`, async () => {
      await expect(cartPage.productRow(1)).toBeVisible();
      await expect(cartPage.productRow(2)).toBeVisible();
    });

    await test.step(`Verify their prices, quantity and total price`, async () => {
      for (const product of addedProducts) {
        await expect(cartPage.productName(product.id)).toHaveText(product.name);
        await expect(cartPage.productPrice(product.id)).toHaveText(
          product.price,
        );
        await expect(cartPage.productQuantity(product.id)).toHaveText("1");
        await expect(cartPage.productTotal(product.id)).toHaveText(
          product.price,
        );
      }
    });
  });
});
