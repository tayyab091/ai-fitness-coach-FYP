import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { authMiddleware, AuthRequest } from "../middleware/auth";

const router = Router();

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// POST /api/auth/register
router.post("/register", async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, fullName } = req.body;

        if (!email || !password || !fullName) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }

        const existing = await User.findOne({ email });
        if (existing) {
            res.status(409).json({ message: "Email already in use" });
            return;
        }

        const user = await User.create({ email, password, fullName });

        const token = jwt.sign(
            { userId: user._id.toString(), role: user.role },
            process.env.JWT_SECRET || "secret",
            { expiresIn: "7d" }
        );

        res.cookie("token", token, COOKIE_OPTIONS);
        res.status(201).json({
            user: {
                id: user._id,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
                avatarUrl: user.avatarUrl,
            },
        });
    } catch (err: any) {
        console.error("Register error:", err);
        if (err.name === "ValidationError") {
            const messages = Object.values(err.errors).map((val: any) => val.message);
            res.status(400).json({ message: messages.join(", ") });
            return;
        }
        res.status(500).json({ message: err.message || "Server error" });
    }
});

// POST /api/auth/login
router.post("/login", async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }

        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }

        const token = jwt.sign(
            { userId: user._id.toString(), role: user.role },
            process.env.JWT_SECRET || "secret",
            { expiresIn: "7d" }
        );

        res.cookie("token", token, COOKIE_OPTIONS);
        res.json({
            user: {
                id: user._id,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
                avatarUrl: user.avatarUrl,
            },
        });
    } catch (err: any) {
        console.error("Login error:", err);
        res.status(500).json({ message: err.message || "Server error" });
    }
});

// POST /api/auth/logout
router.post("/logout", (_req: Request, res: Response): void => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
});

// GET /api/auth/me — returns current user from cookie
router.get("/me", authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json({
            user: {
                id: user._id,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
                avatarUrl: user.avatarUrl,
            },
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
