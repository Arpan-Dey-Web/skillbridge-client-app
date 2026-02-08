import { Navbar } from "@/components/layout/Navbar";
import React from "react";


/**
 * PublicLayout handles all non-dashboard pages.
 * It includes the global Navbar and provides a consistent
 * padding/spacing for public content.
 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#020617]">
      {/* The Navbar is fixed (from your previous code), 
        so we don't need a spacer here if your Navbar 
        already handles transparency/blur. 
      */}
      <Navbar />

      <main className="flex-1">
        {/* Animation wrapper to make page transitions 
          feel smooth like your dashboard.
        */}
        <div className="animate-in fade-in duration-700">{children}</div>
      </main>

      {/* Optional: Add a Footer here if you have one */}
      <footer className="border-t border-white/5 py-8 text-center">
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} LearnHub. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
