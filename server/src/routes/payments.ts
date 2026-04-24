import { Router, Request, Response } from "express";
import { User } from "../models/User";
import { authMiddleware, AuthRequest } from "../middleware/auth";

const router = Router();

// Plan pricing configuration
const PLAN_PRICES: Record<string, number> = {
    basic: 0,
    pro: 1999, // $19.99 in cents
    elite: 3999, // $39.99 in cents
};

// POST /api/payments/subscribe - Process subscription payment
router.post("/subscribe", authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { plan, cardData } = req.body;
        // Use req.userId (set by authMiddleware), not req.user?.userId
        const userId = req.userId;

        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        if (!plan || !["basic", "pro", "elite"].includes(plan)) {
            res.status(400).json({ message: "Invalid plan selected" });
            return;
        }

        if (!cardData || !cardData.cardholderName) {
            res.status(400).json({ message: "Card details are required" });
            return;
        }

        // Find user
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        // Simulate payment processing
        // In a real app, you'd integrate with Stripe, PayPal, etc.
        const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1); // 1 month subscription

        // Update user subscription
        user.subscription = {
            plan: plan as "basic" | "pro" | "elite",
            status: "active",
            startDate,
            endDate,
            paymentId,
        };

        await user.save();

        res.status(200).json({
            message: "Subscription activated successfully",
            subscription: {
                plan: user.subscription.plan,
                status: user.subscription.status,
                startDate: user.subscription.startDate,
                endDate: user.subscription.endDate,
                paymentId,
            },
        });
    } catch (err: any) {
        console.error("Payment error:", err);
        res.status(500).json({ message: "Payment processing failed", error: err.message });
    }
});

// GET /api/payments/subscription - Get user subscription status
router.get("/subscription", authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        // Use req.userId (set by authMiddleware), not req.user?.userId
        const userId = req.userId;

        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json({
            subscription: user.subscription || {
                plan: null,
                status: "inactive",
            },
        });
    } catch (err: any) {
        console.error("Get subscription error:", err);
        res.status(500).json({ message: "Failed to fetch subscription", error: err.message });
    }
});

// POST /api/payments/cancel - Cancel subscription
router.post("/cancel", authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        // Use req.userId (set by authMiddleware), not req.user?.userId
        const userId = req.userId;

        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        if (!user.subscription || user.subscription.status === "inactive") {
            res.status(400).json({ message: "No active subscription to cancel" });
            return;
        }

        user.subscription.status = "cancelled";
        await user.save();

        res.status(200).json({
            message: "Subscription cancelled successfully",
        });
    } catch (err: any) {
        console.error("Cancel subscription error:", err);
        res.status(500).json({ message: "Failed to cancel subscription", error: err.message });
    }
});

export default router;
