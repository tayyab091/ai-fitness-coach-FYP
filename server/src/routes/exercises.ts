import { Router, Request, Response } from "express";
import { Exercise } from "../models/Exercise";
import { authMiddleware } from "../middleware/auth";
import { adminMiddleware } from "../middleware/admin";

const router = Router();

// GET /api/exercises
router.get("/", async (req: Request, res: Response): Promise<void> => {
    try {
        // 1. Check local cache
        const localExercises = await Exercise.find();
        
        if (localExercises.length > 0) {
            console.log("Serving exercises from local MongoDB cache.");
            res.json(localExercises);
            return;
        }

        // 2. Fetch from external API if cache is empty
        const apiKey = process.env.API_NINJAS_KEY;
        console.log("Local cache empty. Fetching from API Ninjas...");

        if (!apiKey) {
            // Provide mock data if API key is not available
            console.log("API_NINJAS_KEY missing, using mock data.");
            const mockExercises = [
                {
                    name: "Incline Hammer Curls",
                    type: "strength",
                    muscle: "biceps",
                    equipment: "dumbbell",
                    difficulty: "beginner",
                    instructions: "Seat yourself on an incline bench with a dumbbell in each hand. You should pressed firmly against the back with your feet together. Allow the dumbbells to hang straight down at your side, holding them with a neutral grip. This will be your starting position. Initiate the movement by flexing at the elbow, attempting to keep the upper arm stationary. Continue to the top of the movement and pause, then slowly return to the start position."
                },
                {
                    name: "Wide-grip barbell curl",
                    type: "strength",
                    muscle: "biceps",
                    equipment: "barbell",
                    difficulty: "beginner",
                    instructions: "Stand up with your torso upright while holding a barbell at a wide grip. The palm of your hands should be facing forward. The elbows should be close to the torso. This will be your starting position. While holding the upper arms stationary, curl the weights forward while contracting the biceps as you breathe out. Tip: Only the forearms should move. Continue the movement until your biceps are fully contracted and the bar is at shoulder level. Hold the contracted position for a second and squeeze the biceps hard. Slowly begin to bring the bar back to starting position as your breathe in. Repeat for the recommended amount of repetitions."
                }
            ];
            const inserted = await Exercise.insertMany(mockExercises);
            res.json(inserted);
            return;
        }

        const response = await fetch("https://api.api-ninjas.com/v1/exercises?muscle=biceps", {
            headers: {
                "X-Api-Key": apiKey
            }
        });

        if (!response.ok) {
            throw new Error(`API Ninjas returned ${response.status}`);
        }

        const externalExercises = (await response.json()) as any[];
        
        // 3. Save to local DB cache
        if (externalExercises && externalExercises.length > 0) {
            const inserted = await Exercise.insertMany(externalExercises);
            res.json(inserted);
        } else {
            res.json([]);
        }
    } catch (err: any) {
        console.error("Exercises fetch error:", err);
        res.status(500).json({ message: err.message || "Failed to fetch exercises" });
    }
});

// POST /api/exercises
router.post("/", authMiddleware, adminMiddleware, async (req: Request, res: Response): Promise<void> => {
    try {
        const exercise = await Exercise.create(req.body);
        res.status(201).json(exercise);
    } catch (err: any) {
        if (err.name === "ValidationError") {
            const messages = Object.values(err.errors).map((val: any) => val.message);
            res.status(400).json({ message: messages.join(", ") });
            return;
        }
        res.status(500).json({ message: "Server error" });
    }
});

// PUT /api/exercises/:id
router.put("/:id", authMiddleware, adminMiddleware, async (req: Request, res: Response): Promise<void> => {
    try {
        const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!exercise) {
            res.status(404).json({ message: "Exercise not found" });
            return;
        }
        res.json(exercise);
    } catch (err: any) {
        if (err.name === "ValidationError") {
            const messages = Object.values(err.errors).map((val: any) => val.message);
            res.status(400).json({ message: messages.join(", ") });
            return;
        }
        res.status(500).json({ message: "Server error" });
    }
});

// DELETE /api/exercises/:id
router.delete("/:id", authMiddleware, adminMiddleware, async (req: Request, res: Response): Promise<void> => {
    try {
        const exercise = await Exercise.findByIdAndDelete(req.params.id);
        if (!exercise) {
            res.status(404).json({ message: "Exercise not found" });
            return;
        }
        res.json({ message: "Exercise deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
