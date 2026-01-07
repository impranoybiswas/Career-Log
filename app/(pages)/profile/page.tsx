"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/models/User";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import Loading from "@/app/loading";
import Modal from "@/ui/Modal";
import UpdateForm from "@/app/components/UpdateForm";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUser = () => fetch("/api/me").then((res) => res.json());

  useEffect(() => {
    fetchUser()
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
    <main>
      <section className="mx-auto max-w-7xl flex flex-col gap-10 px-5">
        {/* Profile Section */}
        <div className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 backdrop-blur-md p-10 shadow-xl text-center">
          {/* Avatar */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-400">
            <FaUserCircle className="text-5xl" />
          </div>
          <Modal label="Edit Profile">
            <UpdateForm user={user} />
          </Modal>

          {/* Info */}
          <h2 className="text-2xl font-bold text-white">{user.name}</h2>
          <p className="mt-1 text-slate-400">{user.email}</p>
          <p className="mt-1 text-slate-400">{user.mobile}</p>

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

        {/* Job Table Section */}
        <div className="relative w-full rounded-2xl border border-slate-700 bg-slate-900/80 backdrop-blur-md shadow-xl text-center flex-1 overflow-x-auto">
          <table width="100%">
            <thead>
              <tr>
                <th>Apply Date</th>
                <th>Company</th>
                <th>Position</th>
                <th>Location</th>
                <th>Description</th>
                <th className="border-r-0">Status</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <tr key={item}>
                  <td>dfvdjhvfghngfhgfhgfhgfhg</td>
                  <td>fdgfdgfdgfhgfhgfhgfhfghgf</td>
                  <td>fdgfdgfdgdfhgfhgfhfgh</td>
                  <td>dfgfdgdf</td>
                  <td>fdgfdgfdg vfisgvsdyg gfidusg dsifgdsifgu</td>
                  <td>fdgfdgfdgfd</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
