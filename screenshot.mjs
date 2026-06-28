import { chromium } from "playwright";
import { mkdir } from "fs/promises";

// Set PW_CHROMIUM to an explicit Chromium binary when the bundled browser
// isn't downloaded (e.g. CI / sandbox); otherwise Playwright's default is used.
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.PW_CHROMIUM || undefined,
});
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await mkdir("screenshots", { recursive: true });

await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 30000 });
// Wait out the curtain reveal + hero intro animations.
await page.waitForTimeout(4500);

const shot = async (id, file, wait = 1000) => {
  if (id) {
    await page.evaluate((sel) => document.querySelector(sel)?.scrollIntoView({ behavior: "instant", block: "start" }), id);
    await page.waitForTimeout(wait);
  }
  await page.screenshot({ path: `screenshots/${file}` });
};

await shot(null, "01-hero.png");
await shot("#about", "02-about.png", 2600);
await shot("#speisekarte", "03-speisekarte.png");
await shot("#drinks", "04-drinks.png");
await shot("#galerie", "05-galerie.png");
await shot("#reservierung", "06-reservierung.png");
await shot("#kontakt", "07-kontakt.png");

// Mobile view
await page.setViewportSize({ width: 390, height: 844 });
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(800);
await page.screenshot({ path: "screenshots/08-mobile-hero.png" });

await page.evaluate(() => document.querySelector("#reservierung")?.scrollIntoView({ behavior: "instant", block: "start" }));
await page.waitForTimeout(1000);
await page.screenshot({ path: "screenshots/09-mobile-reservierung.png" });

await browser.close();
console.log("All screenshots saved.");
