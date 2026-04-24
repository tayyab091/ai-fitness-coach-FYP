import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import trainerRoutes from "./routes/trainers";
import recipeRoutes from "./routes/recipes";
import exerciseRoutes from "./routes/exercises";
import paymentRoutes from "./routes/payments";
import adminRoutes from "./routes/admin";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/fitness";
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

// Middleware
app.use(
    cors({
        origin: CLIENT_URL,
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes);

// Health check
app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Serve static files from the client/out folder (Next.js export)
// extensions: ['html'] allows serving /about as /about.html
app.use(express.static(path.join(__dirname, "../../client/out"), {
    extensions: ["html"]
}));

// Catch-all route for SPA fallback (if usePathname or client-side routing is used)
app.get("*", (req, res) => {
    if (!req.path.startsWith("/api")) {
        // Fallback to the main index.html for unknown routes
        res.sendFile(path.join(__dirname, "../../client/out/index.html"), (err) => {
            if (err) {
                res.status(500).send("Client build not found. Please run 'npm run build:client' first.");
            }
        });
    }
});

// Connect to MongoDB and start server
const startServer = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ Connected to MongoDB");
    } catch (err: any) {
        console.error("❌ MongoDB connection error:", err.message);
        console.warn("⚠️ Continuing without MongoDB. Some features will be unavailable.");
        console.warn("👉 Make sure your MongoDB service is running or check your MONGO_URI in .env");
    }

    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
};

startServer();

export default app;
