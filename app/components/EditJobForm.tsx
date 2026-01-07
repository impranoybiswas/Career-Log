"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Job } from "@/models/Job";

type Props = {
  job: Job;
  onSuccess?: () => void;
};

export default function EditJobForm({ job, onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      company: job.company,
      position: job.position,
      location: job.location,
      description: job.description,
      status: job.status,
    },
  });

  const onSubmit = async (data: Job) => {
    const toastId = toast.loading("Updating job...");

    try {
      const res = await fetch("/api/update-job", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, id: job._id }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message);
      }

      toast.success("Job updated successfully", { id: toastId });
      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update job", { id: toastId });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register("company", { required: true })}
        placeholder="Company"
      />

      <input
        {...register("position", { required: true })}
        placeholder="Position"
      />

      <input
        {...register("location", { required: true })}
        placeholder="Location"
      />

      <textarea {...register("description")} placeholder="Description" />

      <select {...register("status")} className="input">
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>

      {Object.values(errors)[0] && (
        <p className="text-sm text-red-400">
          {Object.values(errors)[0]?.message}
        </p>
      )}

      <button
        disabled={isSubmitting}
        className="fill-btn w-full disabled:opacity-60"
      >
        Update Job
      </button>
    </form>
  );
}
