import Link from "next/link";
import { FiAlertTriangle } from "react-icons/fi";

export default function NotFound() {
  return (
    <main className="flex items-center justify-center px-4">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900/80 backdrop-blur-md p-10 shadow-xl text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-400">
          <FiAlertTriangle className="text-3xl" />
        </div>

        {/* Text */}
        <h1 className="text-6xl font-bold text-white">404</h1>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          Page Not Found
        </h2>

        <p className="mt-4 text-slate-400">
          The page you are looking for does not exist or has been moved. Let’s
          get you back on track.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="rounded-lg transition fill-btn">
            Go Home
          </Link>

          <Link href="/profile" className="rounded-lg transition border-btn">
            Profile
          </Link>
        </div>

        {/* Glow */}
        <div className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />
      </div>
    </main>
  );
}
