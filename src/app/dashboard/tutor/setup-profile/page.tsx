"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function TutorSetupPage() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    bio: "",
    hourlyRate: 0,
    categoryId: "",
    subjects: "", // We will split this string into an array later
  });

  // Load your 12 categories
  useEffect(() => {
    fetch("http://localhost:8000/categorie")
      .then((res) => res.json())
      .then((res) => setCategories(res.data));
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Saving profile...");
    console.log(formData);

    try {
      const response = await fetch("http://localhost:8000/tutors/setup", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          subjects: formData.subjects.split(",").map((s) => s.trim()), // "React, Node" -> ["React", "Node"]
          categoryId: Number(formData.categoryId),
        }),
      });

      if (response.ok) {
        toast.success("Profile Setup Complete!", { id: toastId });
        window.location.href = "/tutor/dashboard";
      }
    } catch (error) {
      toast.error("Failed to update profile", { id: toastId });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl mt-10">
      <h1 className="text-2xl font-bold mb-6">Setup Your Tutor Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* CATEGORY SELECT */}
        <div>
          <label className="block text-sm font-bold mb-2">
            Primary Category
          </label>
          <select
            required
            className="w-full p-3 border rounded-xl"
            onChange={(e) =>
              setFormData({ ...formData, categoryId: e.target.value })
            }
          >
            <option value="">Select a Category</option>
            {categories.map((cat: any) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">
            Hourly Rate ($)
          </label>
          <input
            type="number"
            className="w-full p-3 border rounded-xl"
            onChange={(e) =>
              setFormData({ ...formData, hourlyRate: Number(e.target.value) })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">Bio</label>
          <textarea
            className="w-full p-3 border rounded-xl"
            rows={4}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-secondary text-white py-4 rounded-xl font-bold"
        >
          Finish Setup
        </button>
      </form>
    </div>
  );
}
