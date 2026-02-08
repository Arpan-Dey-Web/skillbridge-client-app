"use client";

import { cn } from "@/lib/utils";
import { Menu, LogOut } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const { data: session } = authClient.useSession();

  // The menu is now clean and static.
  // It points to /dashboard, which is your proxy route.
  const menu = useMemo(
    () => [
      { title: "Home", url: "/" },
      { title: "Tutors", url: "/tutors" },
      { title: "About", url: "/about" },
      { title: "Dashboard", url: "/dashboard" },
    ],
    [],
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        isScrolled ? "pt-4" : "pt-0",
        className,
      )}
    >
      <nav
        className={cn(
          "mx-auto transition-all duration-500 ease-in-out flex items-center justify-between",
          isScrolled
            ? "max-w-5xl rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl px-6 py-2"
            : "w-full max-w-7xl border-b border-white/5 bg-transparent px-8 py-5",
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 shrink-0 group">
          <div className="relative rounded-lg flex items-center justify-center overflow-hidden transition-transform group-hover:scale-110 ">
            <Image
              src="https://res.cloudinary.com/dioe6nj4y/image/upload/v1770392888/leader_jhzssx.png"
              height={30}
              width={30}
              className="invert"
              alt="Learn Hub"
            />
          </div>
          <span className="font-black text-xl tracking-tighter text-white">
            Learn<span className="shimmer-gold">Hub</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {menu.map((item) => {
            // FIX: Handle active state for nested dashboard routes
            // Dashboard is active if we are on /dashboard OR any role-based subroute
            const isActive =
              pathname === item.url ||
              (item.url === "/dashboard" &&
                (pathname.startsWith("/admin") ||
                  pathname.startsWith("/student") ||
                  pathname.startsWith("/tutor")));

            return (
              <Link
                key={item.title}
                href={item.url}
                className={cn(
                  "px-4 py-2 text-sm font-bold transition-all rounded-full",
                  isActive
                    ? "text-amber-500 bg-amber-500/10"
                    : "text-slate-400 hover:text-white hover:bg-white/5",
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {session?.user ? (
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 border border-white/10 ring-2 ring-transparent hover:ring-amber-500/50 transition-all">
                <AvatarImage src={session.user.image || ""} />
                <AvatarFallback className="bg-amber-500/20 text-amber-500 text-xs font-bold">
                  {session.user.name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => authClient.signOut()}
                className="text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-full h-9 transition-colors"
              >
                <LogOut className="size-4 mr-2" />
                <span className="hidden lg:inline">Log Out</span>
              </Button>
            </div>
          ) : (
            <Button
              asChild
              className="bg-amber-500 hover:bg-amber-600 text-black font-black rounded-full px-6 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all active:scale-95"
            >
              <Link href="/login">Get Started</Link>
            </Button>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/5 rounded-full"
                >
                  <Menu className="size-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-[#020617] border-white/10 text-white p-8"
              >
                <div className="flex flex-col gap-8 mt-12">
                  {menu.map((item) => {
                    const isActive =
                      pathname === item.url ||
                      (item.url === "/dashboard" &&
                        (pathname.startsWith("/admin") ||
                          pathname.startsWith("/student") ||
                          pathname.startsWith("/tutor")));

                    return (
                      <Link
                        key={item.title}
                        href={item.url}
                        className={cn(
                          "text-3xl font-black tracking-tighter transition-all",
                          isActive
                            ? "text-amber-500"
                            : "text-white/40 hover:text-white",
                        )}
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
};

export { Navbar };
