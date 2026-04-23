import { Router, Request, Response } from "express";
import { Trainer } from "../models/Trainer";

const router = Router();

// GET /api/trainers
router.get("/", async (_req: Request, res: Response): Promise<void> => {
    try {
        const trainers = await Trainer.find().sort({ rating: -1 });
        res.json(trainers);
    } catch {
        res.status(500).json({ message: "Server error" });
    }
});

// GET /api/trainers/featured
router.get("/featured", async (_req: Request, res: Response): Promise<void> => {
    try {
        const trainer = await Trainer.findOne({ isFeatured: true });
        res.json(trainer);
    } catch {
        res.status(500).json({ message: "Server error" });
    }
});

// GET /api/trainers/:id
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        const trainer = await Trainer.findById(req.params.id);
        if (!trainer) {
            res.status(404).json({ message: "Trainer not found" });
            return;
        }
        res.json(trainer);
    } catch {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
