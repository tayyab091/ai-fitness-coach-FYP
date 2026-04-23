"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Loader2, CheckCircle2 } from "lucide-react";
import { usePaymentInputs } from 'react-payment-inputs';

const PLANS = {
    basic: { name: "Basic", price: "$0/mo" },
    pro: { name: "Pro", price: "$19/mo" },
    elite: { name: "Elite", price: "$39/mo" },
};

function PaymentForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const planId = (searchParams.get("plan") as keyof typeof PLANS) || "pro";
    const plan = PLANS[planId] || PLANS.pro;

    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } = usePaymentInputs();

    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");

    const validateName = (val: string) => {
        if (!val) return "Name is required";
        if (!/^[a-zA-Z\s]+$/.test(val)) return "Name must contain only letters";
        return "";
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        setNameError(validateName(e.target.value));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const nErr = validateName(name);
        if (nErr) {
            setNameError(nErr);
            return;
        }

        if (meta.error) {
            return; // react-payment-inputs meta handles card errors
        }

        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            setTimeout(() => {
                router.push("/");
            }, 2000);
        }, 2000);
    };

    if (isSuccess) {
        return (
            <Card className="text-center p-8">
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-2xl mb-2">Payment Successful!</CardTitle>
                <CardDescription>You are now subscribed to the {plan.name} plan. Redirecting...</CardDescription>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" /> Payment Details
                </CardTitle>
                <CardDescription>Complete your subscription for the {plan.name} plan.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="bg-primary/5 p-4 rounded-lg flex justify-between items-center mb-6 border border-primary/20">
                        <span className="font-medium">Plan Summary:</span>
                        <span className="text-xl font-bold text-primary">{plan.name} - {plan.price}</span>
                    </div>

                    <div className="space-y-1">
                        <Label>Cardholder Name</Label>
                        <Input placeholder="John Doe" value={name} onChange={handleNameChange} />
                        {nameError && <p className="text-xs text-red-500">{nameError}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label>Card Number</Label>
                        <Input {...getCardNumberProps()} className={meta.erroredInputs.cardNumber ? "border-red-500" : ""} />
                        {meta.isTouched && meta.erroredInputs.cardNumber && <p className="text-xs text-red-500">{meta.erroredInputs.cardNumber}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label>Expiry Date</Label>
                            <Input {...getExpiryDateProps()} className={meta.erroredInputs.expiryDate ? "border-red-500" : ""} />
                            {meta.isTouched && meta.erroredInputs.expiryDate && <p className="text-xs text-red-500">{meta.erroredInputs.expiryDate}</p>}
                        </div>
                        <div className="space-y-1">
                            <Label>CVC</Label>
                            <Input {...getCVCProps()} className={meta.erroredInputs.cvc ? "border-red-500" : ""} />
                            {meta.isTouched && meta.erroredInputs.cvc && <p className="text-xs text-red-500">{meta.erroredInputs.cvc}</p>}
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full" disabled={isProcessing}>
                        {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isProcessing ? "Processing..." : `Pay ${plan.price}`}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}

export default function PaymentPage() {
    const router = useRouter();
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-background p-4">
            <div className="w-full max-w-md">
                <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-muted-foreground mb-6 hover:text-foreground transition-colors">
                    <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <Suspense fallback={<Card className="p-8 text-center"><Loader2 className="animate-spin h-8 w-8 mx-auto text-primary" /></Card>}>
                    <PaymentForm />
                </Suspense>
            </div>
        </div>
    );
}
