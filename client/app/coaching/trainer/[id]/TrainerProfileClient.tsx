"use client";

import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Users, Video } from "lucide-react";

const mockTrainerData: Record<string, {
    id: string; name: string; country: string; specialty: string[];
    avatarUrl: string; backgroundImageUrl: string; peopleTrained: number;
    trainingVideos: number; rating: number; bio: string;
}> = {
    "1": {
        id: "1", name: "Jackson Pollock", country: "USA",
        specialty: ["HIIT", "Strength", "Cardio"],
        avatarUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200",
        backgroundImageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
        peopleTrained: 122, trainingVideos: 305, rating: 4.7,
        bio: "Professional fitness coach with 10+ years of experience specialising in HIIT and strength training. Jackson's method focuses on progressive overload and smart recovery."
    },
    "2": {
        id: "2", name: "Edgar Davis", country: "USA",
        specialty: ["Strength", "Powerlifting", "Mobility"],
        avatarUrl: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200",
        backgroundImageUrl: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800",
        peopleTrained: 89, trainingVideos: 156, rating: 4.8,
        bio: "Edgar is a certified strength coach who has worked with professional athletes across the US. He specialises in powerlifting programming and functional mobility."
    },
    "3": {
        id: "3", name: "Auguste Robinson", country: "UK",
        specialty: ["Yoga", "Mindfulness", "Flexibility"],
        avatarUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200",
        backgroundImageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
        peopleTrained: 210, trainingVideos: 89, rating: 4.9,
        bio: "Auguste is a master yoga instructor with over 15 years of practice. She blends traditional yoga philosophy with modern wellness science for a holistic approach."
    },
    "4": {
        id: "4", name: "Paul Carter", country: "Australia",
        specialty: ["Boxing", "Cardio", "Agility"],
        avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200",
        backgroundImageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
        peopleTrained: 156, trainingVideos: 78, rating: 4.6,
        bio: "Former amateur boxing champion turned full-time fitness coach. Paul designs high-energy programmes that combine boxing technique with cardiovascular conditioning."
    },
    "5": {
        id: "5", name: "Georges Smith", country: "France",
        specialty: ["HIIT", "Crossfit", "Endurance"],
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
        backgroundImageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800",
        peopleTrained: 178, trainingVideos: 92, rating: 4.7,
        bio: "Georges is a certified CrossFit coach and endurance specialist. His programmes are designed to push your limits while building lasting athletic performance."
    },
};

export function TrainerProfileClient({ id }: { id: string }) {
    const router = useRouter();
    const trainer = mockTrainerData[id] ?? mockTrainerData["1"];

    return (
        <MainLayout title="Trainer Profile" showBack>
            <div className="max-w-2xl mx-auto p-4 lg:p-6 space-y-6">
                <div className="relative rounded-2xl overflow-hidden">
                    <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${trainer.backgroundImageUrl})` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white flex items-end gap-4">
                        <Avatar className="h-20 w-20 border-4 border-white">
                            <AvatarImage src={trainer.avatarUrl} />
                            <AvatarFallback>{trainer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-2xl font-bold">{trainer.name}</h1>
                            <div className="flex items-center gap-1 text-sm opacity-90"><MapPin className="h-4 w-4" />{trainer.country}</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-card border rounded-xl p-4">
                        <div className="flex justify-center mb-1"><Users className="h-5 w-5 text-primary" /></div>
                        <p className="text-2xl font-bold">{trainer.peopleTrained}</p>
                        <p className="text-xs text-muted-foreground">Trained</p>
                    </div>
                    <div className="bg-card border rounded-xl p-4">
                        <div className="flex justify-center mb-1"><Video className="h-5 w-5 text-primary" /></div>
                        <p className="text-2xl font-bold">{trainer.trainingVideos}</p>
                        <p className="text-xs text-muted-foreground">Videos</p>
                    </div>
                    <div className="bg-card border rounded-xl p-4">
                        <div className="flex justify-center mb-1"><Star className="h-5 w-5 text-amber-500" /></div>
                        <p className="text-2xl font-bold">{trainer.rating}</p>
                        <p className="text-xs text-muted-foreground">Rating</p>
                    </div>
                </div>

                <div className="bg-card border rounded-xl p-4 space-y-3">
                    <h2 className="font-semibold">About</h2>
                    <p className="text-sm text-muted-foreground">{trainer.bio}</p>
                    <div className="flex flex-wrap gap-2">
                        {trainer.specialty.map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}
                    </div>
                </div>

                <Button className="w-full" size="lg" onClick={() => router.push("/subscription")}>
                    Book a Session
                </Button>
            </div>
        </MainLayout>
    );
}
