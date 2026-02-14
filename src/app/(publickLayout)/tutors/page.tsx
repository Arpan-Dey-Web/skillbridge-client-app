"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import TutorCard from "@/components/ui/Tutorcard";
import { cn } from "@/lib/utils";

// --- Fetch Functions ---
const fetchCategories = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/categories`);
  if (!res.ok) throw new Error("Failed to load categories");
  const data = await res.json();
  return data.data;
};

const fetchTutorsData = async ({ queryKey }: any) => {
  const [_key, { page, search, selectedCategory, maxPrice }] = queryKey;

  let url = `${process.env.NEXT_PUBLIC_APP_URL}/api/tutors/all`;
  const params = new URLSearchParams({
    page: page.toString(),
    limit: "10",
    search: search,
    maxPrice: maxPrice,
  });

  if (selectedCategory !== "all") {
    url = `${process.env.NEXT_PUBLIC_APP_URL}/api/categories/${selectedCategory}/tutors`;
  }

  const res = await fetch(`${url}?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch tutors");
  return res.json();
};

export default function TutorsPage() {
  // Filter & Pagination States (Kept for UI control)
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);

  // 1. Fetch Categories
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // 2. Fetch Tutors (Depends on page and filters)
  const { data: tutorResponse, isLoading: loading } = useQuery({
    queryKey: ["tutors", { page, search, selectedCategory, maxPrice }],
    queryFn: fetchTutorsData,
    placeholderData: (previousData) => previousData, // Smooth transition between pages
  });

  const tutors = tutorResponse?.data || [];
  const totalPages =
    tutorResponse?.pagination?.totalPages || tutorResponse?.totalPages || 1;


  const handleFilterApply = () => {
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-20 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-black tracking-tighter mb-3 italic uppercase">
            Find Your <span className="shimmer-gold">Mentor.</span>
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs">
            Elite tutors for high-impact learning systems.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* --- Sidebar Filters --- */}
          <aside className="w-full lg:w-72 space-y-6">
            <div className="bg-white/[0.02] p-8 rounded-[2.5rem] border border-white/5 sticky top-24 backdrop-blur-md">
              <h3 className="font-black text-xs uppercase tracking-[0.3em] mb-8 flex items-center gap-3 text-slate-400">
                <SlidersHorizontal className="w-4 h-4 text-primary" /> Filter
                Matrix
              </h3>

              <div className="space-y-8">
                <div className="space-y-3">
                  <Label className="text-[10px] uppercase tracking-widest text-primary font-black ml-1">
                    Specialization
                  </Label>
                  <Select
                    onValueChange={(val) => {
                      setSelectedCategory(val);
                      setPage(1);
                    }}
                    value={selectedCategory}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 h-14 rounded-2xl focus:ring-primary/50 transition-all">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0c0c0e] border-white/10 text-white rounded-xl">
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories?.map((cat: any) => (
                        <SelectItem key={cat.id} value={cat.name}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] uppercase tracking-widest text-primary font-black ml-1">
                    Budget Limit ($/hr)
                  </Label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="0.00"
                      className="bg-white/5 border-white/10 h-14 pl-6 rounded-2xl focus-visible:ring-primary/50 text-lg font-bold"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div>

                <Button
                  onClick={handleFilterApply}
                  className="w-full bg-primary hover:bg-white text-black font-black h-14 rounded-2xl transition-all uppercase tracking-widest text-[11px] shadow-lg shadow-primary/10"
                >
                  Apply System Filters
                </Button>
              </div>
            </div>
          </aside>

          {/* --- Main Content --- */}
          <main className="flex-1 space-y-8">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-64 bg-white/5 animate-pulse rounded-[2.5rem] border border-white/5"
                  />
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tutors?.map((tutor: any) => (
                    <TutorCard key={tutor.id} tutor={tutor} />
                  ))}
                </div>

                {tutors?.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-white/10 rounded-[3rem]">
                    <Search className="text-slate-800 size-16 mb-4" />
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">
                      No synchronized mentors found.
                    </p>
                  </div>
                )}

                {/* --- PAGINATION CONTROL --- */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-3 pt-12">
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={page === 1}
                      onClick={() => setPage((prev) => prev - 1)}
                      className="rounded-xl border-white/10 bg-white/5 hover:bg-primary hover:text-black size-12"
                    >
                      <ChevronLeft className="size-5" />
                    </Button>

                    <div className="flex gap-2">
                      {[...Array(totalPages)].map((_, i) => (
                        <Button
                          key={i}
                          onClick={() => setPage(i + 1)}
                          className={cn(
                            "size-12 rounded-xl font-black transition-all",
                            page === i + 1
                              ? "bg-primary text-black scale-110"
                              : "bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10",
                          )}
                        >
                          {i + 1}
                        </Button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      disabled={page === totalPages}
                      onClick={() => setPage((prev) => prev + 1)}
                      className="rounded-xl border-white/10 bg-white/5 hover:bg-primary hover:text-black size-12"
                    >
                      <ChevronRight className="size-5" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
