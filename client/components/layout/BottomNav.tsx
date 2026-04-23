"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Dumbbell, UtensilsCrossed, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Dumbbell, label: "Coaching", path: "/coaching" },
    { icon: UtensilsCrossed, label: "Nutrition", path: "/nutrition" },
    { icon: Settings, label: "Settings", path: "/settings" },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background lg:hidden">
            <div className="flex h-16 items-center justify-around">
                {navItems.map((item) => {
                    const isActive =
                        pathname === item.path ||
                        (item.path !== "/" && pathname.startsWith(item.path));
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={cn(
                                "flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors",
                                isActive
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <item.icon className={cn("h-6 w-6", isActive && "fill-primary/20")} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
