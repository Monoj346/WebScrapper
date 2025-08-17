import express from "express";
import infoRoutes from "./routes/info.routes.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/info", infoRoutes);

export default app;
