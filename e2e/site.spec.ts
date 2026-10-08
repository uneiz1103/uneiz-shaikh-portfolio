import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { formatExperience } from "../lib/profile";

function publishedSlugs(collection: "projects" | "writing") {
  const dir = path.join(__dirname, "..", "content", collection);
  return readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => readFileSync(path.join(dir, file), "utf8"))
    .filter((source) => !/^draft:\s*true\s*$/m.test(source))
    .map((source) => source.match(/^slug:\s*(\S+)\s*$/m)?.[1])
    .filter((slug): slug is string => Boolean(slug));
}

const projectSlugs = publishedSlugs("projects");
const noteSlugs = publishedSlugs("writing");

const routes = [
  "/",
  "/projects",
  ...projectSlugs.map((slug) => `/projects/${slug}`),
  "/writing",
  ...noteSlugs.map((slug) => `/writing/${slug}`),
  "/about",
  "/contact",
  "/resume",
];

for (const route of routes) {
  test.describe(route, () => {
    test("renders with a single h1 and no horizontal overflow", async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });

    for (const colorScheme of ["light", "dark"] as const) {
      test(`has no serious accessibility violations (${colorScheme})`, async ({ page }) => {
        await page.emulateMedia({ colorScheme, reducedMotion: "reduce" });
        await page.goto(route);
        const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
        const serious = results.violations.filter(
          (violation) => violation.impact === "serious" || violation.impact === "critical",
        );
        expect(
          serious.map(
            (violation) => `${violation.id}: ${violation.nodes.map((n) => n.target).join(", ")}`,
          ),
        ).toEqual([]);
      });
    }
  });
}

test("unknown routes return 404", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
});

test("mobile menu opens, navigates, and closes", async ({ page, isMobile }) => {
  test.skip(!isMobile, "The menu button is only shown below the lg breakpoint.");
  await page.goto("/");

  await page.getByRole("button", { name: "Open menu" }).click();
  const menu = page.getByRole("dialog", { name: "Menu" });
  await expect(menu).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();

  await page.getByRole("button", { name: "Open menu" }).click();
  await menu.getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(menu).toBeHidden();
});

test("RSS feed lists every note", async ({ request }) => {
  const response = await request.get("/feed.xml");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/rss+xml");
  const body = await response.text();
  expect(body).toContain("<rss");
  for (const slug of noteSlugs) {
    expect(body).toContain(`/writing/${slug}`);
  }
});

test("experience duration is current on the home and about pages", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText(formatExperience("decimal"), { exact: true })).toBeVisible();

  await page.goto("/about");
  await expect(page.getByText(`${formatExperience("long")} of professional experience`)).toBeVisible();
});

test("resume PDF is served", async ({ request }) => {
  const response = await request.get("/uneiz-shaikh-resume.pdf");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/pdf");
});

test("sitemap and robots are served", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("https://uneiz-shaikh.vercel.app/about");

  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
});
