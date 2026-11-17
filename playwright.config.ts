
import { defineConfig, devices } from '@playwright/test';
import { cucumberReporter, defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'features/**/*.feature',
  steps: ['steps/**/*.ts', 'support/fixtures.ts'],
});

export default defineConfig({
  testDir,

  fullyParallel: true,

  forbidOnly: Boolean(process.env.CI),

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  timeout: 30_000,

  expect: {
    timeout: 5_000,
  },

  
reporter: [
  ['list'],

  // Existing Playwright HTML report
  [
    'html',
    {
      outputFolder: 'playwright-report',
      open: 'never',
    },
  ],

  // Existing Cucumber HTML report
  cucumberReporter('html', {
    outputFile: 'cucumber-report/index.html',
  }),

  // New Allure report
  [
    'allure-playwright',
    {
      resultsDir: 'allure-results',
    },
  ],
],


  use: {
    headless: true,

    screenshot: 'only-on-failure',

    trace: 'retain-on-failure',
  },

  outputDir: 'test-results',

  projects: [
    {
      name: 'desktop-1440',
      grepInvert: /@(?:tablet|mobile)\b|\bon (?:tablet|mobile)\b/i,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
        screen: { width: 1440, height: 900 },
      },
    },
    {
      name: 'tablet-768',
      grep: /@tablet\b|\bon tablet\b/i,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 768, height: 1024 },
        screen: { width: 768, height: 1024 },
      },
    },
    {
      name: 'mobile-375',
      grep: /@mobile\b|\bon mobile\b/i,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 375, height: 812 },
        screen: { width: 375, height: 812 },
      },
    },
  ],
});