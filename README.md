# playwright-bdd-typescript-framework

Playwright test automation framework using TypeScript, Gherkin, `playwright-bdd`, and the Page Object Model.

## Setup

Requirements: Node.js and npm.

```powershell
npm.cmd ci
npx.cmd playwright install chromium
```

In PowerShell, use `npm.cmd` and `npx.cmd` if execution policy blocks the `npm.ps1` or `npx.ps1` wrappers. In other shells, use `npm` and `npx`.

## Run tests

Before running the ecommerce checkout scenario, copy
`test-data/login-secrets.example.json` to `test-data/login-secrets.json` and
set the test password in the copied file. The password file is ignored by Git;
the email and button name are provided in the feature.

Selectors and page URLs are centralized in `pages/ecommerceConfig.ts`.
Add button, field, product-card, or page URL mappings there when extending the
generic feature steps. Option wait/select steps use the option's exact
accessible name.

```powershell
npm.cmd test
npm.cmd run test:smoke
npm.cmd run test:all-viewports
npm.cmd run test:headed
npm.cmd run test:ui
npm.cmd run typecheck
npm.cmd run report
npm.cmd run report:cucumber
```

The smoke command runs scenarios tagged `@smoke`. The `test:all-viewports`
command routes each scenario to its selected viewport: add `@desktop`,
`@tablet`, or `@mobile` directly above a scenario to run it at 1440x900,
768x1024, or 375x812 respectively. Scenarios without one of these tags run on
desktop by default. Use only one viewport tag per scenario. All profiles use
Chromium. Scenario Outline examples with `desktop`, `tablet`, or `mobile` in
the `<viewport>` column are also routed to their matching viewport. After tests finish, the Playwright HTML
report is written to `playwright-report/` and the Cucumber HTML report to
`cucumber-report/index.html`. Use `npm.cmd run report` or
`npm.cmd run report:cucumber` to open the corresponding report.

## Project layout

- `features/`: Gherkin scenarios and tags
- `steps/`: step definitions; keep browser interactions in page objects
- `pages/`: page objects and Playwright assertions
- `support/fixtures.ts`: reusable Playwright fixtures and BDD bindings
- `playwright.config.ts`: test discovery, browser, reporting, and runtime settings
