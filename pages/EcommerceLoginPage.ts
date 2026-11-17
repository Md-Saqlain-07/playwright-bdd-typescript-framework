import type { Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { ecommerceLoginSelectors, ECOMMERCE_LOGIN_URL } from './ecommerceConfig';

export class EcommerceLoginPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto(ECOMMERCE_LOGIN_URL);
  }

  async enterCredentials(email: string): Promise<void> {
    const password = this.readPassword();
    await this.page.locator(ecommerceLoginSelectors.email).fill(email);
    await this.page.locator(ecommerceLoginSelectors.password).fill(password);
  }

  private readPassword(): string {
    const secretsPath = resolve(process.cwd(), 'test-data/login-secrets.json');
    let secrets: unknown;

    try {
      secrets = JSON.parse(readFileSync(secretsPath, 'utf8')) as unknown;
    } catch (error) {
      throw new Error(
        `Unable to load the login password from ${secretsPath}. Copy test-data/login-secrets.example.json to that path and fill it in.`,
        { cause: error },
      );
    }

    if (
      typeof secrets !== 'object' ||
      secrets === null ||
      !('password' in secrets) ||
      typeof secrets.password !== 'string' ||
      secrets.password.length === 0
    ) {
      throw new Error(`Login secrets in ${secretsPath} must contain a non-empty password string.`);
    }

    return secrets.password;
  }
}
