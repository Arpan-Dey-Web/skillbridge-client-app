"use client"
import React, { useState } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  UserPlus,
  ShieldCheck,
  UserX,
  Mail,
  ArrowUpDown,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const MOCK_USERS = [
  {
    id: 1,
    name: "Aris Thorne",
    email: "aris@example.com",
    role: "TUTOR",
    status: "Active",
    joined: "Feb 01, 2026",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    email: "sarah@edu.com",
    role: "STUDENT",
    status: "Active",
    joined: "Jan 28, 2026",
  },
  {
    id: 3,
    name: "Marcus Aurelius",
    email: "stoic@wisdom.com",
    role: "TUTOR",
    status: "Pending",
    joined: "Feb 05, 2026",
  },
  {
    id: 4,
    name: "Julia Caesar",
    email: "julia@empire.com",
    role: "STUDENT",
    status: "Banned",
    joined: "Dec 12, 2025",
  },
];

export default function TotalUsers() {
  return (
    <div className="space-y-8">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter">
            User <span className="shimmer-gold">Directory</span>
          </h1>
          <p className="text-slate-500 font-medium">
            Manage, verify, and monitor platform members.
          </p>
        </div>
        <Button className="bg-primary text-black font-black rounded-xl h-12 px-6 shadow-lg shadow-primary/10">
          <UserPlus className="size-4 mr-2" /> Add New User
        </Button>
      </div>

      {/* --- SEARCH & FILTERS --- */}
      <div className="flex flex-wrap items-center gap-4 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
          <Input
            placeholder="Search by name, email, or ID..."
            className="pl-10 bg-[#020617] border-white/10 text-white rounded-xl h-11"
          />
        </div>
        <select className="bg-[#020617] border-white/10 text-slate-400 text-xs font-bold rounded-xl h-11 px-4 uppercase tracking-widest outline-none focus:border-primary transition-colors">
          <option>All Roles</option>
          <option>Students</option>
          <option>Tutors</option>
        </select>
        <Button
          variant="outline"
          className="border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl h-11"
        >
          <Filter className="size-4 mr-2 text-primary" /> Advanced
        </Button>
      </div>

      {/* --- USER TABLE --- */}
      <SpotlightCard className="p-0 border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/5">
                <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                  User
                </th>
                <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                  Role
                </th>
                <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                  Status
                </th>
                <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                  Joined
                </th>
                <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {MOCK_USERS.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-white/[0.01] transition-colors group"
                >
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full bg-gradient-to-br from-primary/20 to-transparent border border-white/10 flex items-center justify-center text-[10px] font-black text-primary">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">
                          {user.name}
                        </p>
                        <p className="text-[10px] text-slate-500 font-medium">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <span
                      className={cn(
                        "text-[9px] font-black px-2 py-0.5 rounded-md border uppercase tracking-tighter",
                        user.role === "TUTOR"
                          ? "border-amber-500/20 text-amber-500 bg-amber-500/5"
                          : "border-blue-500/20 text-blue-500 bg-blue-500/5",
                      )}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-1.5">
                      <div
                        className={cn(
                          "size-1.5 rounded-full shadow-[0_0_8px]",
                          user.status === "Active"
                            ? "bg-emerald-500 shadow-emerald-500/50"
                            : user.status === "Pending"
                              ? "bg-amber-500 shadow-amber-500/50"
                              : "bg-red-500 shadow-red-500/50",
                        )}
                      />
                      <span className="text-xs font-bold text-slate-300">
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-5 text-xs font-bold text-slate-500">
                    {user.joined}
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white"
                        title="Verify User"
                      >
                        <ShieldCheck size={16} />
                      </button>
                      <button
                        className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-red-500"
                        title="Ban User"
                      >
                        <UserX size={16} />
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-primary">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SpotlightCard>

      {/* --- PAGINATION FOOTER --- */}
      <div className="flex items-center justify-between px-2">
        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
          Showing 1-10 of 12,842 users
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="h-8 text-[10px] font-black border-white/5 bg-white/5 text-slate-400"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            className="h-8 text-[10px] font-black border-white/10 bg-white/10 text-white"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
