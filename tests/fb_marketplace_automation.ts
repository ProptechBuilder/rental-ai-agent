import { chromium, Page } from 'playwright';

const FB_URL = 'https://www.facebook.com/';
const USERNAME = 'qiqimei1205@gmail.com';
const PASSWORD = 'Pux2oCsy1w';
const PROPERTY_DETAILS = {
  title: '1B1B Suite Rental in a Newly Built 5B5B House',
  price: '1250',
  category: 'Property Rentals',
  propertyType: 'House',
  description:
    'Private bathrooms, furnished common spaces, modern amenities like AC, mini-fridge, microwave. Prime location near PLU, QFC, Starbucks, parks, trails, and JBLM. Rent includes utilities.',
  location: 'Tacoma, WA',
  images: ['path_to_image1.jpg', 'path_to_image2.jpg'],
};

(async () => {
  const browser = await chromium.launch({ headless: false }); // Headless false so you can see what's happening
  const context = await browser.newContext();
  const page = await context.newPage();

  await loginToFacebook(page);
  await createMarketplaceListing(page);

  await browser.close();
})();

async function loginToFacebook(page: Page) {
  await page.goto(FB_URL);

  await page.fill('input[name="email"]', USERNAME);
  await page.fill('input[name="pass"]', PASSWORD);
  await page.click('button[name="login"]');

  await page.waitForNavigation(); // Wait for navigation to complete after login
}

async function createMarketplaceListing(page: Page) {
  // Navigate to Facebook Marketplace
  await page.goto('https://www.facebook.com/marketplace/create/rental');

  // Fill in the listing details
  await page.fill('input[placeholder="Title"]', PROPERTY_DETAILS.title);
  await page.fill('input[placeholder="Price"]', PROPERTY_DETAILS.price);
  await page.selectOption('select[aria-label="Category"]', {
    label: PROPERTY_DETAILS.category,
  });
  await page.selectOption('select[aria-label="Property type"]', {
    label: PROPERTY_DETAILS.propertyType,
  });
  await page.fill('textarea[aria-label="Describe your item"]', PROPERTY_DETAILS.description);
  await page.fill('input[placeholder="Location"]', PROPERTY_DETAILS.location);

  // Upload images
  for (const imagePath of PROPERTY_DETAILS.images) {
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.click('div[aria-label="Add Photos"]'),
    ]);
    await fileChooser.setFiles(imagePath);
  }

  // Click on 'Next' and complete the listing
  await page.click('div[aria-label="Next"]');
  await page.click('div[aria-label="Publish"]');
}
