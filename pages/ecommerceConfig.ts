export const ECOMMERCE_LOGIN_URL = 'https://practice.qabrains.com/ecommerce/login';

export const pageUrls = {
  'login page': ECOMMERCE_LOGIN_URL,
  'Catalog Page': 'https://practice.qabrains.com/ecommerce',
  'Cart Page': 'https://practice.qabrains.com/ecommerce/cart',
  'checkout-info': 'https://practice.qabrains.com/ecommerce/checkout-info',
  'Checkout-overview': 'https://practice.qabrains.com/ecommerce/checkout-overview',
  'Checkout Completed': 'https://practice.qabrains.com/ecommerce/checkout-complete',
} as const;

export const ecommerceLoginSelectors = {
  email: '#email',
  password: '#password',
} as const;

export const buttonCssSelectors: Readonly<Record<string, string>> = {
  Login: 'button[type="submit"].btn-submit',
  Filter: 'button[data-slot="popover-trigger"][role="combobox"]',
  Cart: 'svg[viewBox="0 0 576 512"]',
  Checkout: 'button:has(span:text-is("Checkout"))',
  Continue: 'button:has(span:text-is("Continue"))',
  Finish: 'button:has(span:text-is("Finish"))',
};

export const inputCssSelectors: Readonly<Record<string, string>> = {
  Search: 'input[data-slot="command-input"][placeholder="Search..."]',
  'First Name': 'input.form-control[placeholder="Ex. John"]',
  'Last Name': 'input.form-control[placeholder="Ex. Doe"]',
  'Zip Code': 'input.form-control[type="text"][value]:not([disabled])',
};

export const productSelectors = {
  card: 'div.products > div.group',
} as const;

export function getPageUrl(pageName: string): string {
  const normalizedPageName = pageName.trim().toLowerCase();
  const configuredPage = Object.entries(pageUrls).find(
    ([configuredName]) => configuredName.toLowerCase() === normalizedPageName,
  );

  if (!configuredPage) {
    throw new Error(`No URL is configured for the "${pageName}" page in ecommerceConfig.ts.`);
  }

  return configuredPage[1];
}
