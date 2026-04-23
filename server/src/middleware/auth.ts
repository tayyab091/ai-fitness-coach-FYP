import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    userId?: string;
    userRole?: string;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
    const token = req.cookies?.token;

    if (!token) {
        res.status(401).json({ message: "Unauthorized: no token provided" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as {
            userId: string;
            role: string;
        };
        req.userId = decoded.userId;
        req.userRole = decoded.role;
        next();
    } catch {
        res.status(401).json({ message: "Unauthorized: invalid token" });
    }
}
