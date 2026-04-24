import mongoose, { Document, Schema } from "mongoose";

// FYP - Database Enhancement: Trainer model linked to User accounts
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
    userId?: mongoose.Schema.Types.ObjectId;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const TrainerSchema = new Schema<ITrainer>(
    {
        name: { 
            type: String, 
            required: true,
            trim: true,
        },
        country: { 
            type: String, 
            required: true,
            trim: true,
        },
        specialty: [{ 
            type: String,
            trim: true,
        }],
        avatarUrl: { 
            type: String, 
            default: "" 
        },
        backgroundImageUrl: { 
            type: String, 
            default: "" 
        },
        peopleTrained: { 
            type: Number, 
            default: 0,
            min: 0,
        },
        trainingVideos: { 
            type: Number, 
            default: 0,
            min: 0,
        },
        rating: { 
            type: Number, 
            default: 0, 
            min: 0, 
            max: 5 
        },
        isFeatured: { 
            type: Boolean, 
            default: false 
        },
        bio: { 
            type: String, 
            default: "" 
        },
        // FYP - Database Enhancement: Link trainer to user account
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export const Trainer = mongoose.model<ITrainer>("Trainer", TrainerSchema);
