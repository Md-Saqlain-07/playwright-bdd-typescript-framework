import { test as base, createBdd } from 'playwright-bdd';
import { EcommerceCatalogPage } from '../pages/EcommerceCatalogPage';
import { EcommerceLoginPage } from '../pages/EcommerceLoginPage';
import { EcommercePage } from '../pages/EcommercePage';

type FrameworkFixtures = {
  ecommerceCatalogPage: EcommerceCatalogPage;
  ecommerceLoginPage: EcommerceLoginPage;
  ecommercePage: EcommercePage;
};

export const test = base.extend<FrameworkFixtures>({
  ecommerceCatalogPage: async ({ page }, use) => {
    await use(new EcommerceCatalogPage(page));
  },
  ecommerceLoginPage: async ({ page }, use) => {
    await use(new EcommerceLoginPage(page));
  },
  ecommercePage: async ({ page }, use) => {
    await use(new EcommercePage(page));
  },
});

export const { Given, When, Then, Before, After } = createBdd(test);
