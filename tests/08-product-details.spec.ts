import { Page, test, expect, BrowserContext } from '@playwright/test';
import HomePage from '../pages/home-page';
import RegisterUser from '../pages/register-user';
import LoginPage from '../pages/login-page';
import TestCasesPage from '../pages/test-cases';
import ProductsPage from '../pages/product-details';
import { expectUrl } from '../utils/helper';

let context: BrowserContext;
let page: Page;
let registerPage: RegisterUser;
let homePage: HomePage;
let loginPage: LoginPage;
let testCasesPage: TestCasesPage;
let productsPage: ProductsPage;

test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://automationexercise.com/');
    homePage = new HomePage(page);
    registerPage = new RegisterUser(page);
    loginPage = new LoginPage(page);
    testCasesPage = new TestCasesPage(page);
    productsPage = new ProductsPage(page);
});

test.describe('Verify All Products and product detail page', () => {
    test('Verify All Products and product detail page Flow', async () => {
        await test.step('Verify that home page is visible successfully', async () => {
            await expect(homePage.automationLogoImage).toBeVisible();
        })

        await test.step(`Click on 'Products' button & verify user is navigated to ALL PRODUCTS page`, async () => {
            await homePage.products.click();
            await expectUrl(page, '/products');
        })

        await test.step(`Verify the products list is visible`, async () => {
            await homePage.products.click();
            await expectUrl(page, '/products')
            await expect(productsPage.productsList).toBeVisible();
        })

        await test.step(`Click on 'View Product' of first product & verify user is landed to product detail page`, async () => {
            await productsPage.viewProduct(1).click();
            await expectUrl(page, '/product_details/1');
        })

        await test.step(`Verify product name, category, price, availability, condition, brand are visible`, async () => {
            await expect(productsPage.productInformation).toBeVisible();
            await expect(productsPage.productName).toBeVisible();
            await expect(productsPage.category).toBeVisible();
            await expect(productsPage.price).toBeVisible();
            await expect(productsPage.availability).toBeVisible();
            await expect(productsPage.condition).toBeVisible();
            await expect(productsPage.brand).toBeVisible();
        })
    })
})