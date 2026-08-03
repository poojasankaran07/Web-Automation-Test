import { Page, test, expect, BrowserContext } from '@playwright/test';
import HomePage from '../pages/home-page';
import RegisterUser from '../pages/register-user';
import LoginPage from '../pages/login-page';
import TestCasesPage from '../pages/test-cases';
import ProductsPage from '../pages/product-details';
import SearchProduct from '../pages/search-product';
import { expectUrl } from '../utils/helper';

let context: BrowserContext;
let page: Page;
let registerPage: RegisterUser;
let homePage: HomePage;
let loginPage: LoginPage;
let testCasesPage: TestCasesPage;
let productsPage: ProductsPage;
let searchProduct: SearchProduct;

test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://automationexercise.com/');
    homePage = new HomePage(page);
    registerPage = new RegisterUser(page);
    loginPage = new LoginPage(page);
    testCasesPage = new TestCasesPage(page);
    productsPage = new ProductsPage(page);
    searchProduct = new SearchProduct(page);
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

        await test.step(`Enter product name in search input and click search button`, async () => {
            const productName = 'Winter Top';
            await searchProduct.searchProductField.fill(productName);
            await searchProduct.searchIcon.click();
            await expect(searchProduct.searchedProduct(productName)).toBeVisible();
        })
    })
})