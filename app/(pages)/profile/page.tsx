"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaUserEdit,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaBriefcase,
  FaUser,
} from "react-icons/fa";

import Loading from "@/app/loading";
import Modal from "@/ui/Modal";
import UpdateForm from "@/app/components/UpdateForm";
import AddJobForm from "@/app/components/AddJobForm";

import { User } from "@/models/User";
import JobTable from "@/app/components/JobTable";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  /* Fetch user */
  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => {
        if (!data.user) {
          router.push("/login");
          return;
        }
        setUser(data.user);
      })
      .finally(() => setLoading(false));
  }, [router]);

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  if (loading) return <Loading />;
  if (!user) return null;

  return (
    <main className="pb-20">
      <section className="mx-auto max-w-7xl space-y-10 px-5">
        {/* ================= Profile Card ================= */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 rounded-2xl border border-slate-700 bg-slate-900/80 backdrop-blur-md p-10 shadow-xl">
          {/* Left */}
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-400">
              <FaUserCircle className="text-5xl" />
            </div>

            <h2 className="text-2xl font-bold text-white">{user.name}</h2>
            <p className="text-slate-400">{user.email}</p>
            <p className="text-slate-400">{user.mobile}</p>

            <div className="my-6 h-px bg-slate-700" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-red-500/90 py-3 text-white hover:bg-red-600 transition"
              >
                <FaSignOutAlt /> Logout
              </button>

              <Modal
                label={
                  <button className="w-full fill-btn flex items-center justify-center gap-2">
                    <FaUserEdit /> Update
                  </button>
                }
              >
                <UpdateForm user={user} />
              </Modal>

              <Modal
                label={
                  <button className="w-full fill-btn flex items-center justify-center gap-2">
                    <FaBriefcase /> Add Job
                  </button>
                }
              >
                <AddJobForm email={user.email} />
              </Modal>
            </div>
          </div>

          {/* Right */}
          <div>
            <h3 className="mb-5 text-xl font-bold text-white">Social Links</h3>

            {user.links?.length ? (
              <div className="grid grid-cols-2 gap-4">
                {user.links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.link}
                    target="_blank"
                    className="flex items-center justify-center gap-2 rounded-lg bg-slate-800 py-3 text-slate-200 hover:bg-indigo-600 hover:text-white transition"
                  >
                    {link.name === "Facebook" && <FaFacebook />}
                    {link.name === "Twitter" && <FaTwitter />}
                    {link.name === "LinkedIn" && <FaLinkedin />}
                    {link.name === "GitHub" && <FaGithub />}
                    {link.name === "Website" && <FaGlobe />}
                    {link.name === "Portfolio" && <FaUser />}
                    {link.name}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-slate-400">No social links added yet.</p>
            )}
          </div>

          <div className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />
        </div>

        {/* ================= Jobs Table ================= */}
        <JobTable author={user.email} />
      </section>
    </main>
  );
}
