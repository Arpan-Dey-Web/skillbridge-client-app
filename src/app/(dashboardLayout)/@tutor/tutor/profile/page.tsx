"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react"; // Install lucide-react if you haven't
import { authClient } from "@/lib/auth-client";

import { useRouter } from "next/navigation";

export default function TutorSetupPage() {
  const { data: session, isPending, error } = authClient.useSession();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    bio: "",
    hourlyRate: 0,
    categoryId: "",
  });
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/categories`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => setCategories(res.data));
  }, []);

  if (isPending)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading Session...
      </div>
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) {
      return toast.error("You must be logged in to create a profile");
    }
    if (!formData.categoryId) {
      return toast.error("Please select a category");
    }

    setLoading(true);
    const toastId = toast.loading("Creating your profile...");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/tutor/profile`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            ...formData,
            userId: session?.user?.id,
          }),
        },
      );

      if (response.ok) {
        toast.success("Profile Setup Complete!", { id: toastId });
        router.push("/tutor/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <Card className="max-w-3xl mx-auto shadow-2xl border-none rounded-3xl overflow-hidden">
        <div className="h-2 bg-indigo-600 w-full" />
        <CardHeader className="pt-10 pb-6 px-10 text-center">
          <CardTitle className="text-3xl font-extrabold text-slate-900">
            Customize Your Teaching Profile
          </CardTitle>
          <CardDescription className="text-lg">
            Tell us about your expertise and set your rate.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-10 pb-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* NO DROPDOWN - INTERACTIVE CATEGORY GRID */}
            <div className="space-y-4">
              <Label className="text-base font-bold text-slate-800">
                Choose Your Teaching Domain
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories?.map((cat: any) => {
                  const isSelected = formData.categoryId === cat.id;
                  return (
                    <div
                      key={cat.id}
                      onClick={() =>
                        setFormData({ ...formData, categoryId: cat.id })
                      }
                      className={`relative cursor-pointer group p-4 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center justify-center text-center gap-2 ${
                        isSelected
                          ? "border-indigo-600 bg-indigo-50 shadow-md scale-[1.02]"
                          : "border-slate-100 bg-white hover:border-indigo-200 hover:shadow-sm"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-indigo-600 rounded-full p-1">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <span
                        className={`font-semibold ${isSelected ? "text-indigo-700" : "text-slate-600"}`}
                      >
                        {cat.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <hr className="border-slate-100" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="rate" className="font-bold">
                  Hourly Rate ($)
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    $
                  </span>
                  <Input
                    id="rate"
                    type="number"
                    placeholder="25.00"
                    className="pl-8 h-12 rounded-xl bg-slate-50 border-none focus-visible:ring-indigo-600"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hourlyRate: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="font-bold">
                Short Bio
              </Label>
              <Textarea
                id="bio"
                placeholder="I am an expert in my field with 5 years of teaching experience..."
                rows={5}
                className="rounded-2xl bg-slate-50 border-none focus-visible:ring-indigo-600 p-4"
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-14 rounded-2xl text-lg font-bold shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5"
            >
              {loading ? "Creating Profile..." : "Publish Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
