"use client";

import { authClient } from "@/lib/auth-client";
import {
  Users,
  Calendar,
  DollarSign,
  Star,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function TutorDashboard() {
  const { data: session } = authClient.useSession();
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalSessions: 0,
    avgRating: 0,
    activeStudents: 0,
  });

  // Mock data for UI - Replace with your GET /api/tutor/stats/:id endpoint later
  useEffect(() => {
    // fetchStats();
  }, []);

  return (
    <div className="p-6 lg:p-10  min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* --- Section 1: Welcome Header --- */}
        <header>
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back, {session?.user?.name || "Tutor"}! 👋
          </h1>
          <p className="text-slate-500">
            Here is what is happening with your teaching today.
          </p>
        </header>

        {/* --- Section 2: Analytics Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Revenue"
            value={`$${stats.totalRevenue}`}
            icon={<DollarSign className="text-emerald-600" />}
            color="bg-emerald-50"
          />
          <StatCard
            title="Total Sessions"
            value={stats.totalSessions}
            icon={<Calendar className="text-blue-600" />}
            color="bg-blue-50"
          />
          <StatCard
            title="Avg. Rating"
            value={stats.avgRating}
            icon={<Star className="text-amber-500" />}
            color="bg-amber-50"
          />
          <StatCard
            title="Active Students"
            value={stats.activeStudents}
            icon={<Users className="text-indigo-600" />}
            color="bg-indigo-50"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- Section 3: Upcoming Bookings (Table/List) --- */}
          <Card className="lg:col-span-2 shadow-sm border-none">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upcoming Sessions</CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Example Session Item */}
                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-slate-200" />
                    <div>
                      <h4 className="font-semibold text-slate-800">
                        Alice Johnson
                      </h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> 10 Feb, 10:00 AM - 11:00
                        AM
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    Confirmed
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* --- Section 4: Quick Actions & Availability Status --- */}
          <div className="space-y-6">
            <Card className="shadow-sm border-none bg-indigo-600 text-white">
              <CardHeader>
                <CardTitle className="text-lg">Profile Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-indigo-200" />
                  <span>Profile is Public</span>
                </div>
                <Link href={"/tutor/availability"}>
                  <Button className="w-full bg-indigo-500 hover:text-white">
                    Manage Availability
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Stat Component
function StatCard({ title, value, icon, color }: any) {
  return (
    <Card className="border-none shadow-sm overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
          </div>
          <div className={`p-3 rounded-2xl ${color}`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function Button({ children, className, variant, size, ...props }: any) {
  const base =
    "px-4 py-2 rounded-xl font-medium transition-all active:scale-95";
  const variants: any = {
    outline: "border border-slate-200 hover:bg-slate-50",
    default: "bg-indigo-600 text-white hover:bg-indigo-700",
  };
  return (
    <button
      className={`${base} ${variants[variant || "default"]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
