"use client";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Separator } from "@/components/ui/separator";
import "../globals.css";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import QueryProvider from "@/components/provider/query-provider";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { authClient, getSessionFromConsole } from "@/lib/auth-client";
import { ExtendedUser } from "@/types/user.types";
import { userService } from "@/service/user.service";

interface CustomUser {
  name: string;
  role: "ADMIN" | "TUTOR" | "STUDENT";
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: sessionData, isPending } = authClient.useSession();
  if (isPending) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="animate-pulse font-black text-primary tracking-tighter">
          LEARNHUB...
        </div>
      </div>
    );
  }
  const user = sessionData?.user as ExtendedUser;
  const userInfo: CustomUser = {
    role: user?.role as "ADMIN" | "TUTOR" | "STUDENT",
    name: user?.name,
  };

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryProvider>
        <SidebarProvider>
          <AppSidebar userInfo={userInfo} />
          <SidebarInset className="bg-background">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border px-6 sticky top-0 z-20 bg-background/80 backdrop-blur-md">
              <SidebarTrigger className="-ml-1 text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg transition-colors" />

              <Separator
                orientation="vertical"
                className="mr-2 h-4 bg-border"
              />

              <div className="flex flex-col">
                <h1 className="text-xs font-black text-primary uppercase tracking-[0.2em]">
                  LearnHub {userInfo.role}
                </h1>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">
                  Welcome back, {userInfo.name?.split(" ")[0]}
                </p>
              </div>
            </header>
            <main className="flex flex-1 flex-col gap-6 p-6 lg:p-10 transition-colors duration-500">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
