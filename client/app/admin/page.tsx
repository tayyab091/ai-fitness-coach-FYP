"use client";

import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Users, Activity, DollarSign, TrendingUp, Dumbbell, LayoutDashboard, Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface Exercise {
    _id: string;
    name: string;
    type: string;
    muscle: string;
    equipment: string;
    difficulty: string;
    instructions: string;
}

const stats = [
    { label: "Total Users", value: "1,284", icon: Users, color: "text-blue-600 bg-blue-100" },
    { label: "Active Sessions", value: "48", icon: Activity, color: "text-green-600 bg-green-100" },
    { label: "Revenue (MTD)", value: "$12,450", icon: DollarSign, color: "text-amber-600 bg-amber-100" },
    { label: "Growth", value: "+12%", icon: TrendingUp, color: "text-purple-600 bg-purple-100" },
];

export default function AdminDashboardPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"dashboard" | "exercises">("dashboard");

    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        type: "",
        muscle: "",
        equipment: "",
        difficulty: "",
        instructions: ""
    });

    useEffect(() => {
        if (!authLoading) {
            if (!user) {
                router.push("/login");
            } else if (user.role !== "admin") {
                toast.error("Access Denied", { description: "You must be an admin to view this page." });
                router.push("/");
            }
        }
    }, [user, authLoading, router]);

    const fetchExercises = async () => {
        setLoading(true);
        try {
            const API = process.env.NEXT_PUBLIC_API_URL || "";
            const res = await fetch(`${API}/api/exercises`, {
                credentials: "include"
            });
            if (res.ok) {
                const data = await res.json();
                setExercises(data);
            }
        } catch (err) {
            console.error("Failed to load exercises");
        }
        setLoading(false);
    };

    useEffect(() => {
        if (activeTab === "exercises") {
            fetchExercises();
        }
    }, [activeTab]);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const API = process.env.NEXT_PUBLIC_API_URL || "";
        const url = isEditing ? `${API}/api/exercises/${isEditing}` : `${API}/api/exercises`;
        const method = isEditing ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                credentials: "include"
            });
            const data = await res.json();
            if (res.ok) {
                toast.success(isEditing ? "Exercise updated!" : "Exercise created!");
                setIsEditing(null);
                setIsCreating(false);
                setFormData({ name: "", type: "", muscle: "", equipment: "", difficulty: "", instructions: "" });
                fetchExercises();
            } else {
                toast.error("Error saving exercise", { description: data.message });
            }
        } catch (err) {
            toast.error("Network error");
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this exercise?")) return;
        
        const API = process.env.NEXT_PUBLIC_API_URL || "";
        try {
            const res = await fetch(`${API}/api/exercises/${id}`, {
                method: "DELETE",
                credentials: "include"
            });
            if (res.ok) {
                toast.success("Exercise deleted!");
                fetchExercises();
            } else {
                toast.error("Failed to delete");
            }
        } catch (err) {
            toast.error("Network error");
        }
    };

    const startEdit = (ex: Exercise) => {
        setIsCreating(false);
        setIsEditing(ex._id);
        setFormData({
            name: ex.name,
            type: ex.type,
            muscle: ex.muscle,
            equipment: ex.equipment,
            difficulty: ex.difficulty,
            instructions: ex.instructions
        });
    };

    if (authLoading || (user && user.role !== "admin")) {
        return <MainLayout title="Admin Dashboard"><div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div></MainLayout>;
    }

    return (
        <MainLayout title="Admin Dashboard">
            <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
                {/* Sidebar */}
                <div className="w-full md:w-64 border-r bg-card p-4 space-y-2">
                    <Button 
                        variant={activeTab === "dashboard" ? "secondary" : "ghost"} 
                        className="w-full justify-start"
                        onClick={() => setActiveTab("dashboard")}
                    >
                        <LayoutDashboard className="mr-2 h-4 w-4" /> Overview
                    </Button>
                    <Button 
                        variant={activeTab === "exercises" ? "secondary" : "ghost"} 
                        className="w-full justify-start"
                        onClick={() => setActiveTab("exercises")}
                    >
                        <Dumbbell className="mr-2 h-4 w-4" /> Manage Exercises
                    </Button>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-4 lg:p-6 overflow-auto">
                    {activeTab === "dashboard" && (
                        <div className="space-y-6 animate-in fade-in">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {stats.map((stat) => (
                                    <div key={stat.label} className="bg-card border rounded-xl p-4">
                                        <div className={`rounded-lg p-2 w-fit ${stat.color} mb-3`}>
                                            <stat.icon className="h-5 w-5" />
                                        </div>
                                        <p className="text-2xl font-bold">{stat.value}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-card border rounded-xl p-6">
                                <h2 className="font-semibold mb-4">Recent Activity</h2>
                                <p className="text-sm text-muted-foreground">No recent activity to display.</p>
                            </div>
                        </div>
                    )}

                    {activeTab === "exercises" && (
                        <div className="space-y-4 animate-in fade-in">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">Exercises</h2>
                                {!isCreating && !isEditing && (
                                    <Button onClick={() => {
                                        setIsCreating(true);
                                        setFormData({ name: "", type: "", muscle: "", equipment: "", difficulty: "", instructions: "" });
                                    }}>
                                        <Plus className="mr-2 h-4 w-4" /> Add Exercise
                                    </Button>
                                )}
                            </div>

                            {(isCreating || isEditing) ? (
                                <Card className="p-6">
                                    <h3 className="text-lg font-bold mb-4">{isEditing ? "Edit Exercise" : "Create New Exercise"}</h3>
                                    <form onSubmit={handleFormSubmit} className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Name</Label>
                                                <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Type</Label>
                                                <Input required value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Muscle</Label>
                                                <Input required value={formData.muscle} onChange={e => setFormData({...formData, muscle: e.target.value})} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Equipment</Label>
                                                <Input required value={formData.equipment} onChange={e => setFormData({...formData, equipment: e.target.value})} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Difficulty</Label>
                                                <Input required value={formData.difficulty} onChange={e => setFormData({...formData, difficulty: e.target.value})} />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Instructions</Label>
                                            <textarea 
                                                required
                                                className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                value={formData.instructions} 
                                                onChange={e => setFormData({...formData, instructions: e.target.value})} 
                                            />
                                        </div>
                                        <div className="flex gap-2 justify-end mt-4">
                                            <Button type="button" variant="outline" onClick={() => { setIsCreating(false); setIsEditing(null); }}>Cancel</Button>
                                            <Button type="submit" disabled={loading}>{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>} Save</Button>
                                        </div>
                                    </form>
                                </Card>
                            ) : (
                                <div className="border rounded-lg overflow-hidden bg-card">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-muted/50 text-muted-foreground">
                                            <tr>
                                                <th className="px-4 py-3 font-medium">Name</th>
                                                <th className="px-4 py-3 font-medium">Muscle</th>
                                                <th className="px-4 py-3 font-medium">Difficulty</th>
                                                <th className="px-4 py-3 font-medium text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {loading && exercises.length === 0 ? (
                                                <tr><td colSpan={4} className="p-4 text-center"><Loader2 className="animate-spin mx-auto" /></td></tr>
                                            ) : exercises.length === 0 ? (
                                                <tr><td colSpan={4} className="p-4 text-center text-muted-foreground">No exercises found.</td></tr>
                                            ) : exercises.map(ex => (
                                                <tr key={ex._id} className="hover:bg-muted/30">
                                                    <td className="px-4 py-3 font-medium">{ex.name}</td>
                                                    <td className="px-4 py-3 capitalize">{ex.muscle}</td>
                                                    <td className="px-4 py-3">
                                                        <span className={`px-2 py-1 rounded-full text-xs ${ex.difficulty === 'beginner' ? 'bg-green-100 text-green-700' : ex.difficulty === 'intermediate' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                                                            {ex.difficulty}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-right">
                                                        <Button variant="ghost" size="icon" onClick={() => startEdit(ex)}>
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(ex._id)}>
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
