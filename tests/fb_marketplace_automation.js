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

  // Fill in the listing details
  await page.waitForSelector('label[aria-label="Home for Sale or Rent"]');
  await page.click('label[aria-label="Home for Sale or Rent"]');
  await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));
  await page.keyboard.press('ArrowDown'); // Navigate to the desired option
  await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));
  await page.keyboard.press('Enter');
  await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));

  await page.waitForSelector('label[aria-label="Rental type"]');
  await page.click('label[aria-label="Rental type"]');
  await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));
  await page.keyboard.press('ArrowDown'); // Navigate to the desired option
  await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));
  await page.keyboard.press('Enter');
  await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));

  if (PROPERTY_DETAILS.privateRoom) {
    await page.waitForSelector('input[aria-label="This is a private room in a shared property."]');
    await page.click('input[aria-label="This is a private room in a shared property."]');
    await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));
  }

  await page.waitForSelector('label[aria-label="Bathroom Type"]');
  await page.click('label[aria-label="Bathroom Type"]');
  await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));
  await page.keyboard.press('ArrowDown'); // Navigate to the desired option
  await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));
  await page.keyboard.press('Enter');
  await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));

  // Fill in "How many people live here?"
  const labelHandle = await page.waitForSelector('label:has-text("How many people live here?")');
  const inputHandle = await labelHandle.$('input[type="text"]');
  if (inputHandle) {
    await inputHandle.fill(PROPERTY_DETAILS.numberOfResidents);
    await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));
  }

  const bedroomsLabelHandle = await page.waitForSelector('label:has-text("Number of bedrooms")');
  const bedroomsInputHandle = await bedroomsLabelHandle.$('input[type="text"]');
  if (bedroomsInputHandle) {
    await bedroomsInputHandle.fill(PROPERTY_DETAILS.bedrooms);
    await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));
  }
  const bathroomsLabelHandle = await page.waitForSelector('label:has-text("Number of bathrooms")');
  const bathroomsInputHandle = await bathroomsLabelHandle.$('input[type="text"]');
  if (bathroomsInputHandle) {
    await bathroomsInputHandle.fill(PROPERTY_DETAILS.bathrooms);
    await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));
  }
  const priceLabelHandle = await page.waitForSelector('label:has-text("Price per month")');
  const priceInputHandle = await priceLabelHandle.$('input[type="text"]');
  if (priceInputHandle) {
    await priceInputHandle.fill(PROPERTY_DETAILS.price);
    await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));
  }
  const addressLabelHandle = await page.waitForSelector('label:has-text("Rental address")');
  const addressInputHandle = await addressLabelHandle.$('input[type="text"]');
  if (addressInputHandle) {
    await addressInputHandle.fill(PROPERTY_DETAILS.address);
    await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));
    await page.keyboard.press('ArrowDown'); // Select the first option from the dropdown
    await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));
    await page.keyboard.press('Enter');
    await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));
  }
  const descriptionLabelHandle = await page.waitForSelector('label:has-text("Rental description")');
  const descriptionInputHandle = await descriptionLabelHandle.$('textarea');
  if (descriptionInputHandle) {
    await descriptionInputHandle.fill(PROPERTY_DETAILS.description);
    await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));
  }

  // Upload images
  for (const imagePath of PROPERTY_DETAILS.images) {
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.click('div[aria-label="Add Photos"]'),
    ]);
    await fileChooser.setFiles(imagePath);
    await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));
  }

  // Click on 'Next' and complete the listing
  await page.waitForSelector('div[aria-label="Next"]');
  await page.click('div[aria-label="Next"]');
  await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));
  await page.waitForSelector('div[aria-label="Publish"]');
  await page.click('div[aria-label="Publish"]');
  await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));
}
