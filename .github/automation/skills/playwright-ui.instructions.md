---
description: UI-specific Playwright testing standards and best practices
applyTo: './tests/**'
---

**INSTRUCTION REFERENCE: When reviewing code against these rules, ALWAYS include in your PR comment:**
`Reference: playwright-ui.instructions.md`

# Playwright UI Test Instructions

This file extends playwright-generic.instructions.md with UI-specific instructions. All generic rules apply unless overridden here.

You are an expert-level Playwright Automation Tester specializing in UI testing. These instructions guide how you must generate, refactor, review, and optimize Playwright UI tests.

## Locator Strategy

### Preferred Locators

Use data-testid attributes as the primary locator strategy:
```typescript
// Good: Stable and maintainable
await page.locator('[data-testid="submit-button"]').click();
await page.locator('[data-testid="user-email-input"]').fill('user@example.com');
```

### Alternative Locators (When data-testid Not Available)

Order of preference:
1. Role-based locators (most semantic)
2. Text content (for user-visible text)
3. CSS selectors (for stable structural elements)
4. XPath (avoid unless absolutely necessary)

```typescript
// Good: Role-based
await page.getByRole('button', { name: 'Submit' }).click();
await page.getByRole('textbox', { name: 'Email' }).fill('user@example.com');

// Acceptable: Text content
await page.getByText('Welcome back').click();

// Avoid: Brittle selectors
await page.locator('div:nth-child(3) > button').click(); // Bad
await page.locator('//div[@class="button"]').click(); // Bad - XPath
```

### Locator Anti-Patterns

AI agents must avoid:
- nth-child selectors (brittle)
- XPath selectors (hard to maintain)
- CSS selectors based on styling (class names with "red", "large", etc.)
- Selectors based on position (first, last, etc.)
- Selectors that depend on DOM structure

## Element Interaction

### Click Actions

Use appropriate click methods:
```typescript
// Standard click
await page.locator('[data-testid="button"]').click();

// Force click (when element is covered)
await page.locator('[data-testid="button"]').click({ force: true });

// Double click
await page.locator('[data-testid="button"]').dblclick();
```

### Input Actions

Use fill for text inputs, check/uncheck for checkboxes:
```typescript
// Text input
await page.locator('[data-testid="email-input"]').fill('user@example.com');

// Checkbox
await page.locator('[data-testid="terms-checkbox"]').check();

// Radio button
await page.locator('[data-testid="option-1"]').check();

// Select dropdown
await page.locator('[data-testid="country-select"]').selectOption('US');
```

### Wait Strategies

Rely on Playwright's auto-waiting:
```typescript
// Good: Auto-waits for element to be visible and actionable
await page.locator('[data-testid="button"]').click();

// Bad: Manual timeout
await page.waitForTimeout(1000);
await page.locator('[data-testid="button"]').click();

// Good: Wait for specific condition when needed
await page.waitForLoadState('networkidle');
await page.waitForSelector('[data-testid="content"]', { state: 'visible' });
```

## Page Object Model

### Page Object Structure

Create page objects for reusable UI flows:
```typescript
class LoginPage {
  constructor(private page: Page) {}

  private readonly emailInput = this.page.locator('[data-testid="email-input"]');
  private readonly passwordInput = this.page.locator('[data-testid="password-input"]');
  private readonly submitButton = this.page.locator('[data-testid="submit-button"]');

  async navigate() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.page.locator('[data-testid="user-menu"]').isVisible();
  }
}
```

### When to Use Page Objects

Use page objects when:
- UI flows are reused across multiple tests
- Complex interactions need to be abstracted
- It improves test readability

Do not use page objects when:
- It hides test intent
- It's a one-off interaction
- It adds unnecessary abstraction

## Authentication and Session Management

### Storage State for Login

Use storage state to persist authentication:
```typescript
// Setup: Create storage state once
test('authenticate user', async ({ page }) => {
  await page.goto('/login');
  await page.locator('[data-testid="email"]').fill('user@example.com');
  await page.locator('[data-testid="password"]').fill('password');
  await page.locator('[data-testid="submit"]').click();
  await page.context().storageState({ path: 'auth-state.json' });
});

// Usage: Reuse storage state
test.use({ storageState: 'auth-state.json' });

test('should access protected page', async ({ page }) => {
  await page.goto('/dashboard');
  // Already authenticated
});
```

### Project Dependencies for Cookies

Use project dependencies for initializing cookies:
```typescript
// playwright.config.ts
projects: [
  { name: 'setup', testMatch: /.*\.setup\.ts/ },
  {
    name: 'tests',
    dependencies: ['setup'],
    use: {
      storageState: 'auth-state.json',
    },
  },
]
```

## UI Test Structure

### Basic UI Test Pattern

```typescript
test.describe('User Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
  });

  test('should display user profile', async ({ page, expect }) => {
    await test.step('Navigate to profile section', async () => {
      await page.locator('[data-testid="profile-link"]').click();
    });

    await test.step('Verify profile information', async () => {
      await expect(page.locator('[data-testid="user-name"]')).toBeVisible();
      await expect(page.locator('[data-testid="user-email"]')).toContainText('@');
    });
  });
});
```

### Test Steps for UI Tests

Use test.step() to organize UI interactions:
```typescript
test('should complete checkout flow', async ({ page, expect }) => {
  await test.step('Add item to cart', async () => {
    await page.locator('[data-testid="add-to-cart"]').click();
  });

  await test.step('Navigate to checkout', async () => {
    await page.locator('[data-testid="cart-icon"]').click();
    await page.locator('[data-testid="checkout-button"]').click();
  });

  await test.step('Complete payment', async () => {
    await page.locator('[data-testid="payment-form"]').fill('card details');
    await page.locator('[data-testid="submit-payment"]').click();
  });

  await test.step('Verify success', async () => {
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
  });
});
```

## Screenshots and Videos

### Screenshot Configuration

Configure screenshots in playwright.config.ts:
```typescript
use: {
  screenshot: 'only-on-failure', // or 'on', 'off'
  video: 'retain-on-failure', // or 'on', 'off'
}
```

### Manual Screenshots

Take screenshots at key points when needed:
```typescript
await test.step('Verify dashboard loaded', async () => {
  await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
  await page.screenshot({ path: 'dashboard-loaded.png' });
});
```

### Full Page Screenshots

Capture full page when needed:
```typescript
await page.screenshot({ path: 'full-page.png', fullPage: true });
```

## UI Assertions

### Visibility Assertions

```typescript
// Element is visible
await expect(page.locator('[data-testid="element"]')).toBeVisible();

// Element is hidden
await expect(page.locator('[data-testid="element"]')).toBeHidden();

// Element exists in DOM
await expect(page.locator('[data-testid="element"]')).toHaveCount(1);
```

### Text Assertions

```typescript
// Exact text match
await expect(page.locator('[data-testid="title"]')).toHaveText('Welcome');

// Text contains
await expect(page.locator('[data-testid="message"]')).toContainText('success');

// Text matches regex
await expect(page.locator('[data-testid="email"]')).toHaveText(/^[\\w\\.]+@[\\w\\.]+$/);
```

### Attribute Assertions

```typescript
// Attribute value
await expect(page.locator('[data-testid="link"]')).toHaveAttribute('href', '/dashboard');

// Attribute exists
await expect(page.locator('[data-testid="button"]')).toHaveAttribute('disabled');
```

### State Assertions

```typescript
// Checkbox checked
await expect(page.locator('[data-testid="checkbox"]')).toBeChecked();

// Input value
await expect(page.locator('[data-testid="input"]')).toHaveValue('expected value');

// Select value
await expect(page.locator('[data-testid="select"]')).toHaveValue('option1');
```

## Handling Dynamic Content

### Waiting for Dynamic Elements

```typescript
// Wait for element to appear
await page.waitForSelector('[data-testid="dynamic-content"]', { state: 'visible' });

// Wait for network request
await page.waitForResponse(response => 
  response.url().includes('/api/data') && response.status() === 200
);

// Wait for navigation
await page.waitForURL('**/dashboard');
```

### Handling Loading States

```typescript
// Wait for loading spinner to disappear
await page.waitForSelector('[data-testid="loading-spinner"]', { state: 'hidden' });

// Wait for content to load
await page.waitForLoadState('networkidle');
await page.waitForLoadState('domcontentloaded');
```

## Cross-Browser Testing

### Browser Configuration

Configure multiple browsers in playwright.config.ts:
```typescript
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
]
```

### Browser-Specific Considerations

- Test critical flows across all browsers
- Document browser-specific workarounds
- Use browser-specific selectors only when necessary

## Mobile and Responsive Testing

### Viewport Configuration

```typescript
test.use({
  viewport: { width: 375, height: 667 }, // Mobile
});

// Or use device emulation
test.use({
  ...devices['iPhone 12'],
});
```

### Responsive Test Patterns

```typescript
test('should display mobile menu on small screens', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  
  await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
  await expect(page.locator('[data-testid="desktop-menu"]')).toBeHidden();
});
```

## UI Test Reporting

### Required Report Information

All UI tests must include in reports:
- Environment (dev/stage/prod)
- Browser and version
- Viewport size
- Screenshots (on failure, or as configured)
- Video (on failure, or as configured)
- Test steps with UI interactions
- Element locators used
- Error screenshots

### Test Steps for UI Tests

Organize UI tests with clear steps:
```typescript
test('should complete user registration', async ({ page, expect }) => {
  await test.step('Navigate to registration page', async () => {
    await page.goto('/register');
  });

  await test.step('Fill registration form', async () => {
    await page.locator('[data-testid="name-input"]').fill('John Doe');
    await page.locator('[data-testid="email-input"]').fill('john@example.com');
  });

  await test.step('Submit form', async () => {
    await page.locator('[data-testid="submit-button"]').click();
  });

  await test.step('Verify success message', async () => {
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
  });
});
```

## UI Test Data Management

### Test Data for UI Tests

Store test data in JSON files or TypeScript constants for simplicity and maintainability:
```typescript
// test-data/users.json
{
  "validUser": {
    "name": "Test User",
    "email": "test@example.com",
    "password": "SecurePassword123!"
  },
  "invalidUser": {
    "name": "",
    "email": "invalid-email",
    "password": "123"
  }
}

// In test file
import testData from './test-data/users.json';

const userData = testData.validUser;
```

JSON files are preferred because:
- Simple and readable
- Easy to maintain and update
- No code complexity
- Can be shared across tests
- Version control friendly
```

Always use deterministic data. Do not use random generators.

### Cleanup After UI Tests

Clean up test data created during UI tests:
```typescript
test.afterEach(async ({ page }) => {
  // Navigate to cleanup page or use API to delete test data
  await page.goto('/admin/cleanup');
  await page.locator('[data-testid="cleanup-test-data"]').click();
});
```

## Common UI Test Anti-Patterns

AI agents must detect and fix:

1. Using brittle locators (nth-child, XPath, position-based)
2. Manual waits instead of auto-waiting
3. Missing data-testid attributes (suggest adding them)
4. Over-abstraction in page objects
5. Tests that depend on specific timing
6. Missing screenshots/videos on failure
7. Not waiting for dynamic content
8. Hardcoded viewport sizes
9. Tests that don't verify UI state changes
10. Missing accessibility considerations

## Accessibility Testing

### Accessibility Assertions

Use Playwright's accessibility features:
```typescript
// Check accessibility
const accessibilitySnapshot = await page.accessibility.snapshot();
expect(accessibilitySnapshot).toHaveAccessibleName('Submit button');

// Check ARIA attributes
await expect(page.locator('[data-testid="button"]')).toHaveAttribute('aria-label', 'Submit form');
```

### Keyboard Navigation

Test keyboard navigation:
```typescript
await page.locator('[data-testid="input"]').focus();
await page.keyboard.press('Tab');
await expect(page.locator('[data-testid="next-input"]')).toBeFocused();
```

## UI Test Tagging

Tag UI tests appropriately:
```typescript
test.describe('User Interface', () => {
  test.describe.configure({ tag: '@ui' });

  test('should render login page', { tag: ['@ui', '@smoke'] }, async () => {
    // Test code
  });

  test('should handle form validation', { tag: ['@ui', '@regression'] }, async () => {
    // Test code
  });
});
```

## AI Agent Summary for UI Tests

When writing or refactoring Playwright UI tests, you must:
1. Use data-testid attributes as primary locator strategy
2. Avoid brittle locators (nth-child, XPath, position-based)
3. Rely on Playwright's auto-waiting; avoid manual timeouts
4. Use storage state for authentication
5. Include screenshots and videos in test reports
6. Verify UI state changes with appropriate assertions
7. Handle dynamic content with proper wait strategies
8. Test across different viewport sizes when relevant
9. Use deterministic test data stored in JSON files
10. Follow all generic Playwright rules from playwright-generic.instructions.md
