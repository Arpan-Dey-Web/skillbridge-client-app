"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  BookOpen,
  TrendingUp,
  Users,
  MoreVertical,
  Edit3,
  Trash2,
  Layers,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function AllCategories() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/categories`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => setCategories(res.data));
  }, []);
  return (
    <div className="space-y-8">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter">
            Platform <span className="shimmer-gold">Taxonomy</span>
          </h1>
          <p className="text-slate-500 font-medium">
            Organize learning domains and monitor subject demand.
          </p>
        </div>
        <Button className="bg-primary text-black font-black rounded-xl h-12 px-6 shadow-lg shadow-primary/10 transition-transform active:scale-95">
          <Plus className="size-5 mr-2" /> Create Category
        </Button>
      </div>

      {/* --- UTILITY BAR --- */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
          <Input
            placeholder="Search categories..."
            className="pl-12 bg-white/5 border-white/10 text-white rounded-2xl h-12 focus-visible:ring-primary/20"
          />
        </div>
        <Button
          variant="outline"
          className="border-white/10 bg-white/5 text-white h-12 rounded-2xl px-5"
        >
          <Layers className="size-4 mr-2 text-primary" /> Bulk Actions
        </Button>
      </div>

      {/* --- CATEGORY BENTO GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <SpotlightCard className="p-6 border-white/5 bg-white/[0.02] group relative overflow-hidden">
              {/* Decorative Background Icon */}
              <BookOpen className="absolute -right-4 -bottom-4 size-24 text-white/[0.03] rotate-12 group-hover:text-primary/5 transition-colors" />

              <div className="flex justify-between items-start mb-6">
                <div className="size-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <BookOpen className="size-6 text-primary" />
                </div>
                <div className="flex gap-1">
                  <button className="p-2 hover:bg-white/10 rounded-lg text-slate-500 transition-colors">
                    <Edit3 size={16} />
                  </button>
                  <button className="p-2 hover:bg-red-500/10 rounded-lg text-slate-500 hover:text-red-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                <div>
                  <h3 className="text-xl font-black text-white tracking-tight">
                    {cat.name ?cat.name:""}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <TrendingUp className="size-3 text-emerald-500" />
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                      {cat.growth? cat.growth: ""} Growth
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                      Tutors
                    </p>
                    <div className="flex items-center gap-2">
                      <Users className="size-3 text-primary" />
                      <span className="text-sm font-black text-white">
                        {cat.tutors}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                      Sessions
                    </p>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="size-3 text-primary" />
                      <span className="text-sm font-black text-white">
                        {cat.sessions}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
