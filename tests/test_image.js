const { chromium } = require('playwright');

const FB_URL = 'https://www.facebook.com/';
const USERNAME = 'qiqimei1205@gmail.com';
const PASSWORD = 'Pux2oCsy1w';
const PROPERTY_DETAILS = {
  title: '1B1B Suite Rental in a Newly Built 5B5B House',
  price: '1250',
  category: 'Property Rentals',
  propertyType: 'Apartment',
  rentalType: 'Rent',
  privateRoom: true,
  bathroomType: 'Private',
  bedrooms: '1',
  bathrooms: '1',
  address: '123 Main St, Tacoma, WA',
  description:
    'Private bathrooms, furnished common spaces, modern amenities like AC, mini-fridge, microwave. Prime location near PLU, QFC, Starbucks, parks, trails, and JBLM. Rent includes utilities.',
  location: 'Tacoma, WA',
  images: ['path_to_image1.jpg', 'path_to_image2.jpg'],
  numberOfResidents: '1',
};

(async () => {
  const browser = await chromium.launch({ headless: false }); // Headless false so you can see what's happening
  const context = await browser.newContext();
  const page = await context.newPage();

  await loginToFacebook(page);
  await createMarketplaceListing(page);

  await browser.close();
})();

async function loginToFacebook(page) {
  await page.goto(FB_URL);
  await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));

  await page.fill('input[name="email"]', USERNAME);
  await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));
  await page.fill('input[name="pass"]', PASSWORD);
  await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));
  await page.click('button[name="login"]');
  await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));

  await page.waitForNavigation(); // Wait for navigation to complete after login
}

async function createMarketplaceListing(page) {
  // Navigate to Facebook Marketplace
  await page.goto('https://www.facebook.com/marketplace/create/rental');
  await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));


  // Upload images
  const addPhotoButton = await page.waitForSelector('div:has-text("Add photos")');
  await addPhotoButton.click();
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    addPhotoButton.click(),
  ]);
  await fileChooser.setFiles(PROPERTY_DETAILS.images);
  await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));

}
