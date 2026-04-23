"use client";

import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown } from "lucide-react";

const plans = [
    { id: "basic", name: "Basic", price: "$0", period: "/mo", features: ["3 workouts/week", "Basic nutrition guides", "Community access"], highlighted: false },
    { id: "pro", name: "Pro", price: "$19", period: "/mo", features: ["Unlimited workouts", "Personalised meal plans", "1-on-1 trainer chat", "Advanced analytics"], highlighted: true },
    { id: "elite", name: "Elite", price: "$39", period: "/mo", features: ["Everything in Pro", "Live training sessions", "Priority support", "Custom meal plans"], highlighted: false },
];

export default function SubscriptionPage() {
    const router = useRouter();
    return (
        <MainLayout title="Subscription">
            <div className="p-4 lg:p-6 max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <Crown className="h-10 w-10 text-amber-500 mx-auto mb-3" />
                    <h1 className="text-3xl font-bold">Choose Your Plan</h1>
                    <p className="text-muted-foreground mt-2">Unlock your full potential with the right plan.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`rounded-2xl border p-6 flex flex-col ${plan.highlighted ? "border-primary shadow-lg bg-primary text-primary-foreground" : "bg-card"}`}
                        >
                            {plan.highlighted && <Badge className="self-start mb-3 bg-primary-foreground text-primary">Most Popular</Badge>}
                            <h2 className="text-2xl font-bold">{plan.name}</h2>
                            <div className="mt-2 mb-6">
                                <span className="text-4xl font-bold">{plan.price}</span>
                                <span className={plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}>{plan.period}</span>
                            </div>
                            <ul className="space-y-2 flex-1">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-center gap-2 text-sm">
                                        <Check className="h-4 w-4 shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <Button
                                className="mt-6 w-full"
                                variant={plan.highlighted ? "secondary" : "default"}
                                onClick={() => router.push(`/subscription/payment?plan=${plan.id}`)}
                            >
                                {plan.id === "basic" ? "Current Plan" : "Get Started"}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
