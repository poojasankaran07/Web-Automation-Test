import { Page } from "@playwright/test";
import common from "../../utils/common-functions";

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

class ContactUsPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get getInTouch() {
    return this.page.locator("h2", { hasText: "Get In Touch" });
  }

  get name() {
    return this.page.getByTestId("name");
  }

  get email() {
    return this.page.getByTestId("email");
  }

  get subject() {
    return this.page.getByTestId("subject");
  }

  get message() {
    return this.page.getByTestId("message");
  }

  get fileUpload() {
    return this.page.locator('input[name="upload_file"]');
  }

  get submitButton() {
    return this.page.getByTestId("submit-button");
  }

  get submittedSuccessMessage() {
    return this.page
      .locator("#contact-page")
      .getByText("Success! Your details have been submitted successfully.");
  }

  get homeButton() {
    return this.page.locator("#contact-page a.btn-success");
  }

  async submitContactForm(data: ContactFormData, file?: string) {
    await this.name.fill(data.name);
    await this.email.fill(data.email);
    await this.subject.fill(data.subject);
    await this.message.fill(data.message);

    if (file) {
      await this.fileUpload.setInputFiles(file);
    }

    await common.safeClick(this.page, this.submitButton);
  }

  async returnHome() {
    await common.safeClick(this.page, this.homeButton);
  }
}

export default ContactUsPage;
