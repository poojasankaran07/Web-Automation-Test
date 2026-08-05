import { test as base } from '@playwright/test';
import HomePage from '../pages/home-page';
import LoginPage from '../pages/login-page';
import RegisterUser from '../pages/register-user';
import TestCasesPage from '../pages/test-cases';
import ProductsPage from '../pages/product-details';
import SearchProduct from '../pages/search-product';
import ContactUsPage from '../pages/contact-us';
import SubscriptionPage from '../pages/subscription';
import CartPage from '../pages/cart-page'
import CheckoutPage from '../pages/checkout-page';
import CategoryPage from '../pages/category-page';
import ReviewPage from '../pages/review-page';
import RecommendPage from '../pages/recommend';

type Pages = {
    homePage: HomePage;
    loginPage: LoginPage;
    registerPage: RegisterUser;
    testCasesPage: TestCasesPage;
    productsPage: ProductsPage;
    searchProduct: SearchProduct;
    contactUsPage: ContactUsPage;
    subscriptionPage: SubscriptionPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    categoryPage: CategoryPage;
    reviewPage: ReviewPage;
    recommendPage: RecommendPage;
};

export const test = base.extend<Pages>({

    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    registerPage: async ({ page }, use) => {
        await use(new RegisterUser(page));
    },

    testCasesPage: async ({ page }, use) => {
        await use(new TestCasesPage(page));
    },

    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },

    searchProduct: async ({ page }, use) => {
        await use(new SearchProduct(page));
    },

    contactUsPage: async ({ page }, use) => {
        await use(new ContactUsPage(page));
    },

    subscriptionPage: async ({ page }, use) => {
        await use(new SubscriptionPage(page));
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },

    categoryPage: async ({ page }, use) => {
        await use(new CategoryPage(page));
    },

    reviewPage: async ({ page }, use) => {
        await use(new ReviewPage(page));
    },

    recommendPage: async ({ page }, use) => {
        await use(new RecommendPage(page));
    },
});

export { expect } from '@playwright/test';