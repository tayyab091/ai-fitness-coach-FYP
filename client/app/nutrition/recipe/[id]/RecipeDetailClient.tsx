"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Clock, Flame } from "lucide-react";

const mockRecipes: Record<string, {
    id: string; title: string; imageUrl: string; mealType: string;
    calories: number; protein: number; carbs: number; fat: number;
    prepTimeMinutes: number; ingredients: string[]; instructions: string[];
}> = {
    "1": {
        id: "1", title: "Spinach & Feta Omelette",
        imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800",
        mealType: "Breakfast", calories: 320, protein: 24, carbs: 6, fat: 22, prepTimeMinutes: 10,
        ingredients: ["3 eggs", "50g feta cheese", "handful fresh spinach", "1 tbsp olive oil", "salt & pepper"],
        instructions: ["Whisk eggs with salt and pepper.", "Heat olive oil in a non-stick pan.", "Add spinach and wilt for 1 min.", "Pour eggs over spinach.", "Add feta and fold omelette in half.", "Cook 2 more minutes and serve."]
    },
    "2": {
        id: "2", title: "Green Salad with Boiled Egg",
        imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
        mealType: "Lunch", calories: 220, protein: 14, carbs: 12, fat: 12, prepTimeMinutes: 15,
        ingredients: ["2 eggs", "mixed greens", "cucumber", "cherry tomatoes", "olive oil", "lemon juice"],
        instructions: ["Boil eggs for 8 minutes.", "Wash and dry greens.", "Slice cucumber and halve tomatoes.", "Peel and halve eggs.", "Dress with olive oil and lemon.", "Season and serve."]
    },
    "3": {
        id: "3", title: "Nuts & Berries Mix",
        imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800",
        mealType: "Snack", calories: 180, protein: 5, carbs: 18, fat: 11, prepTimeMinutes: 2,
        ingredients: ["30g mixed nuts (almonds, walnuts, cashews)", "50g mixed berries (blueberries, raspberries)", "1 tsp honey (optional)"],
        instructions: ["Combine nuts and berries in a small bowl.", "Drizzle with honey if desired.", "Enjoy immediately or store in an airtight container."]
    },
    "4": {
        id: "4", title: "Zucchini Pasta with Basil Pesto",
        imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800",
        mealType: "Dinner", calories: 390, protein: 12, carbs: 35, fat: 24, prepTimeMinutes: 25,
        ingredients: ["2 medium zucchini", "3 tbsp basil pesto", "1 clove garlic", "2 tbsp pine nuts", "parmesan to serve", "salt & pepper"],
        instructions: ["Spiralize or julienne the zucchini into noodles.", "Toast pine nuts in a dry pan until golden.", "Sauté garlic in olive oil for 1 minute.", "Add zucchini noodles and toss for 2-3 minutes.", "Remove from heat, stir in pesto.", "Serve topped with pine nuts and parmesan."]
    },
};

export function RecipeDetailClient({ id }: { id: string }) {
    const recipe = mockRecipes[id] ?? mockRecipes["1"];

    return (
        <MainLayout title={recipe.title} showBack>
            <div className="max-w-2xl mx-auto p-4 lg:p-6 space-y-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-64 object-cover rounded-2xl" />

                <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                        <h1 className="text-2xl font-bold">{recipe.title}</h1>
                        <Badge variant="outline" className="mt-1">{recipe.mealType}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{recipe.prepTimeMinutes} min</span>
                        <span className="flex items-center gap-1"><Flame className="h-4 w-4 text-orange-500" />{recipe.calories} kcal</span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                    {[["Protein", recipe.protein, "g", "text-blue-600"], ["Carbs", recipe.carbs, "g", "text-amber-600"], ["Fat", recipe.fat, "g", "text-green-600"]].map(([label, val, unit, color]) => (
                        <div key={String(label)} className="bg-card border rounded-xl p-3">
                            <p className={`text-xl font-bold ${color}`}>{val}{unit}</p>
                            <p className="text-xs text-muted-foreground">{label}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-card border rounded-xl p-4 space-y-2">
                    <h2 className="font-semibold">Ingredients</h2>
                    <ul className="space-y-1">{recipe.ingredients.map((ing, idx) => <li key={idx} className="text-sm flex items-start gap-2"><span className="text-primary mt-1">•</span>{ing}</li>)}</ul>
                </div>

                <div className="bg-card border rounded-xl p-4 space-y-2">
                    <h2 className="font-semibold">Instructions</h2>
                    <ol className="space-y-2">{recipe.instructions.map((step, idx) => <li key={idx} className="text-sm flex items-start gap-3"><span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs shrink-0 mt-0.5">{idx + 1}</span>{step}</li>)}</ol>
                </div>
            </div>
        </MainLayout>
    );
}
