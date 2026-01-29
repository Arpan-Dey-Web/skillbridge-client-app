"use client";

import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Accordion } from "../ui/accordion";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar = ({
  logo = {
    url: "/",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Skill Bridge",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "Tutors", url: "/tutors" },
    { title: "About", url: "/" },
    { title: "Dashboard", url: "/" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Register", url: "/register" },
  },
  className,
}: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    // 1. Sticky Wrapper: Keeps navbar at top during scroll
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out",
        isScrolled ? "pt-4" : "pt-0",
        className,
      )}
    >
      <nav
        className={cn(
          "mx-auto transition-all duration-300 ease-in-out  flex items-center justify-between",
          // Dynamic classes based on scroll state
          isScrolled
            ? "max-w-5xl rounded-2xl  bg-background/80 backdrop-blur-md shadow-lg px-6 py-3"
            : "max-w-full border-transparent bg-background px-8 py-5",
        )}
      >
        {/* Left: Logo */}
        <Link href={logo.url} className="flex items-center gap-2 shrink-0">
          <div
            className={cn(
              "bg-primary rounded-lg p-1 transition-all",
              isScrolled ? "size-7" : "size-8",
            )}
          >
            <img src={logo.src}
              className="invert"
              alt={logo.alt} />
          </div>
          <span
            className={cn(
              "font-bold tracking-tight text-foreground transition-all",
              isScrolled ? "text-lg" : "text-xl",
            )}
          >
            {logo.title}
          </span>
        </Link>

        {/* Center: Links (Hidden on mobile) */}
        <div className="hidden lg:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {menu.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.url}
                      className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors"
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right: Auth Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <Link href={auth.login.url}>{auth.login.title}</Link>
          </Button>
          <Button
            asChild
            size={isScrolled ? "sm" : "default"}
            className="bg-primary hover:bg-primary/90 rounded-xl"
          >
            <Link href={auth.signup.url}>{auth.signup.title}</Link>
          </Button>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden">
            <Sheet>
              {/* ... Keep your existing SheetTrigger and Content */}
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
};


export { Navbar };
