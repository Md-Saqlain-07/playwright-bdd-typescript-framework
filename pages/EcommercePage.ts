import { expect, type Page } from '@playwright/test';
import { buttonCssSelectors, getPageUrl, inputCssSelectors } from './ecommerceConfig';

export class EcommercePage {
  constructor(private readonly page: Page) {}

  async verifyIsDisplayed(pageName: string): Promise<{ expectedUrl: string; actualUrl: string }> {
    const expectedUrl = getPageUrl(pageName);
    await expect(this.page).toHaveURL(expectedUrl);

    return {
      expectedUrl,
      actualUrl: this.page.url(),
    };
  }

  async clickButton(name: string): Promise<void> {
    const selector = buttonCssSelectors[name];
    if (!selector) {
      throw new Error(`No CSS selector is configured for the "${name}" button in ecommerceConfig.ts.`);
    }

    await this.page.locator(selector).click();
  }

  async waitForInputVisible(name: string): Promise<void> {
    await expect(this.getInputLocator(name)).toBeVisible();
  }

  async fillInput(name: string, value: string): Promise<void> {
    await this.getInputLocator(name).fill(value);
  }

  async waitForOptionVisible(name: string): Promise<void> {
    await expect(this.page.getByRole('option', { name, exact: true })).toBeVisible();
  }

  async selectOption(name: string): Promise<void> {
    await this.page.getByRole('option', { name, exact: true }).click();
  }

  private getInputLocator(name: string) {
    const selector = inputCssSelectors[name];
    if (!selector) {
      throw new Error(`No CSS selector is configured for the "${name}" input in ecommerceConfig.ts.`);
    }

    return this.page.locator(selector);
  }
}
