import os
import vertexai
import IPython.display
from vertexai.generative_models import GenerativeModel, Part

# Use the environment variable if the user doesn't provide Project ID.
PROJECT_ID = "re-agent-440517"
# PROJECT_ID = "vivid-argon-440517-e8"
# if not PROJECT_ID or PROJECT_ID == "[your-project-id]":
#     PROJECT_ID = str(os.environ.get("GOOGLE_CLOUD_PROJECT"))

LOCATION = os.environ.get("GOOGLE_CLOUD_REGION", "us-central1")

vertexai.init(project=PROJECT_ID, location=LOCATION)

MODEL_ID = "gemini-1.5-flash-002"
model = GenerativeModel(MODEL_ID)

# Images
files = [
    "https://storage.googleapis.com/gs_bucket_20/902-904-Tacoma-13.jpg",
    "https://storage.googleapis.com/gs_bucket_20/902-904-Tacoma-21.jpg",
    "https://storage.googleapis.com/gs_bucket_20/902-904-Tacoma-12.jpg",
    "https://storage.googleapis.com/gs_bucket_20/902-904-Tacoma-14.jpg",
    "https://storage.googleapis.com/gs_bucket_20/902-904-Tacoma-15.jpg",
]
images = [Part.from_uri(url, mime_type="image/jpeg") for url in files]

# Rental details
contact_name = "Yolanda"
contact_email = "yoland@rentaigent"
agency_name = "AI Rental Agency"
location = "Tacoma, Washington"
security_deposit = "two months"
prompt = f"""
  Look at the pictures uploaded and go through them in detail and describe it in such a way renters love to see the house.
  Use the rent amount based on prevailing market condition at this location {location}. Use current date plus 10 days as available date for now.
  Use liberty to use general rental ads information while generating the text.
  Use security deposit as {security_deposit}.
  Use contact name as {contact_name} and use email for references: {contact_email}.
  Your name is {agency_name}.
  Questions:
  - Generate rental post ad for the house shown in the pictures.
"""

contents = images + [prompt]

# Generate content
response = model.generate_content(contents)
print(response.text)
