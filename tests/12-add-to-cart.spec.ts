import { test, expect } from '../fixtures/test-fixtures';

test.describe('Verify All Products and product detail page', () => {
    test('Verify All Products and product detail page Flow', async ({ page, homePage, productsPage, cartPage }) => {
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
            await homePage.products.click();
        })

        await test.step(`Hover over first product and click 'Add to cart & click 'Continue Shopping' button'`, async () => {
            await productsPage.productCard(1).hover();

            const product1 = await productsPage.getProductDetails(1);
            await productsPage.addToCart(1).click();
            addedProducts.push(product1);

            await productsPage.continueShopping.click();
        })

        await test.step(`Hover over second product and click 'Add to cart & click 'View Cart' button'`, async () => {
            await productsPage.productCard(2).hover();

            const product2 = await productsPage.getProductDetails(2);
            await productsPage.addToCart(2).click();
            addedProducts.push(product2);

            await productsPage.viewCart.click();

        })

        await test.step(`Verify both products are added to Cart'`, async () => {
            await expect(cartPage.productRow(1)).toBeVisible();
            await expect(cartPage.productRow(2)).toBeVisible();
        })

        await test.step(`Verify their prices, quantity and total price`, async () => {
            for (const product of addedProducts) {
                await expect(cartPage.productName(product.id)).toHaveText(product.name);
                await expect(cartPage.productPrice(product.id)).toHaveText(product.price);
                await expect(cartPage.productQuantity(product.id)).toHaveText('1');
                await expect(cartPage.productTotal(product.id)).toHaveText(product.price);
            }
        })
    })
})