import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export type AppRole = "admin" | "trainer" | "user";

export interface IUser extends Document {
    email: string;
    password: string;
    fullName: string;
    role: AppRole;
    avatarUrl?: string;
    createdAt: Date;
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
