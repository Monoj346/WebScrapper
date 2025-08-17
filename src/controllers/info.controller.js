import axios from "axios";
import * as cheerio from "cheerio";
import { supabase } from "../db/dbConnect.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import genAI from "../utils/geminiClient.js"; 
import { isValidUrl, normalizeUrl } from "../utils/validators.js";


async function enhanceDescription(name, desc) {
  const baseText = `
  Website Name: ${name || "Unknown"}.
  Website Description: ${desc || "No description available"}.
  `;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    You are a professional content writer.
    Write a ~100 word engaging summary about the following website.
    Do NOT just repeat the title or description.
    Expand meaningfully, explain what the website might offer, its audience, and its value.

    ${baseText}
    `;

    const result = await model.generateContent(prompt);
    let aiText = result.response.text().trim();

    if (!aiText || aiText.length < 50 || aiText.toLowerCase() === (desc || "").toLowerCase()) {
      aiText = `${desc || name} - This website is an online platform likely designed to provide services, tools, or information related to its brand. It offers value to users by delivering digital resources, guidance, or utilities that make online tasks easier.`;
    }

    return aiText;
  } catch (err) {
    console.error("Gemini enhancement failed:", err.message);
    return desc || name;
  }
}


export const createWebsiteInfo = asyncHandler(async (req, res) => {
  let { url } = req.body;

  if (!url) throw new ApiError(400, "URL is required");

  url = normalizeUrl(url);

  if (!isValidUrl(url)) throw new ApiError(400, "Invalid URL format. Use http(s)://domain.tld");

  let html;
  try {
    const { data } = await axios.get(url, {
      timeout: 10000, // 10s
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
    });
    html = data;
  } catch (err) {
    if (err.code === "ECONNABORTED") throw new ApiError(504, "Request timed out while fetching website");
    if (err.response) throw new ApiError(err.response.status, `Failed to fetch website (HTTP ${err.response.status})`);
    throw new ApiError(502, "Failed to fetch website content", [err.message]);
  }

  const $ = cheerio.load(html);

  const name = $("title").first().text().trim() || "Unknown Website";

  let description = $('meta[name="description"]').attr("content")?.trim();


  if (!description) {
    const paragraphs = $("p")
      .map((i, el) => $(el).text().trim())
      .get()
      .filter((t) => t.length > 30)
      .slice(0, 3)
      .join(" ");
    description = paragraphs || null;
  }


  if (!description) description = $("h1").first().text().trim() || $("h2").first().text().trim() || null;


  if (!description) {
    description = "No description available for this website.";
    console.warn(`No metadata found for URL: ${url}`);
  }

  const enhancedDescription = await enhanceDescription(name, description);

  const { data, error } = await supabase.from("website_info").insert([
    { url, name, description, enhanced_description: enhancedDescription },
  ]);

  if (error) throw new ApiError(500, "Database insert failed", [error.message]);

  return res.status(201).json(new ApiResponse(201, data, "Website info stored successfully"));
});


export const getAllWebsites = asyncHandler(async (req, res) => {
  const { data, error } = await supabase.from("website_info").select("*");
  if (error) throw new ApiError(500, "Failed to fetch records", [error.message]);
  return res.status(200).json(new ApiResponse(200, data, "Fetched all website records"));
});


export const updateWebsiteInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, enhanced_description } = req.body;

  if (!id) throw new ApiError(400, "Record ID is required");

  const { data, error } = await supabase
    .from("website_info")
    .update({ name, description, enhanced_description })
    .eq("id", id)
    .select();

  if (error) throw new ApiError(500, "Failed to update record", [error.message]);

  return res.status(200).json(new ApiResponse(200, data, "Website record updated successfully"));
});


export const deleteWebsiteInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) throw new ApiError(400, "Record ID is required");

  const { error } = await supabase.from("website_info").delete().eq("id", id);

  if (error) throw new ApiError(500, "Failed to delete record", [error.message]);

  return res.status(200).json(new ApiResponse(200, null, "Website record deleted successfully"));
});
