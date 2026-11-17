import { expect, type Page } from '@playwright/test';
import { productSelectors } from './ecommerceConfig';

export class EcommerceCatalogPage {
  constructor(private readonly page: Page) {}

  async updateProductCart(productName: string, action: string): Promise<void> {
    if (action !== 'Add to cart' && action !== 'Remove from cart') {
      throw new Error(`Unsupported cart action "${action}". Use "Add to cart" or "Remove from cart".`);
    }

    const productCard = this.page.locator(productSelectors.card).filter({
      has: this.page.getByRole('link', { name: productName, exact: true }),
    });
    await expect(productCard).toHaveCount(1);
    await productCard.getByRole('button', { name: action, exact: true }).click();

    const updatedAction = action === 'Add to cart' ? 'Remove from cart' : 'Add to cart';
    await expect(productCard.getByRole('button', { name: updatedAction, exact: true })).toBeVisible();
  }
}
