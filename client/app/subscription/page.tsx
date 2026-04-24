"use client";

import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Zap, Users, Clock, Star } from "lucide-react";
import { motion } from "framer-motion";

// FYP - Plans Navigation: Enhanced subscription page with beautiful cards and CTA
const plans = [
    { id: "basic", name: "Basic", price: "$0", period: "/mo", features: ["3 workouts/week", "Basic nutrition guides", "Community access"], highlighted: false },
    { id: "pro", name: "Pro", price: "$19", period: "/mo", features: ["Unlimited workouts", "Personalised meal plans", "1-on-1 trainer chat", "Advanced analytics"], highlighted: true },
    { id: "elite", name: "Elite", price: "$39", period: "/mo", features: ["Everything in Pro", "Live training sessions", "Priority support", "Custom meal plans"], highlighted: false },
];

const benefits = [
    { icon: Zap, title: "Instant Access", description: "Start your transformation immediately" },
    { icon: Users, title: "Expert Trainers", description: "Learn from certified professionals" },
    { icon: Clock, title: "Flexible Schedule", description: "Workouts that fit your lifestyle" },
    { icon: Star, title: "Premium Support", description: "24/7 help when you need it" },
];

export default function SubscriptionPage() {
    const router = useRouter();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <MainLayout title="Plans & Pricing">
            <motion.div 
                className="p-4 lg:p-8 max-w-6xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Hero Section */}
                <motion.div variants={itemVariants} className="text-center mb-12">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Crown className="h-8 w-8 text-amber-500" />
                        <Badge variant="secondary" className="bg-amber-100 text-amber-700">Premium Plans</Badge>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Invest in Yourself</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Choose the perfect plan to unlock personalized workouts, meal plans, and connect with expert trainers.
                    </p>
                </motion.div>

                {/* Benefits Section */}
                <motion.div variants={itemVariants} className="mb-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {benefits.map((benefit, idx) => (
                            <motion.div
                                key={idx}
                                className="bg-card border rounded-xl p-4 text-center hover:shadow-md transition-all"
                                whileHover={{ y: -5 }}
                            >
                                <div className="flex justify-center mb-3">
                                    <div className="p-3 rounded-full bg-primary/10">
                                        <benefit.icon className="h-5 w-5 text-primary" />
                                    </div>
                                </div>
                                <h3 className="font-semibold text-sm">{benefit.title}</h3>
                                <p className="text-xs text-muted-foreground mt-1">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Plan Cards */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {plans.map((plan) => (
                        <motion.div
                            key={plan.id}
                            className={`rounded-2xl border p-8 flex flex-col transition-all duration-300 relative group ${
                                plan.highlighted 
                                    ? "border-primary shadow-2xl bg-linear-to-br from-primary to-primary/90 text-primary-foreground ring-2 ring-primary/20 scale-100 md:scale-105" 
                                    : "bg-card hover:shadow-lg hover:border-primary/50"
                            }`}
                            whileHover={{ y: -10 }}
                        >
                            {plan.highlighted && (
                                <>
                                    <motion.div 
                                        className="absolute -top-3 left-1/2 -translate-x-1/2"
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ repeat: Infinity, duration: 3 }}
                                    >
                                        <Badge className="bg-amber-400 text-amber-900 font-bold">⭐ Most Popular</Badge>
                                    </motion.div>
                                </>
                            )}
                            
                            <h2 className="text-3xl font-bold mb-2">{plan.name}</h2>
                            <div className="mb-6">
                                <span className="text-5xl font-bold">{plan.price}</span>
                                <span className={plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}>{plan.period}</span>
                            </div>
                            
                            <ul className="space-y-3 flex-1 mb-8">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-center gap-3">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.1 }}
                                        >
                                            <Check className="h-5 w-5 shrink-0 text-green-500" />
                                        </motion.div>
                                        <span className="text-sm">{f}</span>
                                    </li>
                                ))}
                            </ul>
                            
                            <Button
                                className="w-full h-12 text-base font-semibold transition-all"
                                variant={plan.highlighted ? "secondary" : "default"}
                                onClick={() => router.push(`/subscription/payment?plan=${plan.id}`)}
                            >
                                {plan.id === "basic" ? "✓ Current Plan" : "Get Started Now"}
                            </Button>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Section */}
                <motion.div variants={itemVariants} className="bg-linear-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-bold mb-3">Start Your Fitness Journey Today</h3>
                    <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                        Join thousands of users who have transformed their lives with personalized workouts and nutrition plans.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button 
                            size="lg" 
                            onClick={() => router.push(`/subscription/payment?plan=pro`)}
                            className="hover:scale-105 transition-transform"
                        >
                            Upgrade to Pro
                        </Button>
                        <Button 
                            size="lg" 
                            variant="outline"
                            onClick={() => router.push("/help")}
                            className="hover:scale-105 transition-transform"
                        >
                            Learn More
                        </Button>
                    </div>
                </motion.div>

                {/* FAQ-like section */}
                <motion.div variants={itemVariants} className="mt-16 text-center">
                    <h3 className="text-2xl font-bold mb-8">Flexible & Transparent</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-4">
                            <p className="font-semibold text-primary mb-2">💳 Easy Upgrades</p>
                            <p className="text-sm text-muted-foreground">Switch plans anytime, no questions asked.</p>
                        </div>
                        <div className="p-4">
                            <p className="font-semibold text-primary mb-2">🔒 Secure Payments</p>
                            <p className="text-sm text-muted-foreground">Your data is encrypted and protected.</p>
                        </div>
                        <div className="p-4">
                            <p className="font-semibold text-primary mb-2">💬 24/7 Support</p>
                            <p className="text-sm text-muted-foreground">Our team is here to help you succeed.</p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </MainLayout>
    );
}
