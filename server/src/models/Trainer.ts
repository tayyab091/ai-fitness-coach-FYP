import mongoose, { Document, Schema } from "mongoose";

export interface ITrainer extends Document {
    name: string;
    country: string;
    specialty: string[];
    avatarUrl: string;
    backgroundImageUrl: string;
    peopleTrained: number;
    trainingVideos: number;
    rating: number;
    isFeatured: boolean;
    bio?: string;
}

const TrainerSchema = new Schema<ITrainer>(
    {
        name: { type: String, required: true },
        country: { type: String, required: true },
        specialty: [{ type: String }],
        avatarUrl: { type: String, default: "" },
        backgroundImageUrl: { type: String, default: "" },
        peopleTrained: { type: Number, default: 0 },
        trainingVideos: { type: Number, default: 0 },
        rating: { type: Number, default: 0, min: 0, max: 5 },
        isFeatured: { type: Boolean, default: false },
        bio: { type: String, default: "" },
    },
    { timestamps: true }
);

export const Trainer = mongoose.model<ITrainer>("Trainer", TrainerSchema);
