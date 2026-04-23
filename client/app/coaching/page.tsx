"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { TrainerAvatar } from "@/components/coaching/TrainerAvatar";
import { FeaturedTrainerCard } from "@/components/coaching/FeaturedTrainerCard";
import { WorkoutCard } from "@/components/coaching/WorkoutCard";

const mockTrainers = [
    { 
        id: "1", name: "Jackson Pollock", country: "USA", specialty: ["HIIT", "Cardio"], 
        bio: "Former Olympic sprinter turned fitness coach. I specialize in high-intensity interval training to maximize fat burn and build explosive power.",
        avatarUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200", backgroundImageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600", 
        peopleTrained: 122, trainingVideos: 305, rating: 4.7,
        workouts: [
            { id: "1-1", title: "Sprint Intervals", bodyFocus: "Legs", difficulty: "High", durationMinutes: 30, imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c149a?w=400", rating: 4.89 },
            { id: "1-2", title: "Fat Burn HIIT", bodyFocus: "Full Body", difficulty: "Medium", durationMinutes: 45, imageUrl: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400", rating: 4.75 },
        ]
    },
    { 
        id: "2", name: "Edgar Davis", country: "USA", specialty: ["Strength", "Bodybuilding"], 
        bio: "If you want to build muscle and increase your raw strength, I'm your guy. Let's lift heavy and eat right.",
        avatarUrl: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200", backgroundImageUrl: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600", 
        peopleTrained: 89, trainingVideos: 156, rating: 4.8,
        workouts: [
            { id: "2-1", title: "Heavy Deadlifts", bodyFocus: "Back", difficulty: "High", durationMinutes: 60, imageUrl: "https://images.unsplash.com/photo-1517438322307-e67f039a5850?w=400", rating: 4.95 },
            { id: "2-2", title: "Chest Day", bodyFocus: "Chest", difficulty: "Medium", durationMinutes: 50, imageUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400", rating: 4.80 },
            { id: "2-3", title: "Arm Blaster", bodyFocus: "Arms", difficulty: "Low", durationMinutes: 30, imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400", rating: 4.85 },
        ]
    },
    { 
        id: "3", name: "Auguste Robinson", country: "UK", specialty: ["Yoga", "Mobility"], 
        bio: "Find your center and improve your flexibility with my daily yoga and mobility routines.",
        avatarUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200", backgroundImageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600", 
        peopleTrained: 210, trainingVideos: 89, rating: 4.9,
        workouts: [
            { id: "3-1", title: "Morning Flow", bodyFocus: "Full Body", difficulty: "Low", durationMinutes: 20, imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400", rating: 4.99 },
            { id: "3-2", title: "Deep Stretch", bodyFocus: "Legs", difficulty: "Low", durationMinutes: 35, imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400", rating: 4.90 },
        ]
    },
    { 
        id: "4", name: "Paul Carter", country: "Australia", specialty: ["Boxing", "Agility"], 
        bio: "Step into the ring. My boxing conditioning workouts will get you lean, mean, and fast.",
        avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200", backgroundImageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600", 
        peopleTrained: 156, trainingVideos: 78, rating: 4.6,
        workouts: [
            { id: "4-1", title: "Boxing Fundamentals", bodyFocus: "Upper Body", difficulty: "Medium", durationMinutes: 45, imageUrl: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400", rating: 4.60 },
            { id: "4-2", title: "Sparring Session", bodyFocus: "Full Body", difficulty: "High", durationMinutes: 60, imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400", rating: 4.88 },
        ]
    },
    { 
        id: "5", name: "Georges Smith", country: "France", specialty: ["CrossFit", "HIIT"], 
        bio: "Push your limits. My CrossFit-style WODs are designed to break you down and build you up.",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200", backgroundImageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600", 
        peopleTrained: 178, trainingVideos: 92, rating: 4.7,
        workouts: [
            { id: "5-1", title: "Metcon Madness", bodyFocus: "Full Body", difficulty: "High", durationMinutes: 25, imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c149a?w=400", rating: 4.75 },
        ]
    },
];

export default function CoachingPage() {
    const [selectedTrainer, setSelectedTrainer] = useState(mockTrainers[0]);

    return (
        <MainLayout title="Coaching">
            <div className="p-4 lg:p-6">
                <section className="mb-8">
                    <h2 className="text-lg font-semibold mb-4">Top Trainers</h2>
                    <div className="flex gap-6 overflow-x-auto pb-4">
                        {mockTrainers.map((trainer) => (
                            <TrainerAvatar
                                key={trainer.id}
                                trainer={trainer}
                                isSelected={selectedTrainer.id === trainer.id}
                                onClick={() => setSelectedTrainer(trainer)}
                            />
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                        <FeaturedTrainerCard trainer={selectedTrainer} />
                    </div>
                    <div className="lg:col-span-2">
                        <h3 className="text-lg font-semibold mb-4">{selectedTrainer.name}&apos;s Workouts</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {selectedTrainer.workouts.map((workout) => (
                                <WorkoutCard key={workout.id} workout={workout} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
