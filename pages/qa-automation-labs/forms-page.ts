import { Page } from "@playwright/test";

class FormsPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get formsMenu() {
    return this.page
      .getByRole("link", { name: "Form" })
      .and(this.page.locator("a.nav-link"));
  }

  get firstName() {
    return this.page.getByTestId("form-firstname");
  }

  get middleName() {
    return this.page.getByTestId("form-middlename");
  }

  get lastName() {
    return this.page.getByTestId("form-lastname");
  }

  get email() {
    return this.page.getByTestId("form-email");
  }

  get password() {
    return this.page.getByTestId("form-password");
  }

  get address() {
    return this.page.getByTestId("form-address");
  }

  get city() {
    return this.page.getByTestId("form-city");
  }

  get state() {
    return this.page.getByTestId("form-states");
  }

  get pincode() {
    return this.page.getByTestId("form-pincode");
  }

  get submitButton() {
    return this.page.getByTestId("form-submit-btn");
  }

  get formSubmitSuccessMessage() {
    return this.page.getByTestId("form-message");
  }
}
export default FormsPage;
