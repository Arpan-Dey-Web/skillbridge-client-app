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
  User,
} from "lucide-react";
import TutorCard from "@/components/ui/Tutorcard";
import { cn } from "@/lib/utils";

export interface CategoryCount {
  tutors: number;
}

export interface Category {
  id: string;
  name: string;
  _count: CategoryCount;
}

export interface CategoriesResponse {
  data: Category[];
}

export interface Tutor {
  id: string;
  bio: string;
  hourlyRate: number;
  averageRating: number;
  userId: string;
  categoryId: string;
  user: {
    name: string;
    image: string;
  };
  category: {
    id: string;
    name: string;
  };
}

export interface TutorsResponse {
  success: boolean;
  data: Tutor[];
  pagination?: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
  totalPages?: number;
}

const fetchCategories = async (): Promise<Category[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`,
  );
  if (!res.ok) throw new Error("Failed to load categories");
  const json = await res.json();
  return json.data;
};

const fetchTutorsData = async ({ queryKey }: any): Promise<TutorsResponse> => {
  const [_key, { page, search, selectedCategory, maxPrice }] = queryKey;

  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tutors/all`;
  const params = new URLSearchParams({
    page: page.toString(),
    limit: "10",
    search: search || "",
    maxPrice: maxPrice || "",
  });

  if (selectedCategory !== "all") {
    // Note: If this endpoint returns a different structure, adjust accordingly
    url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/${selectedCategory}/tutors`;
  }

  const res = await fetch(`${url}?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch tutors");
  return res.json();
};

export default function TutorsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const { data: tutorResponse, isLoading: loading } = useQuery<TutorsResponse>({
    queryKey: ["tutors", { page, search, selectedCategory, maxPrice }],
    queryFn: fetchTutorsData,
    placeholderData: (previousData) => previousData,
  });
  const tutors = tutorResponse?.data || [];
  const totalPages =
    tutorResponse?.pagination?.totalPages || tutorResponse?.totalPages || 1;

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Editorial Header */}
        <div className="mb-16 border-l-4 border-primary pl-8">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 uppercase leading-none">
            Find Your{" "}
            <span className="text-primary italic font-serif lowercase">
              Mentor.
            </span>
          </h1>
          <p className="text-muted-foreground font-bold uppercase tracking-[0.3em] text-[10px]">
            The Global Directory of Elite Academic Architects.
          </p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12">
          {/* --- Sidebar: Filter Matrix --- */}
          <aside className="lg:col-span-3 space-y-8">
            <div className="bg-card p-10 rounded-[3rem] border border-border sticky top-28 shadow-sm">
              <div className="flex items-center gap-3 mb-10 text-foreground">
                <SlidersHorizontal className="size-4 text-primary" />
                <h3 className="font-black text-[10px] uppercase tracking-[0.2em]">
                  Filter Matrix
                </h3>
              </div>

              <div className="space-y-10">
                {/* Category Filter */}
                <div className="space-y-4">
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
                    <SelectTrigger className="bg-background border-border h-14 rounded-2xl focus:ring-primary/20 transition-all text-xs font-bold uppercase tracking-tight">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border rounded-2xl">
                      <SelectItem
                        value="all"
                        className="text-xs uppercase font-bold"
                      >
                        All Categories
                      </SelectItem>
                      {categories?.map((cat) => (
                        <SelectItem
                          key={cat.id}
                          value={cat.name}
                          className="text-xs uppercase font-bold"
                        >
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Filter */}
                <div className="space-y-4">
                  <Label className="text-[10px] uppercase tracking-widest text-primary font-black ml-1">
                    Budget Limit ($/hr)
                  </Label>
                  <div className="relative group">
                    <Input
                      type="number"
                      placeholder="0.00"
                      className="bg-background border-border h-14 pl-6 rounded-2xl focus-visible:ring-primary/20 text-lg font-black"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-muted-foreground/30 uppercase tracking-widest group-focus-within:text-primary transition-colors">
                      USD
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => setPage(1)}
                  className="w-full bg-primary text-primary-foreground hover:opacity-90 font-black h-16 rounded-2xl transition-all uppercase tracking-widest text-[11px] shadow-xl shadow-primary/20"
                >
                  Synchronize Search
                </Button>
              </div>
            </div>
          </aside>

          {/* --- Main Content: Tutor Grid --- */}
          <main className="lg:col-span-9">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-80 bg-card/50 rounded-[3rem] border border-border flex items-center justify-center"
                  >
                    <User className="size-12 text-muted-foreground/10" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {tutors?.map((tutor) => (
                    <TutorCard key={tutor.id} tutor={tutor} />
                  ))}
                </div>

                {/* Empty State */}
                {tutors?.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-40 text-center border-2 border-dashed border-border rounded-[4rem] bg-secondary/10">
                    <Search className="text-muted-foreground/20 size-20 mb-6" />
                    <h4 className="text-foreground font-black uppercase tracking-[0.2em] text-sm">
                      No synchronized mentors found
                    </h4>
                    <p className="text-muted-foreground text-xs mt-2 uppercase tracking-widest font-bold">
                      Try adjusting your filter parameters
                    </p>
                  </div>
                )}

                {/* --- Pagination: Refined & Aesthetic --- */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-4 pt-16">
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={page === 1}
                      onClick={() => {
                        setPage((prev) => prev - 1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="size-14 rounded-2xl border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-500 shadow-sm"
                    >
                      <ChevronLeft className="size-6" />
                    </Button>

                    <div className="flex gap-3 bg-card p-2 border border-border rounded-3xl shadow-sm">
                      {[...Array(totalPages)].map((_, i) => (
                        <Button
                          key={i}
                          onClick={() => {
                            setPage(i + 1);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className={cn(
                            "size-10 rounded-xl font-black transition-all duration-500",
                            page === i + 1
                              ? "bg-primary text-primary-foreground scale-105 shadow-lg shadow-primary/20"
                              : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-secondary",
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
                      onClick={() => {
                        setPage((prev) => prev + 1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="size-14 rounded-2xl border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-500 shadow-sm"
                    >
                      <ChevronRight className="size-6" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
