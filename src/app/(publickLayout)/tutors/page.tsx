"use client";

import { useEffect, useState } from "react";
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
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import TutorCard from "@/components/ui/Tutorcard";

export default function TutorsPage() {
  const [tutors, setTutors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchTutors = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        search,
        category: selectedCategory === "all" ? "" : selectedCategory,
        maxPrice: maxPrice,
      }).toString();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/tutors?${query}`,
      );
      const data = await res.json();
      if (data.success) setTutors(data.data);
    } catch (error) {
      console.error("Error fetching tutors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch categories and tutors on mount
    const initFetch = async () => {
      try {
        const catRes = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/categories`,
        );
        const catData = await catRes.json();
        setCategories(catData.data);
        await fetchTutors();
      } catch (err) {
        console.error("Initial fetch failed", err);
      }
    };
    initFetch();
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-black tracking-tighter mb-2">
            Find Your Mentor
          </h1>
          <p className="text-slate-400">
            Elite tutors for high-impact learning.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* --- Sidebar Filters --- */}
          <aside className="w-full lg:w-72 space-y-6">
            <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 sticky top-24">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-amber-500" /> Filters
              </h3>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                    Category
                  </Label>
                  <Select
                    onValueChange={(val) => setSelectedCategory(val)}
                    defaultValue="all"
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-amber-500">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0f172a] border-white/10 text-white">
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories?.map((cat: any) => (
                        <SelectItem key={cat.id} value={cat.name}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                    Max Hourly Rate
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                      $
                    </span>
                    <Input
                      type="number"
                      placeholder="50"
                      className="bg-white/5 border-white/10 h-12 pl-8 rounded-xl focus-visible:ring-amber-500"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div>

                <Button
                  onClick={fetchTutors}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold h-12 rounded-xl transition-all"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </aside>

          {/* --- Main Content --- */}
          <main className="flex-1 space-y-8">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500 transition-colors w-5 h-5" />
              <Input
                placeholder="Search by name, skill, or bio..."
                className="pl-12 h-14 bg-white/5 border-white/10 rounded-2xl text-lg focus-visible:ring-amber-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchTutors()}
              />
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-72 bg-white/5 animate-pulse rounded-[2rem] border border-white/5"
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
                  <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="size-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
                      <Search className="text-slate-600 size-8" />
                    </div>
                    <p className="text-slate-400 text-lg">
                      No tutors found matching your criteria.
                    </p>
                    <Button
                      variant="link"
                      onClick={() => {
                        setSearch("");
                        setSelectedCategory("all");
                        setMaxPrice("");
                        fetchTutors();
                      }}
                      className="text-amber-500"
                    >
                      Clear all filters
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
