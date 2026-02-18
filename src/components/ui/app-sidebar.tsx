"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Home,
  LayoutDashboard,
  Users,
  CalendarCheck,
  Tags,
  BookOpenCheck,
  UserCircle,
  Settings2,
  GraduationCap,
  Wallet,
  Sparkles,
  LogOut,
  Sun,
  Moon,
  Clock,
  ClipboardList,
  Monitor,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "./sidebar";
import { Roles } from "@/constants/roles";
import { adminRoutes, studentRoutes, tutorRoutes } from "@/routes/Routes";
import { Route } from "@/types/routes.types";
import { authClient, getSessionFromConsole } from "@/lib/auth-client";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

const iconMap: Record<string, any> = {
  Home: Home,
  Dashboard: LayoutDashboard,
  "Student Dashboard": LayoutDashboard,
  "Tutor Dashboard": LayoutDashboard,
  Users: Users,
  Bookings: CalendarCheck,
  "My Bookings": BookOpenCheck,
  Categories: Tags,
  Profile: UserCircle,
  Settings: Settings2,
  Finance: Wallet,
  Availability: Clock,
  "Booking Request": ClipboardList,
};

export function AppSidebar({
  userInfo,
  ...props
}: {
  userInfo: { role: "ADMIN" | "TUTOR" | "STUDENT"; name: string };
} & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const { theme, setTheme } = useTheme();


  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  const userRole = userInfo.role as "ADMIN" | "TUTOR" | "STUDENT" | "";

  const routes = React.useMemo(() => {
    if (!userRole) return [];
    if (userRole === "ADMIN") return adminRoutes;
    if (userRole === "STUDENT") return studentRoutes;
    if (userRole === "TUTOR") return tutorRoutes;
  }, [userRole]);


  // 3. Handle the "Undefined" state visually
  if (!userRole) {
    return (
      <Sidebar className="border-r border-border bg-card" {...props}>
        <SidebarHeader className="p-6">
          {/* Keep your Logo/Header here so it doesn't flicker */}
          <div className="animate-pulse flex items-center gap-3">
            <div className="size-10 bg-muted rounded-xl" />
            <div className="h-4 w-24 bg-muted rounded" />
          </div>
        </SidebarHeader>
        <SidebarContent className="px-4">
          {/* Show a skeleton loader while waiting for user data */}
          <div className="space-y-4 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-10 w-full bg-muted/50 animate-pulse rounded-2xl"
              />
            ))}
          </div>
        </SidebarContent>
      </Sidebar>
    );
  }
  return (
    <Sidebar className="border-r border-border bg-card" {...props}>
      <SidebarHeader className="p-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="size-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.3)] group-hover:scale-105 transition-transform">
              <GraduationCap className="size-6 text-black fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="text-foreground font-black leading-none tracking-tighter text-lg">
                LearnHub
              </span>
              <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">
                Platform
              </span>
            </div>
          </Link>

          {/* Theme Toggle */}
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
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 scrollbar-none">
        {routes?.map((group) => (
          <SidebarGroup key={group.title} className="py-4">
            <SidebarGroupLabel className="text-muted-foreground uppercase tracking-widest text-[10px] font-black px-4 mb-4">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-2">
                {group.items.map((item: any) => {
                  const Icon = iconMap[item.title] || Sparkles;
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={cn(
                          "flex items-center gap-3 px-4 py-6 transition-all duration-300 rounded-2xl",
                          isActive
                            ? "bg-amber-500 text-black font-bold shadow-[0_10px_20px_rgba(245,158,11,0.15)]"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                        )}
                      >
                        <Link href={item.url}>
                          <Icon
                            className={cn(
                              "size-5 transition-colors",
                              isActive ? "text-black" : "text-amber-500/60",
                            )}
                          />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-6 text-muted-foreground hover:text-red-400 hover:bg-red-400/10 transition-all duration-300 rounded-2xl"
            >
              <LogOut className="size-5" />
              <span className="font-bold uppercase tracking-widest text-xs">
                Log Out
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail className="hover:after:bg-amber-500/20" />
    </Sidebar>
  );
}
