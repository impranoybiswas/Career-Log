import { FaGithub, FaLinkedin, FaBriefcase } from "react-icons/fa";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
          
          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Track Your <span className="text-indigo-400">Developer Career</span>
              <br />
              In One Smart Place
            </h1>

            <p className="mt-6 text-lg text-slate-300 max-w-xl">
              DevTrackr helps developers manage their portfolio links, social profiles,
              and job applications with clarity and confidence.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-lg bg-indigo-500 px-6 py-3 font-medium hover:bg-indigo-600 transition">
                Get Started
              </button>

              <button className="rounded-lg  transition">
                View Demo
              </button>
            </div>

            <div className="mt-10 flex items-center gap-6 text-slate-400">
              <div className="flex items-center gap-2">
                <FaGithub className="text-xl" />
                GitHub
              </div>
              <div className="flex items-center gap-2">
                <FaLinkedin className="text-xl" />
                LinkedIn
              </div>
              <div className="flex items-center gap-2">
                <FaBriefcase className="text-xl" />
                Job Tracking
              </div>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="relative">
            <div className="rounded-2xl bg-slate-900/80 p-6 shadow-2xl border border-slate-700">
              <p className="text-sm text-slate-400 mb-2">Developer Dashboard</p>

              <div className="space-y-4">
                <div className="rounded-lg bg-slate-800 p-4">
                  <p className="font-medium">Portfolio Links</p>
                  <p className="text-sm text-slate-400">
                    GitHub • LinkedIn • Personal Site
                  </p>
                </div>

                <div className="rounded-lg bg-slate-800 p-4">
                  <p className="font-medium">Job Applications</p>
                  <p className="text-sm text-slate-400">
                    Applied • Interview • Hired
                  </p>
                </div>

                <div className="rounded-lg bg-indigo-500/10 p-4 border border-indigo-500/30">
                  <p className="font-medium text-indigo-400">
                    Career Progress Organized
                  </p>
                </div>
              </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute -top-10 -right-10 h-40 w-40 bg-indigo-500/20 blur-3xl rounded-full" />
          </div>

        </div>
      </div>
    </section>
  );
}
