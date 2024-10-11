const { test } = require('@playwright/test');

import { Page } from '@playwright/test';

test('Ejemplo de prueba', async ({ page }: { page: Page }) => {
  await page.goto(process.env.TEST_URL || 'http://localhost:3000');

  await page.waitForTimeout(5000);
});