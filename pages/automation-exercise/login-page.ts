import { Page } from "@playwright/test";
import common from "../../utils/common-functions";

class LoginPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get loginToAccount() {
    return this.page.locator("h2", { hasText: "Login to your account" });
  }

  get loginEmail() {
    return this.page.getByTestId("login-email");
  }

  get loginPassword() {
    return this.page.getByTestId("login-password");
  }

  get loginButton() {
    return this.page.getByTestId("login-button");
  }

  get invalidLoginError() {
    return this.page.getByText("Your email or password is incorrect!");
  }

  async login(email: string, password: string) {
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);
    await common.safeClick(this.page, this.loginButton);
  }
}

export default LoginPage;
