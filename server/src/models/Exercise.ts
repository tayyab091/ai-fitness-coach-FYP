import mongoose, { Document, Schema } from "mongoose";

export interface IExercise extends Document {
    name: string;
    type: string;
    muscle: string;
    equipment: string;
    difficulty: string;
    instructions: string;
}

const ExerciseSchema: Schema = new Schema({
    name: { type: String, required: true },
    type: { type: String },
    muscle: { type: String },
    equipment: { type: String },
    difficulty: { type: String },
    instructions: { type: String },
}, {
    timestamps: true
});

export const Exercise = mongoose.model<IExercise>("Exercise", ExerciseSchema);
