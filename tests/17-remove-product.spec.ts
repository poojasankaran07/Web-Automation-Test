import { test, expect } from '../fixtures/test-fixtures';
import common from '../utils/common-functions';

test.describe('Remove Products From Cart', () => {
    test('Remove Products From Cart Flow', async ({ page, homePage, productsPage, cartPage }) => {
        const addedProducts: {
            id: number;
            name: string;
            price: string;
        }[] = [];

        await test.step('Verify that home page is visible successfully', async () => {
            await page.goto('https://automationexercise.com/');
            await expect(homePage.automationLogoImage).toBeVisible();
        })

        await test.step(`Click on 'Products' button & verify user is navigated to ALL PRODUCTS page`, async () => {
            await common.safeClick(page, homePage.products);
        })

        await test.step(`Hover over the products and click 'Add to cart & click 'View Cart'`, async () => {
            await productsPage.productCard(1).hover();
            const product1 = await productsPage.getProductDetails(1);
            await common.safeClick(page, productsPage.addToCart(1));
            addedProducts.push(product1);
            await common.safeClick(page, productsPage.continueShopping);


            await productsPage.productCard(2).hover();
            const product2 = await productsPage.getProductDetails(2);
            await common.safeClick(page, productsPage.addToCart(2));
            addedProducts.push(product2);
            await common.safeClick(page, productsPage.viewCart);
        })

        await test.step(`Verify product is added to Cart'`, async () => {
            await expect(cartPage.productRow(1)).toBeVisible();
        })

        await test.step(`Click 'X' button corresponding to any particular product & verify that product is removed from cart`, async () => {
            await common.safeClick(page, cartPage.deleteProductButton(1));
            await expect(cartPage.productName(addedProducts[0].id)).toHaveCount(0);
        })
    })
})