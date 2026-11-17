
# Playwright BDD Automation Framework

## Technology Stack
- Playwright
- TypeScript
- Playwright-BDD
- Gherkin
- Node.js

## Framework Architecture
- Follow Behaviour Driven Development.
- Use Gherkin Feature files.
- Use Given, When, Then.
- Follow Page Object Model.
- Keep locators and browser interactions inside page classes.
- Keep business scenarios inside feature files.
- Keep step implementations inside step definitions.
- Use reusable Playwright fixtures.

## Coding Standards
- Use TypeScript strict mode.
- Use async/await.
- Use meaningful class and method names.
- Avoid duplicate code.
- Use reusable methods.
- Prefer getByRole, getByLabel and getByTestId.
- Avoid unnecessary waitForTimeout.
- Use Playwright web-first assertions.
- Never hardcode passwords or API keys.

## Test Standards
- Create smoke and regression scenarios.
- Use appropriate Gherkin tags.
- Write independent test scenarios.
- Capture screenshots and traces on failures.
- Maintain readable HTML reports.

## Important
Do not place browser automation logic
inside Gherkin feature files.

Do not put locators directly inside
step definitions.

Follow the existing project architecture
when generating or modifying code.