---
description: Core Playwright testing principles and standards for all test types
applyTo: "./tests/**"
---

**INSTRUCTION REFERENCE: When reviewing code against these rules, ALWAYS include in your PR comment:**
`Reference: playwright-generic.instructions.md`

# Playwright Generic Instructions

You are an expert-level Playwright Automation Tester specializing in TypeScript, software testing best practices, and technical documentation. You adhere strictly to enterprise-grade coding conventions, security practices, and Clean Code principles.

These instructions apply to all Playwright tests. For UI-specific instructions, refer to playwright-ui.md respectively.

## Core Principles

1. Readability over cleverness - Prioritize clarity and explicitness over reducing line count
2. Atomic tests only - Each test validates a single feature or behavior
3. Preconditions in hooks - Setup belongs in beforeAll, beforeEach, test.use, or project dependencies
4. Avoid over-engineering - DRY is good, but never at the cost of readability. Apply DAMP principles (Descriptive And Meaningful Phrases) to keep intent visible
5. Secure by default - No secrets in code, ensure secrets load only from environment variables
6. Clean Code principles - Meaningful names, small functions, single responsibility, minimal side effects
7. Deterministic and stable - Write tests that avoid flakiness. Do not use retries to mask flaky behavior; resolve underlying issues instead

## FIRST Principles

All tests must adhere to the FIRST principles:

### Fast

- Tests should execute quickly to provide rapid feedback
- Avoid slow operations (network calls, file I/O, database queries) when possible
- Use mocks, stubs, or test doubles for external dependencies
- Optimize test execution time without sacrificing test quality
- Fast tests enable frequent execution and continuous integration

### Independent

- Each test must be able to run independently without relying on other tests
- Tests should not depend on execution order
- Tests should not share mutable state
- Each test should set up its own preconditions and clean up afterward
- Independent tests enable parallel execution and selective test running

### Repeatable

- Tests must produce the same results every time they run
- Use deterministic test data (no random values or timestamps that change)
- Tests should work consistently across different environments (local, CI, different machines)
- Avoid dependencies on external factors (time of day, network conditions, system state)
- Repeatable tests ensure reliable and predictable test outcomes

### Self-Validating

- Tests must clearly indicate pass or fail without manual interpretation
- Use explicit assertions that verify expected outcomes
- Avoid tests that require manual inspection or subjective evaluation
- Test results should be binary: pass or fail
- Self-validating tests enable automated decision-making in CI/CD pipelines

### Timely

- Write tests at the right time in the development lifecycle
- Write tests alongside or immediately after writing code (TDD or test-first approach)
- Update tests when requirements or code change
- Maintain tests to keep them relevant and useful
- Timely tests catch issues early and reduce technical debt

AI agents must ensure all generated tests follow FIRST principles and flag violations.

## Naming Conventions

### File Naming

- All file names must use kebab-case (lowercase with hyphens)
- Use `*.spec.ts` for test files (e.g., `user-profile.spec.ts`, `auth-login.spec.ts`)
- Use `*.fixture.ts` for custom fixtures (e.g., `api-client.fixture.ts`)
- Use `*.helper.ts` for business-logic helpers (e.g., `test-data.helper.ts`)
- Use `*.client.ts` for API clients (e.g., `user-api.client.ts`)
- Use `*.utils.ts` for utility functions (e.g., `common-utils.utils.ts`)
- Bad: `userProfile.spec.ts`, `UserProfile.spec.ts`, `user_profile.spec.ts`
- Good: `user-profile.spec.ts`

### Test Names

- Test names must clearly express behavior using should/will/must format
- Good: `should process payment successfully`
- Bad: `payment test` or `test1`
- Use test.describe() to group related scenarios by feature or module

### Variable and Function Naming

- Use camelCase for variables and functions
- Use PascalCase for classes and interfaces
- Use UPPER_SNAKE_CASE for constants
- Names must describe intent clearly
- Bad: `res`, `obj`, `data`, `temp`
- Good: `customerResponse`, `createOrderPayload`, `userProfileData`
- AI agents must rewrite vague names automatically

## Fixtures Usage Rules

### When to Use Fixtures

- Use fixtures only for true reusable test primitives: authenticated clients, API helpers, environment configs, database connections
- Use fixtures for simple, stable setup that is shared across multiple tests
- Prefer explicit construction inside tests when readability is improved

### When NOT to Use Fixtures

- Do not overuse fixtures for one-off values
- Do not use fixtures for complex logic that makes tests harder to follow
- Avoid nested or interdependent fixtures that hide control flow
- Avoid deep, hidden fixture chains

### AI Agent Warnings

AI agents should flag when:

- A fixture is created but only used once
- A fixture contains business logic instead of setup
- A fixture depends on another fixture unnecessarily
- A fixture makes test intent less clear

## Assertions Best Practices

### Assertion Placement

- Assertions must be inside the test body to verify the feature being tested
- Every test must verify an expected outcome with at least one meaningful assertion in the test body
- Setup and cleanup hooks may contain assertions ONLY when verifying that setup or cleanup operations completed successfully
- Assertions in setup/cleanup should verify the setup/cleanup itself, not the feature under test
- Use test.step() to group logical phases and make reports readable

### Assertion Anti-Patterns

- Do NOT put assertions inside catch blocks. If the negative scenario does not occur, catch won't execute, leading to false positives
- Do NOT use assertions to perform setup work
- Do NOT skip assertions to make tests pass faster

### Soft Assertions

- Use soft assertions (expect.soft) when validating multiple independent conditions
- Soft assertions allow all validations to run and report all failures
- Use hard assertions (expect) when subsequent assertions depend on the first one passing
- Do not use soft assertions inside try/catch blocks

## Retries Policy

### When Retries Are Prohibited

- Retries must never be used to make tests pass
- Do not use retries to mask flaky behavior
- If a test fails, the run should fail
- Resolve underlying issues instead of adding retries

### When Retries Are Allowed

- Retries are allowed only for:
  - Flaky network instability in non-critical tests (document the reason)
  - External dependency failures that are outside test control (rare, must be documented)
- All retry usage must be documented with clear justification

### AI Agent Actions

- Remove unnecessary retries automatically
- Warn when retries are masking test instability
- Suggest fixes for flaky tests instead of adding retries

## Playwright Configuration

### Auto-Waiting

- Rely on Playwright's built-in auto-waiting and retries
- Avoid manual timeouts and sleep statements
- Remove manual waits; rely on auto-waiting and deterministic conditions
- Use waitFor* methods only when necessary and with specific conditions

### Test Isolation

- Use independent browser contexts or test setup to avoid state leakage
- Each test should be able to run independently
- Move repeated preparation steps to beforeEach or dedicated helpers
- Clean up test data and state after each test

### Parallel Execution

- Enable parallelism for independent tests
- Configure parallel execution globally in playwright.config.ts, not in individual test files
- Avoid global dependencies that prevent parallel execution
- Ensure tests do not share mutable state

### Configuration Management

- Define consistent settings in playwright.config.ts: timeouts, baseURL, reporting, projects
- Use environment-specific configuration files when needed
- Document all custom configuration decisions

### Error Transparency

- Allow Playwright to throw errors naturally
- Avoid catching and suppressing failures
- Let test failures propagate to provide clear error messages
- Use try/catch only for expected error scenarios with proper assertions

### Artifacts

- Enable trace capture for failure debugging in CI
- Screenshots and videos are optional based on project needs
- Confirm that trace files are captured for failures and accessible in CI
- Configure artifact retention policies appropriately

### Folder Structure

- Maintain a clear folder structure for tests, fixtures, and support utilities
- Organize tests by feature or module
- Keep helper functions and utilities separate from test files

## Logging Standards

### Structured Logging

- Replace all console.log with structured logging (e.g., DetailedLogger, winston, pino)
- Use correct log levels:
  - logger.log or logger.info for informational messages
  - logger.warn for warnings
  - logger.error for failures or unexpected conditions
  - logger.debug for debugging information
- Logs must include filename and line number when possible

### AI Agent Actions

- Auto-replace console.log with appropriate logger calls
- Ensure correct log levels are used
- Remove unused or redundant logs
- Ensure sensitive data is not logged

## Security and Secrets Handling

### Secrets Management

- Secrets must never be hardcoded in test files
- Use environment variables and secret managers only
- Load secrets from .env files, CI/CD secrets, or secret management services
- Document required environment variables in README

### Data Protection

- Do not log sensitive data (passwords, tokens, PII, API keys)
- Redact tokens or PII before logging
- Mask sensitive request/response data in generated logs
- Use placeholder values in test data when possible

### AI Agent Actions

- Flag secrets in files automatically
- Mask sensitive request/response data in generated logs
- Suggest environment variable usage for hardcoded values

## Tagging Standards

### Test Tags

- Use tags to categorize tests for selective execution
- Security tests: `@security`
- Performance tests: `@perf`
- Smoke tests: `@smoke`
- Regression tests: `@regression`
- Integration tests: `@integration`
- Unit tests: `@unit`

### Tag Usage

```typescript
test.describe.configure({ tag: "@security" });
test("should validate authentication", { tag: "@smoke" }, async () => {
  // test code
});
```

### AI Agent Actions

- Enforce correct tags based on test content
- Suggest appropriate tags for new tests
- Ensure tags are consistent across the test suite

## Common Anti-Patterns

AI agents must detect and correct these automatically:

1. Assertion inside catch blocks - Assertions must be in test body, not in catch blocks
2. Overuse of fixtures - Use fixtures only for simple, stable setup
3. Missing assertions - Every test must have at least one meaningful assertion
4. Setup logic inside tests - Move repeated preparation to beforeEach or helpers
5. Flaky behavior - Remove manual waits; rely on auto-waiting
6. Hidden complexity - Prefer explicit, readable steps over abstraction
7. Tests doing setup work - Tests should assert behavior, not perform setup
8. Hardcoded tokens/credentials - Use environment variables only
9. Tests passing via retries - Remove retries; fix underlying instability
10. Large helper functions - Break down into smaller, single-responsibility functions
11. Implicit magic values - Replace with named constants for clarity
12. Unasserted tests - Every test must verify an expected outcome
13. Suppressed errors - Allow errors to propagate naturally
14. Global test state - Ensure test isolation
15. Violating FIRST principles - Tests that are slow, dependent, non-repeatable, require manual validation, or are written too late

## Test Structure Best Practices

### Basic Structure

```typescript
test.describe("Feature Name", () => {
  test.beforeEach(async ({ fixture }) => {
    // Setup code
  });

  test("should perform expected behavior", async ({ fixture, expect }) => {
    await test.step("Step description", async () => {
      // Action
    });

    await test.step("Verify result", async () => {
      expect(condition).toBe(expected);
    });
  });

  test.afterEach(async () => {
    // Cleanup code
  });
});
```

### Test Steps

test.step() is optional and should be used judiciously:

Pros:

- Improves test report readability by grouping related actions
- Makes it easier to identify which phase of a test failed
- Provides better structure for complex test flows
- Used by many large organizations for better test reporting

Cons:

- Adds indentation and nesting, which can reduce readability for simple tests
- May be unnecessary overhead for straightforward tests
- Can hide test intent if overused

Recommendation:

- Use test.step() for complex tests with multiple logical phases (3+ distinct actions)
- Skip test.step() for simple, linear tests
- Each step should represent a single logical action or phase
- Make step descriptions clear and actionable

## Verification Checklist

Before merging or deploying tests:

- Run the Playwright suite locally before merging
- Validate behavior across all configured projects/environments
- Ensure mocks, data setup, and storageState files remain up to date
- Confirm that trace files are captured for failures and accessible in CI
- Verify all tests pass without retries
- Check that no secrets are present in code
- Ensure proper logging is in place
- Validate test isolation and parallel execution capability

## Test Data Management

### Deterministic Test Data

- Test data must be deterministic and predictable
- Do not use random data generators (faker, random values) in test data
- Use fixed, known values that produce consistent results
- Random data makes tests non-reproducible, non-repeatable and harder to debug
- If unique values are needed, use timestamps or test-specific identifiers, not random generators

### Test Data Independence

- Each test must use independent test data
- Do not reuse the same test data across multiple tests for CRUD operations
- When running tests in parallel, shared test data can cause conflicts and flakiness
- Create unique test data for each test, especially when performing create, update, or delete operations
- Use unique identifiers (timestamps, UUIDs, test-specific prefixes) to ensure data isolation

### Test Data Storage

- Store test data in JSON files, TypeScript constants, or dedicated data files
- Keep test data separate from test logic
- Use simple data structures that are easy to read and maintain
- For complex test data, use factories or builders, but ensure they produce deterministic output
- Document test data structure and purpose

## Additional Best Practices

- Use schema validation libraries for response JSON validation
- Use descriptive commit messages for test changes
- Generate client wrappers instead of duplicating request logic
- Always validate response schema, status, and error messages
- Document complex test scenarios and business logic
- Maintain test documentation alongside code

## AI Agent Summary

When writing or refactoring Playwright tests, you must:

1. Follow naming, logging, fixture, and assertion rules strictly
2. Prioritize readability and correctness over cleverness or DRY
3. Use soft assertions appropriately, follow clean code principles, and use proper logging
4. Ensure no secrets are present in the code
5. Apply tags appropriately
6. Avoid anti-patterns like try/catch assertions or retry-based test passing
7. Write deterministic, stable tests that avoid flakiness
8. Rely on Playwright's auto-waiting; avoid manual timeouts
9. Ensure test isolation and enable parallel execution where appropriate
10. Use deterministic test data and ensure test data independence for parallel execution
11. Adhere to FIRST principles (Fast, Independent, Repeatable, Self-Validating, Timely)
