"use client";

import { useRouter } from "next/navigation";
import { Settings } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { MealCard } from "@/components/nutrition/MealCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const mockMealPlan = {
    breakfast: { id: "1", title: "Spinach & Feta Omelette", imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400" },
    lunch: { id: "2", title: "Green Salad with Boiled Egg", imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400" },
    snack: { id: "3", title: "Nuts & Berries", imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400" },
    dinner: { id: "4", title: "Zucchini Pasta with Basil Pesto", imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400" },
};

export default function NutritionPage() {
    const router = useRouter();
    return (
        <MainLayout title="Today's Meals" showBack>
            <div className="p-4 lg:p-6">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center gap-2 mb-6">
                        <Input placeholder="Search" className="bg-muted border-0 flex-1" />
                        <Button variant="ghost" size="icon" onClick={() => router.push("/nutrition/profile")}>
                            <Settings className="h-5 w-5" />
                        </Button>
                    </div>
                    <div className="bg-background rounded-lg border">
                        <MealCard mealType="Breakfast" recipe={mockMealPlan.breakfast} onClick={() => router.push(`/nutrition/recipe/${mockMealPlan.breakfast.id}`)} />
                        <MealCard mealType="Lunch" recipe={mockMealPlan.lunch} onClick={() => router.push(`/nutrition/recipe/${mockMealPlan.lunch.id}`)} />
                        <MealCard mealType="Snack" recipe={mockMealPlan.snack} onClick={() => router.push(`/nutrition/recipe/${mockMealPlan.snack.id}`)} />
                        <MealCard mealType="Dinner" recipe={mockMealPlan.dinner} onClick={() => router.push(`/nutrition/recipe/${mockMealPlan.dinner.id}`)} />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
