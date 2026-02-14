"use client";

import { cn } from "@/lib/utils";
import { Menu, LogOut, Sun, Moon, Monitor } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { Roles } from "@/constants/roles";

const Navbar = ({ className }: { className?: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { data: session } = authClient.useSession();

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);

  const menu = useMemo(() => {
    const items = [
      { title: "Home", url: "/" },
      { title: "Tutors", url: "/tutors" },
      { title: "About", url: "/about" },
    ];

    if (session?.user) {
      let dashboardPath = "/dashboard";
      if (session.user.role === Roles.admin) dashboardPath = "/admin";
      if (session.user.role === Roles.tutor) dashboardPath = "/tutor/dashboard";
      items.push({ title: "Dashboard", url: dashboardPath });
    }
    return items;
  }, [session]);

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
            ? "max-w-5xl rounded-2xl border border-border bg-background/60 backdrop-blur-xl shadow-2xl px-6 py-2"
            : "w-full max-w-7xl border-b border-border/50 bg-transparent px-8 py-5",
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 shrink-0 group">
          <Image
            src="https://res.cloudinary.com/dioe6nj4y/image/upload/v1770392888/leader_jhzssx.png"
            height={30}
            width={30}
            className="dark:invert-0 invert" // Adjust logo visibility
            alt="Learn Hub"
          />
          <span className="font-black text-xl tracking-tighter text-foreground">
            Learn<span className="text-primary">Hub</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {menu.map((item) => {
            const isActive = pathname === item.url;
            return (
              <Link
                key={item.title}
                href={item.url}
                className={cn(
                  "px-4 py-2 text-sm font-bold transition-all rounded-full",
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent",
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Switcher */}
          {mounted && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 h-4 w-4" /> Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 h-4 w-4" /> Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Monitor className="mr-2 h-4 w-4" /> System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {session?.user ? (
            <div className="flex items-center gap-2">
              <Avatar className="h-9 w-9 border border-border">
                <AvatarImage src={session.user.image || ""} />
                <AvatarFallback className="bg-primary/20 text-primary uppercase">
                  {session.user.name?.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => authClient.signOut()}
                className="text-muted-foreground hover:text-destructive"
              >
                <LogOut className="size-4" />
              </Button>
            </div>
          ) : (
            <Button
              asChild
              className="bg-primary hover:opacity-90 text-primary-foreground font-bold rounded-full px-6"
            >
              <Link href="/login">Get Started</Link>
            </Button>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="size-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-background border-border"
              >
                <div className="flex flex-col gap-6 mt-10">
                  {menu.map((item) => (
                    <Link
                      key={item.title}
                      href={item.url}
                      className={cn(
                        "text-3xl font-black tracking-tighter transition-colors",
                        pathname === item.url
                          ? "text-primary"
                          : "text-muted-foreground",
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
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
