"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Video,
  Clock,
  Calendar,
  Loader2,
  Trash2,
  Inbox,
  History,
  ExternalLink,
  DollarSign,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { format, isPast } from "date-fns";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

export default function TutorBookingRequests() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [rejectLoading, setRejectLoading] = useState<string | null>(null);
  const [meetLinks, setMeetLinks] = useState<{ [key: string]: string }>({});
  const { data: session } = authClient.useSession();
  const token = session?.session?.token;

  useEffect(() => {
    if (token) {
      fetchBookings();
    }
  }, [token]);

  const fetchBookings = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        },
      );
      const json = await res.json();
      if (json.success) setBookings(json.data);
    } catch (error) {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const groups = useMemo(() => {
    return {
      pending: bookings.filter((b) => b.status === "PENDING"),
      upcoming: bookings.filter(
        (b) =>
          b.status === "CONFIRMED" ||
          (b.status === "APPROVED" && !isPast(new Date(b.endTime))),
      ),
      completed: bookings.filter(
        (b) =>
          b.status === "COMPLETED" ||
          (b.status === "CONFIRMED" && isPast(new Date(b.endTime))),
      ),
    };
  }, [bookings]);

  const handleApprove = async (bookingId: string) => {
    const link = meetLinks[bookingId];
    if (!link || !link.startsWith("https://meet")) {
      return toast.error("Please enter a valid Google Meet link");
    }

    setActionLoading(bookingId);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings/approve/${bookingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({ meetLink: link }),
        },
      );

      const json = await res.json();
      if (json.success) {
        toast.success("Session Confirmed!");
        setBookings((prev) =>
          prev.map((b) =>
            b.id === bookingId
              ? { ...b, status: "CONFIRMED", meetLink: link }
              : b,
          ),
        );
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (bookingId: string) => {
    setRejectLoading(bookingId);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        },
      );
      if (res.ok) {
        toast.success("Request Removed");
        setBookings((prev) => prev.filter((b) => b.id !== bookingId));
      }
    } catch (error) {
      toast.error("Failed to remove request");
    } finally {
      setRejectLoading(null);
    }
  };

  if (loading)
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <Loader2 className="size-8 animate-spin text-amber-500" />
      </div>
    );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black text-foreground tracking-tight uppercase italic">
          Tutor <span className="shimmer-gold">Workspace.</span>
        </h2>
        <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.3em]">
          Manage your schedule and student interactions
        </p>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="bg-secondary border border-border h-14 rounded-2xl mb-8 w-full md:w-auto grid grid-cols-3 md:inline-grid">
          <TabsTrigger
            value="pending"
            className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-black uppercase text-[10px] tracking-widest px-8 transition-all"
          >
            Pending ({groups.pending.length})
          </TabsTrigger>
          <TabsTrigger
            value="upcoming"
            className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-black uppercase text-[10px] tracking-widest px-8 transition-all"
          >
            Upcoming ({groups.upcoming.length})
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-black uppercase text-[10px] tracking-widest px-8 transition-all"
          >
            History ({groups.completed.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="outline-none">
          <AnimatePresence mode="popLayout">
            {groups.pending.length === 0 ? (
              <EmptyState message="No pending requests at the moment." />
            ) : (
              <div className="grid gap-4">
                {groups.pending.map((booking) => (
                  <BookingRow key={booking.id} booking={booking}>
                    <div className="flex flex-col md:flex-row items-center gap-3 w-full lg:w-auto">
                      <div className="relative w-full md:w-64">
                        <Video className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                          placeholder="Google Meet Link..."
                          value={meetLinks[booking.id] || ""}
                          onChange={(e) =>
                            setMeetLinks({
                              ...meetLinks,
                              [booking.id]: e.target.value,
                            })
                          }
                          className="pl-10 bg-background border-border text-foreground text-xs h-12 rounded-xl focus-visible:ring-primary/20 font-bold"
                        />
                      </div>
                      <div className="flex gap-2 w-full md:w-auto">
                        <Button
                          onClick={() => handleApprove(booking.id)}
                          disabled={!!actionLoading}
                          className="flex-1 bg-primary text-primary-foreground hover:bg-foreground hover:text-background font-black h-12 rounded-xl transition-all uppercase text-[10px] tracking-widest italic"
                        >
                          {actionLoading === booking.id ? (
                            <Loader2 className="animate-spin size-4" />
                          ) : (
                            "Confirm"
                          )}
                        </Button>
                        <RejectAction
                          onConfirm={() => handleReject(booking.id)}
                          loading={rejectLoading === booking.id}
                        />
                      </div>
                    </div>
                  </BookingRow>
                ))}
              </div>
            )}
          </AnimatePresence>
        </TabsContent>

        <TabsContent value="upcoming" className="outline-none">
          {groups.upcoming.length === 0 ? (
            <EmptyState message="No scheduled sessions found." />
          ) : (
            <div className="grid gap-4">
              {groups.upcoming.map((booking) => (
                <BookingRow key={booking.id} booking={booking} type="approved">
                  <Button
                    asChild
                    className="w-full md:w-auto bg-amber-500 hover:bg-foreground hover:text-background text-black font-black h-12 rounded-xl transition-all uppercase text-[10px] tracking-widest italic"
                  >
                    <a href={booking.meetLink} target="_blank" rel="noreferrer">
                      <ExternalLink className="size-4 mr-2" />
                      JOIN MEET
                    </a>
                  </Button>
                </BookingRow>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="outline-none">
          {groups.completed.length === 0 ? (
            <EmptyState message="No past sessions recorded." />
          ) : (
            <div className="grid gap-4">
              {groups.completed.map((booking) => (
                <BookingRow key={booking.id} booking={booking} type="history">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-500 text-[10px] font-black uppercase tracking-widest italic">
                    <DollarSign className="size-3" />
                    Earned ${booking.totalPrice?.toFixed(2)}
                  </div>
                </BookingRow>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function BookingRow({ booking, children, type = "pending" }: any) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <SpotlightCard className="p-0 border-border overflow-hidden bg-card shadow-sm group">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between p-6 gap-6">
          <div className="flex items-start gap-5">
            <div className="relative shrink-0">
              {booking.partnerImage ? (
                <img
                  src={booking.partnerImage}
                  alt={booking.partnerName}
                  className="size-14 rounded-2xl object-cover border border-border"
                />
              ) : (
                <div
                  className={cn(
                    "size-14 rounded-2xl flex items-center justify-center border font-black text-xl italic",
                    type === "pending"
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {booking.partnerName?.charAt(0)}
                </div>
              )}
            </div>
            <div className="space-y-1">
              <h4 className="text-foreground font-black text-xl leading-none italic uppercase tracking-tighter">
                {booking.partnerName}
              </h4>
              <p className="text-[9px] text-muted-foreground font-medium uppercase tracking-tight">
                {booking.partnerEmail}
              </p>
              <div className="flex flex-wrap gap-3 text-muted-foreground text-[10px] font-black uppercase tracking-widest pt-1">
                <span className="flex items-center gap-1.5 bg-secondary px-2 py-1 rounded-md">
                  <Clock className="size-3 text-amber-500" />
                  {booking.timeSlot}
                </span>
                <span className="flex items-center gap-1.5 bg-secondary px-2 py-1 rounded-md">
                  <Calendar className="size-3 text-amber-500" />
                  {format(new Date(booking.startTime), "MMM d, yyyy")}
                </span>
              </div>
            </div>
          </div>
          {children}
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

function RejectAction({
  onConfirm,
  loading,
}: {
  onConfirm: () => void;
  loading: boolean;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          disabled={loading}
          className="bg-destructive/5 hover:bg-destructive hover:text-destructive-foreground text-destructive size-12 p-0 rounded-xl border border-destructive/10 transition-all"
        >
          {loading ? (
            <Loader2 className="animate-spin size-4" />
          ) : (
            <Trash2 className="size-5" />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-card border-border text-foreground rounded-[2.5rem]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-black uppercase italic tracking-tighter">
            Reject <span className="text-destructive">Request?</span>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            Are you sure you want to remove this booking request? This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-secondary border-border text-foreground rounded-xl font-black uppercase text-[10px] tracking-widest">
            Keep
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground font-black rounded-xl uppercase text-[10px] tracking-widest"
          >
            Yes, Reject
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-24 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-[3rem] bg-secondary/20"
    >
      <Inbox className="size-12 text-muted-foreground/30 mb-4" />
      <p className="text-muted-foreground font-black italic uppercase tracking-[0.2em] text-[10px]">
        {message}
      </p>
    </motion.div>
  );
}
