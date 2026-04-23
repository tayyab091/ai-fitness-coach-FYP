import mongoose, { Document, Schema } from "mongoose";

export interface IRecipe extends Document {
    title: string;
    imageUrl: string;
    mealType: "Breakfast" | "Lunch" | "Dinner" | "Snack";
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    ingredients: string[];
    instructions: string[];
    prepTimeMinutes: number;
}

const RecipeSchema = new Schema<IRecipe>(
    {
        title: { type: String, required: true },
        imageUrl: { type: String, default: "" },
        mealType: {
            type: String,
            enum: ["Breakfast", "Lunch", "Dinner", "Snack"],
            required: true,
        },
        calories: { type: Number, default: 0 },
        protein: { type: Number, default: 0 },
        carbs: { type: Number, default: 0 },
        fat: { type: Number, default: 0 },
        ingredients: [{ type: String }],
        instructions: [{ type: String }],
        prepTimeMinutes: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export const Recipe = mongoose.model<IRecipe>("Recipe", RecipeSchema);
