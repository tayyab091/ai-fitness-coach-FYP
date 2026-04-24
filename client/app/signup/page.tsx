"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/Logo";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function SignupPage() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { signUp } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await signUp(email, password, fullName);
        } catch {
            // Error handled inside signUp via toast
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-primary/5 via-background to-background p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="mb-12 text-center">
                    <div className="mb-6">
                        <Logo />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Create Account</h1>
                    <p className="mt-2 text-muted-foreground">Join T.E.S.T. and start your fitness journey</p>
                </div>

                <Card className="border border-border/50">
                    <CardHeader className="space-y-2">
                        <CardTitle>Sign Up</CardTitle>
                        <CardDescription>Create a new account to get started</CardDescription>
                    </CardHeader>

                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-5">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="space-y-2"
                            >
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    type="text"
                                    placeholder="John Doe"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="space-y-2"
                            >
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="space-y-2"
                            >
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                                <p className="text-xs text-muted-foreground">Minimum 6 characters</p>
                            </motion.div>
                        </CardContent>

                        <CardFooter className="flex flex-col gap-5">
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Create Account
                            </Button>

                            <div className="text-center text-sm">
                                <p className="text-muted-foreground">
                                    Already have an account?{" "}
                                    <Link href="/login" className="text-primary hover:underline font-semibold">
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </motion.div>
        </div>
    );
}
