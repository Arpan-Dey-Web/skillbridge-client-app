"use client";
import { cn } from "@/lib/utils";
import { Menu, LogOut, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../ui/sheet";

import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";

const Navbar = ({
  menu = [
    { title: "Home", url: "/" },
    { title: "Tutors", url: "/tutors" },
    { title: "About", url: "/about" },
    { title: "Dashboard", url: "/tutor/dashboard" },
  ],
  className,
}: any) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

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
              className=" invert "
              alt="Learn Hub"
            />
          </div>
          <span className="font-black text-xl tracking-tighter text-white">
            Learn<span className="text-amber-500">Hub</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {menu.map((item: any) => {
            const isActive = pathname === item.url;
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
              <Avatar className="h-9 w-9 border border-white/10">
                <AvatarImage src={session.user.image || ""} />
                <AvatarFallback className="bg-amber-500/20 text-amber-500 text-xs">
                  {session.user.name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => authClient.signOut()}
                className="text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-full h-9"
              >
                <LogOut className="size-4 mr-2" />
                <span className="hidden lg:inline">Log Out</span>
              </Button>
            </div>
          ) : (
            <Button
              asChild
              className="bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-full px-6"
            >
              <Link href="/login">Get Started</Link>
            </Button>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="size-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-black border-white/10 text-white"
              >
                <div className="flex flex-col gap-6 mt-10">
                  {menu.map((item: any) => (
                    <Link
                      key={item.title}
                      href={item.url}
                      className="text-2xl font-bold hover:text-amber-500"
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
