import { Router, Request, Response } from "express";
import { User } from "../models/User";
import { authMiddleware, AuthRequest } from "../middleware/auth";
import { adminMiddleware } from "../middleware/admin";

const router = Router();

// ===== DASHBOARD STATS =====

// GET /api/admin/stats - Get dashboard statistics
router.get("/stats", authMiddleware, adminMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const totalUsers = await User.countDocuments();
        const activeSubscriptions = await User.countDocuments({ "subscription.status": "active" });
        const adminUsers = await User.countDocuments({ role: "admin" });
        const trainerUsers = await User.countDocuments({ role: "trainer" });

        // Calculate revenue (mock - in real app, sum actual payments)
        const monthlyRevenue = activeSubscriptions * 2000; // Average $20/month
        const growth = Math.floor(Math.random() * 30) + 5; // Mock: 5-35% growth

        res.status(200).json({
            stats: {
                totalUsers,
                activeSubscriptions,
                adminUsers,
                trainerUsers,
                monthlyRevenue: `$${(monthlyRevenue / 100).toFixed(2)}`,
                growth: `+${growth}%`,
            },
        });
    } catch (err: any) {
        console.error("Stats error:", err);
        res.status(500).json({ message: "Failed to fetch stats", error: err.message });
    }
});

// ===== USER MANAGEMENT =====

// GET /api/admin/users - Get all users with pagination
router.get("/users", authMiddleware, adminMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const users = await User.find()
            .select("-password")
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: -1 });

        const total = await User.countDocuments();

        res.status(200).json({
            users,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        });
    } catch (err: any) {
        console.error("Get users error:", err);
        res.status(500).json({ message: "Failed to fetch users", error: err.message });
    }
});

// GET /api/admin/users/:id - Get specific user
router.get("/users/:id", authMiddleware, adminMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ user });
    } catch (err: any) {
        console.error("Get user error:", err);
        res.status(500).json({ message: "Failed to fetch user", error: err.message });
    }
});

// PUT /api/admin/users/:id/role - Update user role
router.put("/users/:id/role", authMiddleware, adminMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { role } = req.body;

        if (!role || !["admin", "trainer", "user"].includes(role)) {
            res.status(400).json({ message: "Invalid role" });
            return;
        }

        // Prevent downgrading yourself from admin
        if (req.userId === req.params.id && role !== "admin") {
            res.status(403).json({ message: "Cannot remove your own admin role" });
            return;
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        ).select("-password");

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json({ message: "User role updated", user });
    } catch (err: any) {
        console.error("Update role error:", err);
        res.status(500).json({ message: "Failed to update user role", error: err.message });
    }
});

// DELETE /api/admin/users/:id - Delete user (soft delete via status)
router.delete("/users/:id", authMiddleware, adminMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        if (req.userId === req.params.id) {
            res.status(403).json({ message: "Cannot delete your own account" });
            return;
        }

        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (err: any) {
        console.error("Delete user error:", err);
        res.status(500).json({ message: "Failed to delete user", error: err.message });
    }
});

// ===== SUBSCRIPTION MANAGEMENT =====

// GET /api/admin/subscriptions - Get subscription overview
router.get("/subscriptions", authMiddleware, adminMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const subscriptions = await User.find({ "subscription.status": "active" })
            .select("email fullName subscription createdAt")
            .sort({ "subscription.startDate": -1 });

        const summary = {
            basic: subscriptions.filter(u => u.subscription?.plan === "basic").length,
            pro: subscriptions.filter(u => u.subscription?.plan === "pro").length,
            elite: subscriptions.filter(u => u.subscription?.plan === "elite").length,
        };

        res.status(200).json({
            subscriptions,
            summary,
        });
    } catch (err: any) {
        console.error("Subscriptions error:", err);
        res.status(500).json({ message: "Failed to fetch subscriptions", error: err.message });
    }
});

export default router;
