const { test } = require("@playwright/test");

import { Page } from "@playwright/test";

test("Ejemplo de prueba manual", async ({ page }: { page: Page }) => {
  await page.waitForEvent("close");
});
