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
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

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
    register: {
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
    register: { title: "Register", url: "/register" },
  },
  className,
}: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const { data: session, isPending, error } = authClient.useSession();
  console.log(session?.user, isPending, error);

  // Monitor scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = async () => {
    await authClient.signOut();
  };
  return (
    // 1. Sticky Wrapper: Keeps navbar at top during scroll
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out",
        isScrolled ? "pt-4" : "pt-0", // Add spacing when scrolled
        className,
      )}
    >
      <nav
        className={cn(
          "mx-auto transition-all duration-300 ease-in-out border-b flex items-center justify-between",
          // Dynamic classes based on scroll state
          isScrolled
            ? "max-w-5xl rounded-2xl border bg-background/80 backdrop-blur-md shadow-lg px-6 py-3"
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
            <img src={logo.src} className="invert" alt={logo.alt} />
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
        <div className="hidden md:flex flex-1 justify-center">
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
          {session?.user ? (
            <div className="flex gap-2">
              <Avatar className="h-10 w-10 border-2 border-primary/10">
                <AvatarImage
                  src={session.user.image || ""}
                  alt={session.user.name || "User"}
                />
                <AvatarFallback className="bg-secondary/20 text-secondary-foreground">
                  {session.user.name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <Button
                onClick={() => handleLogOut()}
                className="bg-red-400 rounded-2xl"
              >
                Log Out{" "}
              </Button>
            </div>
          ) : (
            <>
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
                className="bg-primary hover:bg-primary/90 rounded-xl hidden sm:inline-flex"
              >
                <Link href={auth.register.url}>{auth.register.title}</Link>
              </Button>
            </>
          )}

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>

              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href={logo.url} className="flex items-center gap-2">
                      <img
                        src={logo.src}
                        className="max-h-8 dark:invert"
                        alt={logo.alt}
                      />
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    <Button asChild variant="outline">
                      <Link href={auth.login.url}>{auth.login.title}</Link>
                    </Button>

                    <Button asChild>
                      <Link href={auth.register.url}>
                        {auth.register.title}
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  return (
    <Link key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </Link>
  );
};
export { Navbar };
