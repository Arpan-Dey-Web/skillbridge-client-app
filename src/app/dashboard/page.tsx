import StudentDashboardClient from "@/components/ui/StudentDashboardClient";
import { cookies } from "next/headers";


async function getStudentData() {
  const cookieStore = await cookies();
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/bookings`, {
    headers: { cookie: cookieStore.toString() },
    next: { revalidate: 60 }, 
  });

  if (!res.ok) return [];
  const json = await res.json();
  return json.data || [];
}

export default async function StudentDashboard() {
  const bookings = await getStudentData();
  return <StudentDashboardClient initialBookings={bookings} />;
}

