"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/profile");
      router.refresh(); // Miiddleware Update
    } else {
      alert("Login failed ❌");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-slate-950">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900/80 p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-white text-center">Welcome Back</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <input
            className="w-full p-3 rounded bg-slate-800 text-white border border-slate-600"
            type="email"
            placeholder="Email address"
            {...register("email", { required: "Email is required" })}
          />
          <div className="relative">
            <input
              className="w-full p-3 rounded bg-slate-800 text-white border border-slate-600"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded transition">
            {loading ? "Logging in..." : "Login"}
          </button>
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </form>
        <div>
          <p className="mt-4 text-center text-slate-400">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-indigo-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}