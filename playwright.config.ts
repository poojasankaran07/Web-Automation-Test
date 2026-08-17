import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [["html"], ["allure-playwright"]],
  use: {
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    headless: process.env.CI ? true : false,
  },

  projects: [
    // Automation Exercise
    {
      name: "automation-exercise",
      testMatch: /.*automation-exercise.*\.spec\.ts/,
      use: {
        baseURL: "https://automationexercise.com",
        testIdAttribute: "data-qa",
        browserName: "chromium",
        viewport: null,
      },
    },

    // QA Automation Labs
    {
      name: "qa-automation-labs",

      testMatch: /.*qa-automation-labs.*\.spec\.ts/,

      use: {
        baseURL: "https://testing.qaautomationlabs.com",
        browserName: "chromium",
        viewport: null,
        launchOptions: {
          args: ["--start-maximized"],
        },
      },
    },
  ],
});