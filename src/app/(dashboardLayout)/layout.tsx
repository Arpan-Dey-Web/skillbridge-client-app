import { AppSidebar } from "@/components/ui/app-sidebar";
import { Separator } from "@/components/ui/separator";
import "../globals.css";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Roles } from "@/constants/roles";
import { userService } from "@/service/user.service";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children, // The default page.tsx
  admin, // @admin slot
  student, // @student slot
  tutor, // @tutor slot
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
  student: React.ReactNode;
  tutor: React.ReactNode;
}) {
  const { data } = await userService.getSession();

  // Handle case where session might be null
  if (!data?.user) {
    return redirect("/login")
  }

  const userInfo = {
    role: data.user.role,
  };

  return (
    <SidebarProvider>
      {/* 1. Sidebar on the left */}
      <AppSidebar user={userInfo} />

      <SidebarInset>
        {/* 2. Top Header inside content area */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1 bg-amber-400" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-sm font-medium text-slate-500 capitalize">
            {userInfo.role} Dashboard
          </h1>
        </header>

        {/* 3. Main Content Area */}
        <main className="flex flex-1 flex-col gap-4 p-6 bg-slate-50/50">
          {/* This renders the specific role folder contents */}
          {userInfo.role === Roles.admin && admin}
          {userInfo.role === Roles.tutor && tutor}
          {userInfo.role === Roles.student && student}

          {/* This renders the standard children if needed */}
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
