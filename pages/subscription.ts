import { Page } from "@playwright/test";

class SubscriptionPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get automationLogoImage() {
    return this.page.getByAltText("Website for automation practice");
  }

  get signupOrLogin() {
    return this.page.getByRole("link", { name: " Signup / Login" });
  }

  get loggedInUser() {
    return this.page.locator("a").filter({
      hasText: "Logged in as",
    });
  }

  get deleteAccount() {
    return this.page.getByRole("link", { name: " Delete Account" });
  }

  get logout() {
    return this.page.getByRole("link", { name: " Logout" });
  }

  get contactUs() {
    return this.page.getByRole("link", { name: " Contact us" });
  }

  get testCases() {
    return this.page.locator('a[href="/test_cases"]').first();
  }

  get products() {
    return this.page.getByRole("link", { name: " Products" });
  }

  get subscriptionText() {
    return this.page.getByRole("heading", { name: "Subscription" });
  }

  get subscriptionEmail() {
    return this.page.locator("id=susbscribe_email");
  }

  get subscribeEmailEnterButton() {
    return this.page.locator("id=subscribe");
  }

  get successfulSubscribeMessage() {
    return this.page.locator("id=success-subscribe");
  }

  async subscribe(email: string) {
    await this.subscriptionEmail.fill(email);
    await this.subscribeEmailEnterButton.click();
  }
}

export default SubscriptionPage;
