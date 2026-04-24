import mongoose, { Document, Schema } from "mongoose";

// FYP - Database Enhancement: Recipe model with admin tracking
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
    isActive?: boolean;
    createdBy?: mongoose.Schema.Types.ObjectId;
    updatedBy?: mongoose.Schema.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const RecipeSchema = new Schema<IRecipe>(
    {
        title: { 
            type: String, 
            required: true,
            trim: true,
        },
        imageUrl: { 
            type: String, 
            default: "" 
        },
        mealType: {
            type: String,
            enum: ["Breakfast", "Lunch", "Dinner", "Snack"],
            required: true,
        },
        calories: { 
            type: Number, 
            default: 0,
            min: 0,
        },
        protein: { 
            type: Number, 
            default: 0,
            min: 0,
        },
        carbs: { 
            type: Number, 
            default: 0,
            min: 0,
        },
        fat: { 
            type: Number, 
            default: 0,
            min: 0,
        },
        ingredients: [{ 
            type: String,
            trim: true,
        }],
        instructions: [{ 
            type: String,
            trim: true,
        }],
        prepTimeMinutes: { 
            type: Number, 
            default: 0,
            min: 0,
        },
        // FYP - Database Enhancement: Tracking for recipe management
        isActive: {
            type: Boolean,
            default: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        updatedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
    { timestamps: true }
);

export const Recipe = mongoose.model<IRecipe>("Recipe", RecipeSchema);
