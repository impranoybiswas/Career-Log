"use client";

import { Job } from "@/models/Job";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";



const STATUS_OPTIONS = ["Applied", "Interview", "Offer", "Rejected"];

export default function AddJobForm({ email }: { email: string }) {
  const { register, handleSubmit, reset } = useForm<Job>();
  const [loading, setLoading] = useState(false);

  // Submit single job → push to jobs array
  const onSubmit = async (data: Job) => {
    setLoading(true);
    try {
      const res = await fetch("/api/add-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({author : email, ...data }),
      });
      if (res.ok) {
        toast.success("Job added ✅");
      } else {
        toast.error("Add job failed ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error ❌");
    }
    setLoading(false);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 items-center"
    >
      <input
        placeholder="Company"
        {...register("company", { required: true })}
      />

      <input
        placeholder="Position"
        {...register("position", { required: true })}
      />

      <input placeholder="Location" {...register("location")} />

      <textarea {...register("description")} placeholder="Description" />

      <select {...register("status")}>
        <option value="">Select Status</option>
        {STATUS_OPTIONS.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <button disabled={loading} type="submit" className="fill-btn w-full">
        {loading ? "Adding..." : "Add Job"}
      </button>
    </form>
  );
}
