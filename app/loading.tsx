import { LuLoader } from "react-icons/lu";

export default function Loading() {
  return (
    <main className="flex items-center justify-center px-4">
      
        
        {/* Spinner */}
        <div className="flex h-22 w-22 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-400">
          <LuLoader className="text-4xl animate-spin" />
        </div>

        {/* Glow */}
        <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />
     
    </main>
  );
}
