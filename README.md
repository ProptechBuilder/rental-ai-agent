# Rental listing AI agent

## Prerequisite 
First, install playwright: npm init playwright@latest

Doc: https://playwright.dev/docs/intro

## FB listing automation
Run node fb_marketplace_automation.js in the tests folder. It will open a new browser and fill in the information. 

Current blocker: upload image in creating the listing - being worked on in test_image.js

I'm using test_image.js to try to upload the listing photos, but it is not working. Once we get this figured out, we can autoamte listing creation.
main

# Call Rental Creation API

curl -X POST http://localhost:8000/generate_rental_ad \
     -H "Content-Type: application/json" \
     -d '{
           "images": [
             "https://storage.googleapis.com/gs_bucket_20/902-904-Tacoma-13.jpg",
             "https://storage.googleapis.com/gs_bucket_20/902-904-Tacoma-21.jpg"
           ],
           "contact_name": "Yolanda",
           "contact_email": "yolanda@rentaigent.com",
           "agency_name": "AI Rental Agency",
           "location": "Tacoma, Washington",
           "security_deposit": "two months"
         }'