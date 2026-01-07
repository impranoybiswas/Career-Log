"use client";
import { useEffect, useState } from "react";
import { Job } from "@/models/Job";

export default function JobTable({ author }: { author: string }) {
  const [loading, setLoading] = useState(false); // শুরুতে false রাখাই ভালো যদি ইফেক্টে চেক থাকে
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    // যদি author না থাকে, তবে ডাটা ক্লিয়ার করে ফিরে যাও
    if (!author) {
      setJobs([]);
      return;
    }

    // Race condition এবং অহেতুক রেন্ডার এড়াতে AbortController ব্যবহার করা ভালো
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
          // যদি সার্ভার থেকে কোনো ভুল রেসপন্স আসে (যেমন: 404 বা 500)
          throw new Error(`Server responded with status: ${res.status}`);
        }

        const data = await res.json();
        setJobs(data.jobs || []);
      } catch (err: unknown) {
        // ১. এখানে 'unknown' ব্যবহার করা হয়েছে (TS-এর স্ট্যান্ডার্ড)

        if (err instanceof Error) {
          // ২. এখন TypeScript জানে 'err' একটি Error অবজেক্ট
          if (err.name === "AbortError") {
            // রিকোয়েস্ট ক্যানসেল হলে এটি কোনো সিরিয়াস ইরর নয়
            console.log("Fetch aborted");
          } else {
            // আসল ইরর মেসেজ এখানে পাওয়া যাবে
            console.error("Fetch error:", err.message);
          }
        } else {
          // ৩. যদি ইররটি Error অবজেক্ট না হয়ে অন্য কিছু হয় (খুবই রেয়ার)
          console.error("An unexpected error occurred:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();

    // Cleanup function: যদি কম্পোনেন্ট আনমাউন্ট হয় বা author চেঞ্জ হয়, আগের রিকোয়েস্ট বন্ধ হবে
    return () => controller.abort();
  }, [author]);

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
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6} className="p-10 text-center">
                {/* একটি সুন্দর লোডার দিতে পারেন */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-slate-400">Loading jobs...</p>
                </div>
              </td>
            </tr>
          ) : jobs.length === 0 ? (
            <tr>
              <td
                colSpan={6}
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
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
