"use client";

import { User } from "@/models/User";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdDelete } from "react-icons/md";

type UpdateForm = { name: string; mobile: string };
type InputLink = { name: string; link: string };

const LINK_OPTIONS = ["Facebook", "LinkedIn", "GitHub", "Portfolio", "Website"];

export default function UpdateForm({ user }: { user: User }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // ✅ warning-free: initial state
  const [linkInputs, setLinkInputs] = useState<InputLink[]>(user?.links || []);

  const { register, handleSubmit } = useForm<UpdateForm>({
    defaultValues: { name: user.name, mobile: user.mobile },
  });

  // Add new link
  const handleAddLink = () =>
    setLinkInputs((prev) => [...prev, { name: "", link: "" }]);

  // Edit link
  const handleChange = (index: number, field: keyof InputLink, value: string) =>
    setLinkInputs((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });

  // Remove link
  const handleRemove = (index: number) =>
    setLinkInputs((prev) => prev.filter((_, i) => i !== index));

  const onSubmit = async (data: UpdateForm) => {
    setLoading(true);
    try {
      const res = await fetch("/api/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, ...data, links: linkInputs }),
      });
      if (res.ok) {
        alert("Profile updated ✅");
        router.refresh();
      } else {
        alert("Update failed ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <input className="input" placeholder="Name" {...register("name", { required: true })} />
      <input className="input" placeholder="Mobile" {...register("mobile")} />

      {linkInputs.map((item, index) => (
        <div key={index} className="grid grid-cols-2 gap-2 items-center relative">
          <select
            value={item.name} // controlled input
            onChange={(e) => handleChange(index, "name", e.target.value)}
          >
            <option value="">Select</option>
            {LINK_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>

          <input
            placeholder="https://example.com"
            value={item.link} // controlled input
            onChange={(e) => handleChange(index, "link", e.target.value)}
          />

          <span
            onClick={() => handleRemove(index)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/50 text-red-300 hover:bg-red-500 hover:text-white transition cursor-pointer"
          >
            <MdDelete/>
          </span>
        </div>
      ))}

      <button type="button" onClick={handleAddLink} className="text-indigo-400 text-sm">
        + Add new link
      </button>

      <button disabled={loading} className="w-full bg-indigo-600 py-3 rounded text-white">
        {loading ? "Updating..." : "Update Profile"}
      </button>
    </form>
  );
}
