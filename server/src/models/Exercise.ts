import mongoose, { Document, Schema } from "mongoose";

// FYP - Database Enhancement: Exercise model with admin tracking
export interface IExercise extends Document {
    name: string;
    type: string;
    muscle: string;
    equipment: string;
    difficulty: string;
    instructions: string;
    isActive?: boolean;
    createdBy?: mongoose.Schema.Types.ObjectId;
    updatedBy?: mongoose.Schema.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const ExerciseSchema: Schema = new Schema({
    name: { 
        type: String, 
        required: true,
        trim: true,
    },
    type: { 
        type: String,
        trim: true,
    },
    muscle: { 
        type: String,
        trim: true,
    },
    equipment: { 
        type: String,
        trim: true,
    },
    difficulty: { 
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
        default: "intermediate",
    },
    instructions: { 
        type: String,
        trim: true,
    },
    // FYP - Database Enhancement: Admin tracking for exercises
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
}, {
    timestamps: true
});

export const Exercise = mongoose.model<IExercise>("Exercise", ExerciseSchema);
