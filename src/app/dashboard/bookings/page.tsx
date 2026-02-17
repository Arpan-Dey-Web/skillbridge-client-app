import StudentBookingsClient from "@/components/ui/StudentBookingsClient";
import { cookies } from "next/headers";

async function getBookings() {
  const cookieStore = await cookies();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings`,
    {
      headers: {
        cookie: cookieStore.toString(),
      },
      next: { revalidate: 60 },
    },
  );

  if (!res.ok) return [];
  const json = await res.json();
  return json.data || [];
}

export default async function BookingsPage() {
  const initialBookings = await getBookings();

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <StudentBookingsClient initialBookings={initialBookings} />
    </div>
  );
}
