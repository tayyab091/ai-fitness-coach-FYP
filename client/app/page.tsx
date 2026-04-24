"use client";

import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { FeaturedTrainerCard } from "@/components/coaching/FeaturedTrainerCard";
import { MealCard } from "@/components/nutrition/MealCard";
import { useAuth } from "@/hooks/useAuth";
import { Dumbbell, UtensilsCrossed, Users, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const featuredTrainer = {
  id: "1",
  name: "Jackson Pollock",
  country: "USA",
  avatarUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200",
  backgroundImageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600",
  peopleTrained: 122,
  trainingVideos: 305,
  rating: 4.7,
};

const todaysMeals = [
  { id: "1", title: "Spinach & Feta Omelette", imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400" },
  { id: "2", title: "Green Salad with Boiled Egg", imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();

  // FYP - Plans Navigation: Premium button in quick actions routes to subscription page
  const quickActions = [
    { icon: Dumbbell, label: "Workouts", path: "/coaching", color: "bg-purple-100 text-purple-600" },
    { icon: UtensilsCrossed, label: "Nutrition", path: "/nutrition", color: "bg-green-100 text-green-600" },
    { icon: Users, label: "Community", path: "/community", color: "bg-blue-100 text-blue-600" },
    { icon: Star, label: "Premium", path: "/subscription", color: "bg-amber-100 text-amber-600" },
  ];

  return (
    <MainLayout title="Home">
      <motion.div 
        className="p-4 lg:p-6 space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="bg-linear-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl p-6 relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="relative z-10">
            <motion.h1 
              className="text-2xl font-bold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Welcome back{user?.fullName ? `, ${user.fullName.split(" ")[0]}` : ""}! 👋
            </motion.h1>
            <motion.p 
              className="mt-2 opacity-90"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Ready to Train, Eat, Sleep, and Thrive today?
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button variant="secondary" className="mt-4 hover:scale-105 transition-transform" onClick={() => router.push("/coaching")}>
                Start Workout
              </Button>
            </motion.div>
          </div>
          <motion.div 
            className="absolute right-0 bottom-0 opacity-10"
            animate={{ rotate: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          >
            <Dumbbell className="h-48 w-48" />
          </motion.div>
        </motion.div>

        <motion.section variants={itemVariants}>
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.path}
                onClick={() => router.push(action.path)}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border hover:shadow-md transition-all sm:hover:scale-105"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
                custom={index}
              >
                <div className={`p-3 rounded-full ${action.color}`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.section>

        <motion.section variants={itemVariants}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Featured Trainer</h2>
            <Button variant="link" className="text-primary hover:translate-x-1 transition-transform" onClick={() => router.push("/coaching")}>
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <motion.div 
            className="max-w-md"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FeaturedTrainerCard
              trainer={featuredTrainer}
              onClick={() => router.push(`/coaching/trainer/${featuredTrainer.id}`)}
            />
          </motion.div>
        </motion.section>

        <motion.section variants={itemVariants}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Today&apos;s Meals</h2>
            <Button variant="link" className="text-primary hover:translate-x-1 transition-transform" onClick={() => router.push("/nutrition")}>
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="bg-background rounded-lg border max-w-lg overflow-hidden">
            <motion.div whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }} transition={{ duration: 0.2 }}>
              <MealCard mealType="Breakfast" recipe={todaysMeals[0]} onClick={() => router.push(`/nutrition/recipe/${todaysMeals[0].id}`)} />
            </motion.div>
            <motion.div whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }} transition={{ duration: 0.2 }}>
              <MealCard mealType="Lunch" recipe={todaysMeals[1]} onClick={() => router.push(`/nutrition/recipe/${todaysMeals[1].id}`)} />
            </motion.div>
          </div>
        </motion.section>

        {!user && (
          <motion.div 
            variants={itemVariants}
            className="border-primary/20 bg-primary/5 rounded-xl p-6 text-center"
            whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
          >
            <h2 className="text-xl font-bold mb-2">Join T.E.S.T. Today</h2>
            <p className="text-muted-foreground mb-4">Get personalized workouts, meal plans, and connect with top trainers.</p>
            <div className="flex gap-3 justify-center">
              <Button className="hover:scale-105 transition-transform" onClick={() => router.push("/signup")}>Get Started</Button>
              <Button variant="outline" className="hover:scale-105 transition-transform" onClick={() => router.push("/login")}>Sign In</Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </MainLayout>
  );
}
