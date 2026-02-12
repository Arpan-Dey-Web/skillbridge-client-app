"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // useRouter যোগ করা হয়েছে
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
  SidebarFooter, // Footer যোগ করা হয়েছে
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
import { authClient } from "@/lib/auth-client";

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
  const router = useRouter(); // রিডাইরেক্ট করার জন্য

  // ১. সাইন আউট লজিক
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/"); // হোম পেজে পাঠিয়ে দিবে
          router.refresh();
        },
      },
    });
  };

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

      <SidebarContent className="px-2 scrollbar-none">
        {routes.map((group) => (
          <SidebarGroup key={group.title} className="py-4">
            <SidebarGroupLabel className="text-slate-500 uppercase tracking-widest text-[10px] font-black px-4 mb-4">
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
                            ? "bg-amber-500 text-black font-bold shadow-[0_10px_20px_rgba(245,158,11,0.15)] hover:bg-amber-500 hover:text-black active:bg-amber-500" // এখানে hover এবং active ফিক্স করা হয়েছে
                            : "text-slate-400 hover:text-white hover:bg-white/5",
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


      <SidebarFooter className="p-4 border-t border-white/5">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-6 text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all duration-300 rounded-2xl"
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
