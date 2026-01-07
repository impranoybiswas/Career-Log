"use client";
import { useEffect, useState } from "react";
import { Job } from "@/models/Job";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "@/ui/Modal";
import toast from "react-hot-toast";
import EditJobForm from "./EditJobForm";
import { useRouter } from "next/navigation";

export default function JobTable({ author }: { author: string }) {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!author) {
      setJobs([]);
      return;
    }

    // Race condition
    const controller = new AbortController();

    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/get-jobs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ author }),
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`Server responded with status: ${res.status}`);
        }

        const data = await res.json();
        setJobs(data.jobs || []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          if (err.name === "AbortError") {
            toast.error("Fetch aborted");
          } else {
            console.error("Fetch error:", err.message);
          }
        } else {
          console.error("An unexpected error occurred:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();

    return () => controller.abort();
  }, [author]);

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting job...");

    const previousJobs = jobs;
    setJobs((prev) => prev.filter((job) => job._id?.toString() !== id));

    try {
      const res = await fetch("/api/delete-job", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message);
      }

      toast.success("Job deleted successfully", { id: toastId });
    } catch (error) {
      setJobs(previousJobs);
      toast.error("Could not delete job. Please try again.", {
        id: toastId,
      });
      console.error(error);
    }
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-700 bg-slate-900/80 backdrop-blur-md shadow-xl">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-800 text-slate-300">
          <tr>
            <th className="p-4">Date</th>
            <th>Company</th>
            <th>Position</th>
            <th>Location</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7} className="p-10 text-center">
                {/* Loader */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-slate-400">Loading jobs...</p>
                </div>
              </td>
            </tr>
          ) : jobs.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="p-10 text-center text-slate-400 italic"
              >
                No jobs added yet.
              </td>
            </tr>
          ) : (
            jobs.map((job) => (
              <tr
                key={job._id?.toString()}
                className="border-t border-slate-700 hover:bg-slate-800/40 transition group"
              >
                <td className="p-4 text-slate-400">
                  {job.createdAt
                    ? new Date(job.createdAt).toLocaleDateString()
                    : "-"}
                </td>
                <td className="font-medium text-slate-200">{job.company}</td>
                <td className="text-indigo-400">{job.position}</td>
                <td className="text-slate-400">{job.location}</td>
                <td
                  className="max-w-xs truncate text-slate-500"
                  title={job.description}
                >
                  {job.description}
                </td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      job.status === "Applied"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-yellow-500/10 text-yellow-500"
                    }`}
                  >
                    {job.status}
                  </span>
                </td>
                <td>
                  <div className="flex items-center justify-center gap-2">
                    <Modal
                      label={
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/70 text-slate-300 hover:bg-blue-500 hover:text-white transition cursor-pointer">
                          <FaEdit />
                        </span>
                      }
                    >
                      <EditJobForm
                        job={job}
                        onSuccess={() => {
                          // simple refresh strategy
                          router.refresh();
                        }}
                      />
                    </Modal>
                    <Modal
                      label={
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/70 text-slate-300 hover:bg-red-500 hover:text-white transition cursor-pointer">
                          <FaTrash />
                        </span>
                      }
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-slate-200">
                          Delete Job
                        </h3>
                        <p className="text-slate-400">
                          Are you sure you want to delete this job?
                        </p>
                        <div className="flex items-center justify-end gap-2 mt-4">
                          <button
                            onClick={() =>
                              handleDelete(job._id?.toString() || "")
                            }
                            className="flex items-center justify-center gap-2 rounded-lg bg-red-500/90 py-3 px-6 text-white hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                          <button className="border-btn">Cancel</button>
                        </div>
                      </div>
                    </Modal>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
