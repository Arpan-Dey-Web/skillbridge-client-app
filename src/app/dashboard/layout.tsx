import { AppSidebar } from "@/components/ui/app-sidebar";
import { Separator } from "@/components/ui/separator";
import "../globals.css";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { userService } from "@/service/user.service";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await userService.getSession();

  if (!data?.user) {
    return redirect("/login");
  }

  const userInfo = {
    role: data.user.role,
    name: data.user.name,
  };

  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset className="bg-[#020617]">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-white/5 px-6 sticky top-0 z-20 bg-[#020617]/80 backdrop-blur-md">
          <SidebarTrigger className="-ml-1 text-black bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors" />
          <Separator orientation="vertical" className="mr-2 h-4 bg-white/10" />

          <div className="flex flex-col">
            <h1 className="text-xs font-black text-amber-500 uppercase tracking-[0.2em]">
              LearnHub {userInfo.role}
            </h1>
            <p className="text-[10px] text-slate-500 font-medium">
              Welcome back, {userInfo.name?.split(" ")[0]}
            </p>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-6 p-6 lg:p-10">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
