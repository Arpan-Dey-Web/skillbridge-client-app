"use client";

import * as React from "react";
import {
  LayoutDashboard,
  CalendarCheck,
  Clock,
  MessageSquare,
  GraduationCap,
  Users,
  Settings2,
  BarChart3,
  Globe,
  Wallet,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = authClient.useSession();

  const tutorData = {
    user: {
      name: session?.user?.name || "Tutor",
      email: session?.user?.email || "",
      avatar: session?.user?.image || "/avatars/default.jpg",
    },
    teams: [
      {
        name: "SkillBridge",
        logo: GraduationCap,
        plan: "Tutor Pro",
      },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard/tutor",
        icon: LayoutDashboard,
        isActive: true,
      },
      {
        title: "Schedule",
        url: "#",
        icon: CalendarCheck,
        items: [
          {
            title: "Upcoming Bookings",
            url: "/dashboard/tutor/bookings",
          },
          {
            title: "Availability",
            url: "/dashboard/tutor/availability",
          },
          {
            title: "History",
            url: "/dashboard/tutor/history",
          },
        ],
      },
      {
        title: "Students",
        url: "/dashboard/tutor/students",
        icon: Users,
      },

      {
        title: "Finances",
        url: "#",
        icon: Wallet,
        items: [
          {
            title: "Earnings",
            url: "/dashboard/tutor/earnings",
          },
          {
            title: "Invoices",
            url: "/dashboard/tutor/invoices",
          },
        ],
      },
    ],
  
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={tutorData.teams} />
      </SidebarHeader>
      <SidebarContent>
        {/* Main Navigation */}
        <NavMain items={tutorData.navMain} />
        {/* Management/Projects Section */}
        {/* <NavProjects projects={tutorData.management} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={tutorData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
