import { chromium } from "playwright";
import { mkdir } from "fs/promises";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await mkdir("screenshots", { recursive: true });

await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(2000);

// Hero
await page.screenshot({ path: "screenshots/01-hero.png" });

// About
await page.evaluate(() => document.querySelector("#about")?.scrollIntoView({ behavior: "instant" }));
await page.waitForTimeout(900);
await page.screenshot({ path: "screenshots/02-about.png" });

// Menu
await page.evaluate(() => document.querySelector("#menu")?.scrollIntoView({ behavior: "instant" }));
await page.waitForTimeout(900);
await page.screenshot({ path: "screenshots/03-menu.png" });

// Drinks
await page.evaluate(() => document.querySelector("#drinks")?.scrollIntoView({ behavior: "instant" }));
await page.waitForTimeout(900);
await page.screenshot({ path: "screenshots/04-drinks.png" });

// Gallery
await page.evaluate(() => document.querySelector("#gallery")?.scrollIntoView({ behavior: "instant" }));
await page.waitForTimeout(900);
await page.screenshot({ path: "screenshots/05-gallery.png" });

// Team
await page.evaluate(() => document.querySelector("#team")?.scrollIntoView({ behavior: "instant" }));
await page.waitForTimeout(900);
await page.screenshot({ path: "screenshots/06-team.png" });

// Reservation
await page.evaluate(() => document.querySelector("#reservation")?.scrollIntoView({ behavior: "instant" }));
await page.waitForTimeout(900);
await page.screenshot({ path: "screenshots/07-reservation.png" });

// Contact
await page.evaluate(() => document.querySelector("#contact")?.scrollIntoView({ behavior: "instant" }));
await page.waitForTimeout(900);
await page.screenshot({ path: "screenshots/08-contact.png" });

// Mobile view
await page.setViewportSize({ width: 390, height: 844 });
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(600);
await page.screenshot({ path: "screenshots/09-mobile-hero.png" });

await page.evaluate(() => document.querySelector("#reservation")?.scrollIntoView({ behavior: "instant" }));
await page.waitForTimeout(900);
await page.screenshot({ path: "screenshots/10-mobile-reservation.png" });

await browser.close();
console.log("All screenshots saved.");
