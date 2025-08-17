import rateLimit from "express-rate-limit";

// Limit: 100 requests per 5 minutes per IP
export const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100, 
  message: {
    success: false,
    error: "Too many requests from this IP, please try again after 5 minutes",
  },
  standardHeaders: true, 
  legacyHeaders: false, 
});
