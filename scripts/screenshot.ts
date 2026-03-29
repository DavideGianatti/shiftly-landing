import { chromium } from "playwright";
import { mkdirSync } from "fs";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const OUT = "./test-screenshots";

async function main() {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();

  // Desktop — English full page
  const desktop = await browser.newPage();
  await desktop.setViewportSize({ width: 1440, height: 900 });
  await desktop.goto(`${BASE_URL}/en`, { waitUntil: "networkidle" });
  await desktop.screenshot({ path: `${OUT}/en-full.png`, fullPage: true });
  await desktop.screenshot({ path: `${OUT}/en-hero.png` });
  console.log("✓ en desktop");

  // Desktop — Italian
  await desktop.goto(`${BASE_URL}/it`, { waitUntil: "networkidle" });
  await desktop.screenshot({ path: `${OUT}/it-full.png`, fullPage: true });
  console.log("✓ it desktop");

  // Mobile — English
  const mobile = await browser.newPage();
  await mobile.setViewportSize({ width: 390, height: 844 });
  await mobile.goto(`${BASE_URL}/en`, { waitUntil: "networkidle" });
  await mobile.screenshot({ path: `${OUT}/en-mobile.png`, fullPage: true });
  console.log("✓ en mobile");

  await browser.close();
  console.log(`\nScreenshots saved to ${OUT}/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
