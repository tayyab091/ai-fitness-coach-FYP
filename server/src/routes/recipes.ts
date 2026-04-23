import { Router, Request, Response } from "express";
import { Recipe } from "../models/Recipe";

const router = Router();

// GET /api/recipes
router.get("/", async (_req: Request, res: Response): Promise<void> => {
    try {
        const recipes = await Recipe.find().sort({ createdAt: -1 });
        res.json(recipes);
    } catch {
        res.status(500).json({ message: "Server error" });
    }
});

// GET /api/recipes/:id
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            res.status(404).json({ message: "Recipe not found" });
            return;
        }
        res.json(recipe);
    } catch {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
