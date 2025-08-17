import dotenv from "dotenv";
dotenv.config();

console.log("Loaded GOOGLE_API_KEY:", process.env.GOOGLE_API_KEY); 
import app from "./app.js";
import { supabase } from "./db/dbConnect.js";

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    // simple test query
    const { data, error } = await supabase.from("website_info").select("id").limit(1);

    if (error) {
      console.error("Supabase connection failed:", error.message);
    } else {
      console.log("Supabase connected successfully");
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Unexpected error while starting server:", err);
  }
};

startServer();
