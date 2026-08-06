import { test, expect } from '../fixtures/test-fixtures';
import common from '../utils/common-functions';

test.describe('Remove Products From Cart', () => {
    test('Remove Products From Cart Flow', async ({ homePage, productsPage, cartPage }) => {
        const addedProducts: {
            id: number;
            name: string;
            price: string;
        }[] = [];

        await test.step('Open home page and verify it is visible', async () => {
            await homePage.open();
            await expect(homePage.automationLogoImage).toBeVisible();
        })

        await test.step(`Navigate to products page`, async () => {
            await homePage.goToProducts();
        })

        await test.step(`Hover over the products and add them to cart, then view cart`, async () => {
            await productsPage.productCard(1).hover();
            const product1 = await productsPage.getProductDetails(1);
            await productsPage.addToCart(1);
            addedProducts.push(product1);
            await productsPage.continueShopping();

            await productsPage.productCard(2).hover();
            const product2 = await productsPage.getProductDetails(2);
            await productsPage.addToCart(2);
            addedProducts.push(product2);
            await productsPage.viewCart();
        })

        await test.step(`Verify product is added to Cart`, async () => {
            await expect(cartPage.productRow(1)).toBeVisible();
        })

        await test.step(`Click 'X' button corresponding to any particular product & verify that product is removed from cart`, async () => {
            await cartPage.removeProduct(1);
            await expect(cartPage.productName(addedProducts[0].id)).toHaveCount(0);
        })
    })
})