import type { TestInfo } from '@playwright/test';
import { Given, Then, When } from '../support/fixtures';
import { ECOMMERCE_LOGIN_URL } from '../pages/ecommerceConfig';

Given('I open the QA Brains ecommerce login page', async ({ ecommerceLoginPage, $testInfo }) =>
  withStepLog($testInfo, async (log) => {
    log('Opening the QA Brains ecommerce login page.');
    log(`Navigating to: ${ECOMMERCE_LOGIN_URL}`);
    await ecommerceLoginPage.open();
    log('The QA Brains ecommerce login page opened successfully.');
  }),
);

Then(
  'the {string} should be displayed',
  async ({ ecommercePage, $testInfo }, pageName: string) =>
    withStepLog($testInfo, async (log) => {
      log(`Checking that the "${pageName}" is displayed.`);
      const { expectedUrl, actualUrl } = await ecommercePage.verifyIsDisplayed(pageName);
      log(`Expected URL (configured): ${expectedUrl}`);
      log(`Actual URL (browser): ${actualUrl}`);
      log(`URL comparison: ${actualUrl === expectedUrl ? 'MATCH' : 'MISMATCH'}`);
    }),
);

When(
  'I log in using the email {string}',
  async ({ ecommerceLoginPage, $testInfo }, email: string) =>
    withStepLog($testInfo, async (log) => {
      log(`Entering the email address: ${email}`);
      log('Loading the password from the local secrets file.');
      await ecommerceLoginPage.enterCredentials(email);
      log('The email and password fields were filled successfully.');
    }),
);

When('I click the {string} button', async ({ ecommercePage, $testInfo }, buttonName: string) =>
  withStepLog($testInfo, async (log) => {
    log(`Clicking the "${buttonName}" button.`);
    await ecommercePage.clickButton(buttonName);
    log(`The "${buttonName}" button was clicked successfully.`);
  }),
);

When(
  'I wait for the {string} field to be visible',
  async ({ ecommercePage, $testInfo }, fieldName: string) =>
    withStepLog($testInfo, async (log) => {
      log(`Waiting for the "${fieldName}" field to be visible.`);
      await ecommercePage.waitForInputVisible(fieldName);
      log(`The "${fieldName}" field is visible.`);
    }),
);

When(
  'I fill the {string} field with {string}',
  async ({ ecommercePage, $testInfo }, fieldName: string, value: string) =>
    withStepLog($testInfo, async (log) => {
      log(`Filling the "${fieldName}" field with "${value}".`);
      await ecommercePage.fillInput(fieldName, value);
      log(`The "${fieldName}" field was filled successfully.`);
    }),
);

When(
  'I wait for the {string} option to be visible',
  async ({ ecommercePage, $testInfo }, optionName: string) =>
    withStepLog($testInfo, async (log) => {
      log(`Waiting for the "${optionName}" option to be visible.`);
      await ecommercePage.waitForOptionVisible(optionName);
      log(`The "${optionName}" option is visible.`);
    }),
);

When(
  'I select the {string} option',
  async ({ ecommercePage, $testInfo }, optionName: string) =>
    withStepLog($testInfo, async (log) => {
      log(`Selecting the "${optionName}" option.`);
      await ecommercePage.selectOption(optionName);
      log(`The "${optionName}" option was selected successfully.`);
    }),
);

When(
  'I select the {string} product and click the {string} button',
  async ({ ecommerceCatalogPage, $testInfo }, productName: string, action: string) =>
    withStepLog($testInfo, async (log) => {
      log(`Finding the "${productName}" product.`);
      log(`Clicking "${action}" for that product.`);
      await ecommerceCatalogPage.updateProductCart(productName, action);
      log(`The "${action}" action was applied to "${productName}" successfully.`);
    }),
);

async function withStepLog(
  testInfo: TestInfo,
  action: (log: (message: string) => void) => Promise<void>,
): Promise<void> {
  const messages: string[] = [];
  const log = (message: string): void => {
    messages.push(message);
  };

  try {
    await action(log);
  } finally {
    if (messages.length > 0) {
      await testInfo.attach('Execution log', {
        body: messages.join('\n'),
        contentType: 'text/plain',
      });
    }
  }
}
