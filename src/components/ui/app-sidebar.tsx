"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
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
import { Button } from "./button";
import { authClient } from "@/lib/auth-client";

// 1. Icon Map to automatically assign icons based on title
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
};

export function AppSidebar({
  user,
  ...props
}: {
  user: { role: string };
} & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  let routes: Route[] = [];
  switch (user.role) {
    case Roles.admin:
      routes = adminRoutes;
      break;
    case Roles.student:
      routes = studentRoutes;
      break;
    case Roles.tutor:
      routes = tutorRoutes;
      break;
    default:
      routes = [];
  }

  return (
    <Sidebar className="border-r border-white/5 bg-[#020617]" {...props}>
      {/* 3. Brand Header */}
      <SidebarHeader className="p-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="size-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.3)] group-hover:scale-105 transition-transform">
            <GraduationCap className="size-6 text-black fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-black leading-none tracking-tighter text-lg">
              LearnHub
            </span>
            <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">
              Platform
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {routes.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-slate-500 uppercase tracking-widest text-[10px] font-black px-4 mb-2">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
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
                            ? "bg-amber-500 text-black font-bold shadow-[0_10px_20px_rgba(245,158,11,0.15)] hover:bg-amber-500 hover:text-black"
                            : "text-slate-400 hover:text-white hover:bg-white/5",
                        )}
                      >
                        <Link href={item.url}>
                          <Icon
                            className={cn(
                              "size-5",
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
            <Button
              variant="secondary"
              size="sm"
              onClick={() => authClient.signOut()}
              className="text-slate-400 hover:text-red-400"
            >
              <LogOut className="size-4 mr-2" />
              <span className="hidden lg:inline">Log Out</span>
            </Button>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail className="hover:after:bg-amber-500/20" />
    </Sidebar>
  );
}
