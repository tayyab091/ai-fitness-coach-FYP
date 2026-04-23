import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import { QueryProvider } from "@/components/QueryProvider";
import { Toaster } from "sonner";
import { WellnessChatbot } from "@/components/ai/WellnessChatbot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "T.E.S.T. - Train. Eat. Sleep. Thrive.",
  description: "Your personal fitness coaching and nutrition platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <AuthProvider>
            {children}
            <Toaster richColors position="top-right" />
            <WellnessChatbot />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
