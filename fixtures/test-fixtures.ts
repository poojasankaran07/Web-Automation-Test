import { test as base } from "@playwright/test";
import HomePage from "../pages/automation-exercise/home-page";
import LoginPage from "../pages/automation-exercise/login-page";
import RegisterUser from "../pages/automation-exercise/register-user";
import TestCasesPage from "../pages/automation-exercise/test-cases";
import ProductsPage from "../pages/automation-exercise/product-details";
import SearchProduct from "../pages/automation-exercise/search-product";
import ContactUsPage from "../pages/automation-exercise/contact-us";
import SubscriptionPage from "../pages/automation-exercise/subscription";
import CartPage from "../pages/automation-exercise/cart-page";
import CheckoutPage from "../pages/automation-exercise/checkout-page";
import CategoryPage from "../pages/automation-exercise/category-page";
import ReviewPage from "../pages/automation-exercise/review-page";
import RecommendPage from "../pages/automation-exercise/recommend";
import BrandPage from "../pages/automation-exercise/brand-page";

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
  brandPage: BrandPage;
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

  brandPage: async ({ page }, use) => {
    await use(new BrandPage(page));
  },

  reviewPage: async ({ page }, use) => {
    await use(new ReviewPage(page));
  },

  recommendPage: async ({ page }, use) => {
    await use(new RecommendPage(page));
  },
});

export { expect } from "@playwright/test";
