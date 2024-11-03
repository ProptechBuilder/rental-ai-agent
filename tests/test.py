from playwright.sync_api import sync_playwright
import random
import time

FB_URL = 'https://www.facebook.com/'
USERNAME = 'qiqimei1205@gmail.com'
PASSWORD = 'Pux2oCsy1w'
PROPERTY_DETAILS = {
    'title': '1B1B Suite Rental in a Newly Built 5B5B House',
    'price': '1250',
    'category': 'Property Rentals',
    'propertyType': 'Apartment',
    'rentalType': 'Rent',
    'privateRoom': True,
    'bathroomType': 'Private',
    'bedrooms': '1',
    'bathrooms': '1',
    'address': '123 Main St, Tacoma, WA',
    'description': 'Private bathrooms, furnished common spaces, modern amenities like AC, mini-fridge, microwave. Prime location near PLU, QFC, Starbucks, parks, trails, and JBLM. Rent includes utilities.',
    'location': 'Tacoma, WA',
    'images': ['./tests/image/photo.jpg'],
    'numberOfResidents': '1'
}

def wait_random():
    time.sleep(random.uniform(1, 3))

def login_to_facebook(page):
    page.goto(FB_URL)
    wait_random()

    page.fill('input[name="email"]', USERNAME)
    wait_random()
    page.fill('input[name="pass"]', PASSWORD)
    wait_random()
    page.click('button[name="login"]')
    wait_random()

    page.wait_for_navigation()  # Wait for navigation to complete after login

def create_marketplace_listing(page):
    # Navigate to Facebook Marketplace
    page.goto('https://www.facebook.com/marketplace/create/rental')
    wait_random()

    # Fill in the listing details
    page.wait_for_selector('label[aria-label="Home for Sale or Rent"]')
    page.click('label[aria-label="Home for Sale or Rent"]')
    wait_random()
    page.keyboard.press('ArrowDown')  # Navigate to the desired option
    wait_random()
    page.keyboard.press('Enter')
    wait_random()

    page.wait_for_selector('label[aria-label="Rental type"]')
    page.click('label[aria-label="Rental type"]')
    wait_random()
    page.keyboard.press('ArrowDown')  # Navigate to the desired option
    wait_random()
    page.keyboard.press('Enter')
    wait_random()

    if PROPERTY_DETAILS['privateRoom']:
        page.wait_for_selector('input[aria-label="This is a private room in a shared property."]')
        page.click('input[aria-label="This is a private room in a shared property."]')
        wait_random()

    page.wait_for_selector('label[aria-label="Bathroom Type"]')
    page.click('label[aria-label="Bathroom Type"]')
    wait_random()
    page.keyboard.press('ArrowDown')  # Navigate to the desired option
    wait_random()
    page.keyboard.press('Enter')
    wait_random()

    # Fill in "How many people live here?"
    label_handle = page.wait_for_selector('label:has-text("How many people live here?")')
    input_handle = label_handle.query_selector('input[type="text"]')
    if input_handle:
        input_handle.fill(PROPERTY_DETAILS['numberOfResidents'])
        wait_random()

    bedrooms_label_handle = page.wait_for_selector('label:has-text("Number of bedrooms")')
    bedrooms_input_handle = bedrooms_label_handle.query_selector('input[type="text"]')
    if bedrooms_input_handle:
        bedrooms_input_handle.fill(PROPERTY_DETAILS['bedrooms'])
        wait_random()

    bathrooms_label_handle = page.wait_for_selector('label:has-text("Number of bathrooms")')
    bathrooms_input_handle = bathrooms_label_handle.query_selector('input[type="text"]')
    if bathrooms_input_handle:
        bathrooms_input_handle.fill(PROPERTY_DETAILS['bathrooms'])
        wait_random()

    price_label_handle = page.wait_for_selector('label:has-text("Price per month")')
    price_input_handle = price_label_handle.query_selector('input[type="text"]')
    if price_input_handle:
        price_input_handle.fill(PROPERTY_DETAILS['price'])
        wait_random()

    address_label_handle = page.wait_for_selector('label:has-text("Rental address")')
    address_input_handle = address_label_handle.query_selector('input[type="text"]')
    if address_input_handle:
        address_input_handle.fill(PROPERTY_DETAILS['address'])
        wait_random()
        page.keyboard.press('ArrowDown')  # Select the first option from the dropdown
        wait_random()
        page.keyboard.press('Enter')
        wait_random()

    description_label_handle = page.wait_for_selector('label:has-text("Rental description")')
    description_input_handle = description_label_handle.query_selector('textarea')
    if description_input_handle:
        description_input_handle.fill(PROPERTY_DETAILS['description'])
        wait_random()

    # Upload images
    add_photo_button = page.wait_for_selector('xpath=//span[text()="Add photos"]')
    for image_path in PROPERTY_DETAILS['images']:
        file_chooser = page.expect_file_chooser()
        add_photo_button.click()
        file_chooser.set_files(image_path)
        wait_random()

    # Click on 'Next' and complete the listing
    page.wait_for_selector('div[aria-label="Next"]')
    page.click('div[aria-label="Next"]')
    wait_random()
    page.wait_for_selector('div[aria-label="Publish"]')
    # TODO: not publishing the listing for now
    # page.click('div[aria-label="Publish"]')
    # wait_random()

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    context = browser.new_context()
    page = context.new_page()

    login_to_facebook(page)
    create_marketplace_listing(page)

    browser.close()
