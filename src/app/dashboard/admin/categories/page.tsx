"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Users, Edit3, Trash2 } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { toast } from "sonner";

export default function AllCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // --- API Actions ---
  const fetchCategories = () => {
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/categories`)
      .then((res) => res.json())
      .then((res) => {
        setCategories(res.data || []);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Network Error: Could not fetch taxonomy");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    if (!categoryName.trim()) return toast.error("Category name is required");

    const method = editingId ? "PATCH" : "POST";
    const url = editingId
      ? `${process.env.NEXT_PUBLIC_APP_URL}/api/categories/${editingId}`
      : `${process.env.NEXT_PUBLIC_APP_URL}/api/categories`;

    const toastId = toast.loading(
      editingId ? "Updating domain..." : "Initializing domain...",
    );

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryName }),
        credentials: "include",
      });

      const data = await res.json();
      if (data.success) {
        toast.success(editingId ? "Taxonomy Updated" : "Domain Established", {
          id: toastId,
        });
        setOpen(false);
        setCategoryName("");
        setEditingId(null);
        fetchCategories();
      } else {
        toast.error(data.message || "Action failed", { id: toastId });
      }
    } catch (error) {
      toast.error("Server connection lost", { id: toastId });
    }
  };

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Purging domain from system...");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/categories/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (res.ok) {
        toast.success("Domain Expunged Successfully", { id: toastId });
        fetchCategories();
      } else {
        toast.error("Access Denied: Could not remove domain", { id: toastId });
      }
    } catch (error) {
      toast.error("System connection failure", { id: toastId });
    }
  };

  return (
    <div className="space-y-12 py-10">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
            Domain <span className="shimmer-gold">Control</span>
          </h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mt-4">
            Total active taxonomy sectors: {categories.length}
          </p>
        </div>

        <Dialog
          open={open}
          onOpenChange={(val) => {
            setOpen(val);
            if (!val) {
              setEditingId(null);
              setCategoryName("");
            }
          }}
        >
          <DialogTrigger asChild>
            <Button className="bg-primary text-black font-black rounded-2xl h-14 px-10 shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
              <Plus className="size-5 mr-2 stroke-[4px]" />
              INITIALIZE DOMAIN
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-white/10 text-white rounded-[2rem]">
            <DialogHeader>
              <DialogTitle className="shimmer-gold uppercase font-black italic text-2xl">
                {editingId ? "Update Sector" : "Define New Sector"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">
                  Taxonomy Designation
                </label>
                <Input
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="e.g. QUANTUM COMPUTING"
                  className="bg-white/5 border-white/10 h-14 rounded-2xl focus-visible:ring-primary/20 uppercase font-bold text-white"
                />
              </div>
              <Button
                onClick={handleSubmit}
                className="w-full bg-primary text-black font-black h-14 rounded-2xl shadow-lg shadow-primary/10"
              >
                {editingId ? "APPLY MODIFICATIONS" : "CONFIRM INITIALIZATION"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* --- GRID --- */}
      {loading ? (
        <div className="py-40 text-center shimmer-gold font-black italic uppercase tracking-widest animate-pulse">
          Syncing_Taxonomy_Data...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {categories.map((cat: any, i: number) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
              >
                <SpotlightCard className="group relative border-white/5 bg-white/[0.01] rounded-[2.5rem] overflow-hidden hover:border-primary/20 transition-all duration-500">
                  {/* ID Tag */}
                  <div className="absolute top-6 left-6">
                    <span className="text-[8px] font-black text-slate-700 uppercase tracking-[0.4em]">
                      SEC-{cat.id.slice(0, 3)}
                    </span>
                  </div>

                  <div className="p-10 flex flex-col items-center text-center">
                    {/* Hero Icon */}
                    <div className="relative mb-6">
                      <div className="size-20 rounded-[2.2rem] bg-background border border-border flex items-center justify-center shadow-2xl group-hover:border-primary/50 transition-all duration-700 group-hover:rotate-[10deg]">
                        <span className="shimmer-gold text-4xl font-black italic">
                          {cat.name[0]}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-primary/20 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none mb-2 group-hover:text-primary transition-colors">
                      {cat.name}
                    </h3>

                    <div className="flex items-center gap-2 text-slate-500 mb-8">
                      <Users className="size-3" />
                      <span className="text-[9px] font-black uppercase tracking-[0.2em]">
                        {cat._count?.tutors || 0} Operators Active
                      </span>
                    </div>

                    {/* Actions Row */}
                    <div className="w-full grid grid-cols-2 gap-3 pt-6 border-t border-white/5">
                      {/* Edit Button */}
                      <button
                        onClick={() => {
                          setEditingId(cat.id);
                          setCategoryName(cat.name);
                          setOpen(true);
                        }}
                        className="flex items-center justify-center gap-2 h-11 rounded-xl bg-white/5 text-slate-400 hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/20 transition-all text-[9px] font-black uppercase tracking-widest"
                      >
                        <Edit3 size={12} />
                        Edit
                      </button>

                      {/* AlertDialog for Delete */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="flex items-center justify-center gap-2 h-11 rounded-xl bg-white/5 text-slate-400 hover:bg-red-500/10 hover:text-red-500 border border-transparent hover:border-red-500/20 transition-all text-[9px] font-black uppercase tracking-widest">
                            <Trash2 size={12} />
                            Drop
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-card border-white/10 text-white rounded-[2rem]">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-red-500 uppercase font-black italic tracking-tighter">
                              Critical Warning: Domain Purge
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-slate-500 font-medium">
                              You are about to expunge the{" "}
                              <span className="text-white font-bold">
                                "{cat.name}"
                              </span>{" "}
                              sector. This will detach all associated tutors.
                              This action is irreversible.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="mt-4">
                            <AlertDialogCancel className="bg-white/5 border-white/10 text-white rounded-xl hover:bg-white/10">
                              Abort Mission
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(cat.id)}
                              className="bg-red-500 text-white font-black rounded-xl hover:bg-red-600 shadow-lg shadow-red-500/20"
                            >
                              Confirm Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>

                  {/* Aesthetic Detail */}
                  <div className="absolute -bottom-2 -right-2 size-12 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
