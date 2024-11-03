const { chromium } = require('playwright');

const FB_URL = 'https://www.facebook.com/';

const TEST_CREDENTIALS = {
  username: 'qiqimei1205@gmail.com',
  password: 'Pux2oCsy1w',
};
const EXAMPLE_PROPERTY_DETAILS = {
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
  images: ['./tests/image/photo.jpg'],
  numberOfResidents: '1',
};

async function postFacebookMarketplaceListing(credentials, propertyDetails) {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await loginToFacebook(page, credentials);
  await createMarketplaceListing(page, propertyDetails);

  await browser.close();
}

async function loginToFacebook(page, credentials) {
  await page.goto(FB_URL);
  await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));

  await page.fill('input[name="email"]', credentials.username);
  await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));
  await page.fill('input[name="pass"]', credentials.password);
  await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));
  await page.click('button[name="login"]');
  await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));

  await page.waitForNavigation(); // Wait for navigation to complete after login
}

async function createMarketplaceListing(page, propertyDetails) {
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

  if (propertyDetails.privateRoom) {
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
    await inputHandle.fill(propertyDetails.numberOfResidents);
    await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));
  }

  const bedroomsLabelHandle = await page.waitForSelector('label:has-text("Number of bedrooms")');
  const bedroomsInputHandle = await bedroomsLabelHandle.$('input[type="text"]');
  if (bedroomsInputHandle) {
    await bedroomsInputHandle.fill(propertyDetails.bedrooms);
    await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));
  }
  const bathroomsLabelHandle = await page.waitForSelector('label:has-text("Number of bathrooms")');
  const bathroomsInputHandle = await bathroomsLabelHandle.$('input[type="text"]');
  if (bathroomsInputHandle) {
    await bathroomsInputHandle.fill(propertyDetails.bathrooms);
    await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));
  }
  const priceLabelHandle = await page.waitForSelector('label:has-text("Price per month")');
  const priceInputHandle = await priceLabelHandle.$('input[type="text"]');
  if (priceInputHandle) {
    await priceInputHandle.fill(propertyDetails.price);
    await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));
  }
  const addressLabelHandle = await page.waitForSelector('label:has-text("Rental address")');
  const addressInputHandle = await addressLabelHandle.$('input[type="text"]');
  if (addressInputHandle) {
    await addressInputHandle.fill(propertyDetails.address);
    await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));
    await page.keyboard.press('ArrowDown'); // Select the first option from the dropdown
    await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));
    await page.keyboard.press('Enter');
    await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));
  }
  const descriptionLabelHandle = await page.waitForSelector('label:has-text("Rental description")');
  const descriptionInputHandle = await descriptionLabelHandle.$('textarea');
  if (descriptionInputHandle) {
    await descriptionInputHandle.fill(propertyDetails.description);
    await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));
  }

  // Upload images
  const addPhotoButton = await page.waitForSelector('xpath=//span[text()="Add photos"]');
  for (const imagePath of propertyDetails.images) {
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      addPhotoButton.click(),
    ]);
    await fileChooser.setFiles(propertyDetails.images);
    await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));
  }

  // Click on 'Next' and complete the listing
  await page.waitForSelector('div[aria-label="Next"]');
  await page.click('div[aria-label="Next"]');
  await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));
  await page.waitForSelector('div[aria-label="Publish"]');
  console.log('Publishing listing...');
  // TODO: not publishing the listing for now
  //   await page.click('div[aria-label="Publish"]');
//   await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));
}

postFacebookMarketplaceListing(TEST_CREDENTIALS, EXAMPLE_PROPERTY_DETAILS);

module.exports = { postFacebookMarketplaceListing };
