"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import TutorCard from "@/components/ui/Tutorcard";

export default function TutorsPage() {
  const [tutors, setTutors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchTutors = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        search,
        category: selectedCategory,
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
    // Initial fetch for categories and tutors
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/categories`)
      .then((res) => res.json())
      .then((res) => setCategories(res.data));

    fetchTutors();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* --- Sidebar Filters --- */}
        <aside className="w-full md:w-64 space-y-6 min-h-screen">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 ">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filters
            </h3>

            <div className="space-y-4">
              <div>
                <Label>Subject / Category</Label>
                <select
                  className="w-full mt-1 p-2 rounded-lg border border-slate-200"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories?.map((cat: any) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Max Hourly Rate ($)</Label>
                <Input
                  type="number"
                  placeholder="e.g. 50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>

              <Button onClick={fetchTutors} className="w-full bg-indigo-600">
                Apply Filters
              </Button>
            </div>
          </div>
        </aside>

        {/* --- Main Content --- */}
        <main className="flex-1 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              placeholder="Search by name or bio..."
              className="pl-10 h-12 bg-white rounded-xl"
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
                  className="h-64 bg-slate-100 animate-pulse rounded-2xl"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tutors?.map((tutor: any) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))}
              {tutors?.length === 0 && (
                <p className="text-center col-span-full py-20 text-slate-400">
                  No tutors found matching your criteria.
                </p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// /tutors/0144589e - 3942 - 49e4 - b4a7 - d9c49118e23a;