import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export type AppRole = "admin" | "trainer" | "user";
export type SubscriptionPlan = "basic" | "pro" | "elite" | null;

export interface IUser extends Document {
    email: string;
    password: string;
    fullName: string;
    role: AppRole;
    avatarUrl?: string;
    // FYP - Database Enhancement: Added for Admin & Subscription tracking
    subscription?: {
        plan: SubscriptionPlan;
        status: "active" | "inactive" | "cancelled";
        startDate?: Date;
        endDate?: Date;
        paymentId?: string;
    };
    lastLogin?: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        role: {
            type: String,
            enum: ["admin", "trainer", "user"],
            default: "user",
        },
        avatarUrl: {
            type: String,
            default: null,
        },
        // FYP - Database Enhancement: Subscription tracking for payment module
        subscription: {
            plan: {
                type: String,
                enum: ["basic", "pro", "elite", null],
                default: null,
            },
            status: {
                type: String,
                enum: ["active", "inactive", "cancelled"],
                default: "inactive",
            },
            startDate: {
                type: Date,
                default: null,
            },
            endDate: {
                type: Date,
                default: null,
            },
            paymentId: {
                type: String,
                default: null,
            },
        },
        // FYP - Database Enhancement: Admin tracking fields
        lastLogin: {
            type: Date,
            default: null,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidate: string): Promise<boolean> {
    return bcrypt.compare(candidate, this.password);
};

export const User = mongoose.model<IUser>("User", UserSchema);
