import express from "express";
import infoRoutes from "./routes/info.routes.js";
import { limiter } from "./utils/rateLimiter.js";

const app = express();


app.use(express.json());

app.use(limiter);

// Routes
app.use("/api/info", infoRoutes);

export default app;
