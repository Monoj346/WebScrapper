Web Scrapper Backend API

A robust backend API to scrape websites, extract brand information, and generate AI-enhanced descriptions using Google Gemini. This project implements CRUD operations, error handling, rate limiting, and AI-powered enrichment.

Features----------------------

i)Website Data Extraction: Scrapes a website to retrieve its title, meta description, or fallback content from paragraphs/headings.

ii)AI-powered Description Enrichment: Uses Google Gemini to generate engaging ~100-word summaries for website descriptions.

iii)CRUD Operations:

Create: Add a new website record.
Read: Fetch all stored website records.
Update: Edit existing website records including AI-enriched description.
Delete: Remove website records by ID.

iv)Error Handling & Validation:

v)Validates URL formats.

vi)Handles timeouts, inaccessible sites, and missing metadata gracefully.

vii)Rate Limiting: Prevents API abuse.

viii)Supabase Integration: Stores website records in a Supabase database.

ix)Vercel Deployment: Easily deployable as a serverless backend.



Tech Stack-------------------

Node.js + Express – Backend framework.
Supabase – Database & authentication.
Cheerio – HTML parsing and scraping.
Axios – HTTP requests to fetch website content.
Google Gemini – AI-powered description enrichment.
dotenv – Environment variable management.

----Getting Started------

Prerequisites

Node.js >= 18
Supabase account and project
Google Cloud account with Generative AI API enabled
Postman (for testing API endpoints)


Installation-----------------

i)Clone the repository:

git clone https://github.com/Monoj346/WebScrapper.git
cd WebScrapper


ii)Install dependencies:

npm install


iii)Create a .env file in the root directory:

PORT=8000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
GOOGLE_API_KEY=your_google_generative_ai_key


iv)Start the server:

npm run dev



Server runs on http://localhost:8000.

API Endpoints
1. Create Website Info

URL: /api/info/post

Method: POST

Body:

{
  "url": "https://example.com"
}


Response:
Adds a new website record with AI-enhanced description.

2. Get All Websites

URL: /api/info/getall

Method: GET

Response:
Returns all stored website records.

3. Update Website Info

URL: /api/info/:id/update

Method: PUT

Body Example:

{
  "name": "Example Site",
  "description": "Original description",
  "enhanced_description": "AI-enriched description"
}


Response: Updates the record by ID.

4. Delete Website Info

URL: /api/info/:id/delete

Method: DELETE

Response: Deletes the record by ID.



Rate Limiting-----------------
The API includes rate limiting to prevent abuse. The limits can be configured in src/utils/rateLimiter.js.

AI Description Enrichment------------------
Uses Google Gemini instead of OpenAI for generating descriptions.
Allows 50–60 requests/day, making it suitable for bulk processing.
Provides ~100-word engaging summaries, expanding on website purpose, audience, and value.


Thanks........
