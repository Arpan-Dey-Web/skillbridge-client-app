"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Users, Edit3, Trash2, Hexagon } from "lucide-react";
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
import { cn } from "@/lib/utils";

export default function AllCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

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
    <div className="space-y-10 py-6 transition-colors duration-500">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black text-foreground tracking-tighter uppercase italic leading-none">
            Domain <span className="shimmer-gold">Control</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.4em] mt-4 flex items-center gap-2">
            <Hexagon className="size-3 text-primary animate-pulse" />
            Active Taxonomy Sectors: {categories.length}
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
            <Button className="bg-primary text-primary-foreground font-black rounded-2xl h-14 px-8 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest text-xs">
              <Plus className="size-5 mr-2 stroke-[3px]" />
              New Sector
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border text-foreground rounded-[2rem] shadow-2xl">
            <DialogHeader>
              <DialogTitle className="shimmer-gold uppercase font-black italic text-2xl tracking-tighter">
                {editingId ? "Modify Sector" : "Define Sector"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-1">
                  Taxonomy Designation
                </label>
                <Input
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="e.g. QUANTUM COMPUTING"
                  className="bg-secondary/50 border-border h-14 rounded-2xl focus-visible:ring-primary/20 uppercase font-black text-foreground"
                />
              </div>
              <Button
                onClick={handleSubmit}
                className="w-full bg-primary text-primary-foreground font-black h-14 rounded-2xl shadow-lg shadow-primary/10 tracking-widest uppercase text-xs"
              >
                {editingId ? "Apply Changes" : "Confirm Initialization"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* --- GRID --- */}
      {loading ? (
        <div className="h-64 flex flex-col items-center justify-center bg-secondary/20 rounded-[3rem] border border-dashed border-border">
          <div className="shimmer-gold font-black italic uppercase tracking-[0.3em] animate-pulse text-xs">
            Syncing_Taxonomy_Data...
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {categories.map((cat: any, i: number) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.03 }}
              >
                <SpotlightCard className="group relative border-border bg-card rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-500">
                  {/* Sector Tag */}
                  <div className="absolute top-6 right-6">
                    <span className="text-[8px] font-black text-muted-foreground/40 uppercase tracking-[0.3em] bg-secondary px-2 py-1 rounded-lg border border-border">
                      SEC_{cat.id.slice(0, 3)}
                    </span>
                  </div>

                  <div className="p-8 flex flex-col items-center text-center">
                    {/* Hero Icon */}
                    <div className="relative mb-6">
                      <div className="size-20 rounded-[2.2rem] bg-secondary border border-border flex items-center justify-center shadow-xl group-hover:border-primary/50 transition-all duration-700 group-hover:-rotate-6">
                        <span className="shimmer-gold text-4xl font-black italic">
                          {cat.name[0]}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>

                    <h3 className="text-2xl font-black text-foreground uppercase italic tracking-tighter leading-none mb-3 group-hover:text-primary transition-colors duration-300">
                      {cat.name}
                    </h3>

                    <div className="flex items-center gap-2 text-muted-foreground mb-8 bg-secondary/50 px-3 py-1 rounded-full border border-border">
                      <Users className="size-3 text-primary" />
                      <span className="text-[9px] font-black uppercase tracking-widest">
                        {cat._count?.tutors || 0} Operators
                      </span>
                    </div>

                    {/* Actions Row */}
                    <div className="w-full grid grid-cols-2 gap-3 pt-6 border-t border-border">
                      <button
                        onClick={() => {
                          setEditingId(cat.id);
                          setCategoryName(cat.name);
                          setOpen(true);
                        }}
                        className="flex items-center justify-center gap-2 h-10 rounded-xl bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border hover:border-primary/20 transition-all text-[9px] font-black uppercase tracking-widest"
                      >
                        <Edit3 size={12} />
                        Edit
                      </button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="flex items-center justify-center gap-2 h-10 rounded-xl bg-secondary text-muted-foreground hover:bg-destructive/10 hover:text-destructive border border-border hover:border-destructive/20 transition-all text-[9px] font-black uppercase tracking-widest">
                            <Trash2 size={12} />
                            Drop
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-card border-border text-foreground rounded-[2.5rem] shadow-2xl">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-destructive uppercase font-black italic tracking-tighter text-2xl">
                              Critical Warning
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-muted-foreground font-medium">
                              You are about to expunge the{" "}
                              <span className="text-foreground font-black underline decoration-destructive">
                                "{cat.name}"
                              </span>{" "}
                              sector. All associated data will be detached. This
                              action is terminal.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="mt-6 flex gap-3">
                            <AlertDialogCancel className="bg-secondary border-border text-foreground rounded-xl hover:bg-secondary/80 font-black uppercase text-[10px] tracking-widest">
                              Abort
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(cat.id)}
                              className="bg-destructive text-destructive-foreground font-black rounded-xl hover:bg-destructive/90 shadow-lg shadow-destructive/20 font-black uppercase text-[10px] tracking-widest"
                            >
                              Confirm Purge
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
