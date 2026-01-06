"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type RegisterForm = {
  name: string;
  email: string;
  mobile: string;
  gender: string;
  password: string;
};

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      router.push("/profile");
      router.refresh(); // Miiddleware Update
    } else {
      alert("Registration failed ❌");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900/80 backdrop-blur-md p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-white text-center">
          Create Account
        </h2>
        <p className="mt-2 text-center text-slate-400">
          Start building your developer profile
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <input
            placeholder="Full Name"
            {...register("name", { required: "Name is required" })}
          />

          <input
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email format",
              },
            })}
          />

          <input
            placeholder="Mobile (BD)"
            {...register("mobile", {
              required: "Mobile number required",
              pattern: {
                value: /^(?:\+88|01)?[3-9]\d{8}$/,
                message: "Invalid Bangladeshi number",
              },
            })}
          />

          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-1">Gender :</label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                value="male"
                {...register("gender", { required: "Gender required" })}
              />
              Male
            </label>

            <label className="flex items-center gap-1">
              <input
                type="radio"
                value="female"
                {...register("gender", { required: "Gender required" })}
              />
              Female
            </label>

            <label className="flex items-center gap-1">
              <input
                type="radio"
                value="other"
                {...register("gender", { required: "Gender required" })}
              />
              Other
            </label>
          </div>

          {errors.gender && (
            <p className="text-sm text-red-400 mt-1">{errors.gender.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password required" })}
          />

          {Object.values(errors)[0] && (
            <p className="text-sm text-red-400">
              {Object.values(errors)[0]?.message}
            </p>
          )}

          <button className="fill-btn w-full">
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
        <div>
          <p className="mt-4 text-center text-slate-400">
            Already have an account{" "}
            <Link href="/login" className="text-indigo-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
