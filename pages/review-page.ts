import { Page } from "@playwright/test";

class ReviewPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get reviewSection() {
    return this.page.getByRole("link", { name: "Write Your Review" });
  }

  get reviewerName() {
    return this.page.locator("id=name");
  }

  get reviewerEmail() {
    return this.page.locator("id=email");
  }

  get reviewerText() {
    return this.page.locator("id=review");
  }

  get reviewSubmitButton() {
    return this.page.locator("id=button-review");
  }

  get reviewSuccessMessage() {
    return this.page.getByText("Thank you for your review.");
  }

  async submitReview(reviewData: {
    name: string;
    email: string;
    review: string;
  }) {
    await this.reviewerName.fill(reviewData.name);
    await this.reviewerEmail.fill(reviewData.email);
    await this.reviewerText.fill(reviewData.review);
    await this.reviewSubmitButton.click();
  }
}

export default ReviewPage;
