"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/models/User";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import Loading from "@/app/loading";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        } else {
          router.push("/login");
        }
      })
      .finally(() => setLoading(false));
  }, [router]);

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  /* Loading State */
  if (loading) {
    return <Loading />;
  }

  if (!user) return null;

  return (
    <main className=" flex items-center justify-center  px-4">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900/80 backdrop-blur-md p-10 shadow-xl text-center">
        {/* Avatar */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-400">
          <FaUserCircle className="text-5xl" />
        </div>

        {/* Info */}
        <h2 className="text-2xl font-bold text-white">{user.name}</h2>
        <p className="mt-1 text-slate-400">{user.email}</p>

        {/* Divider */}
        <div className="my-6 h-px w-full bg-slate-700" />

        {/* Actions */}
        <button
          onClick={logout}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500/90 py-3 font-medium text-white hover:bg-red-600 transition"
        >
          <FaSignOutAlt />
          Logout
        </button>

        {/* Glow */}
        <div className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />
      </div>
    </main>
  );
}
