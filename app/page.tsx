import { FaGithub, FaLinkedin, FaBriefcase } from "react-icons/fa";

export default function HomePage() {
  return (
    <main className="pt-15 md:pt-20">
      <section className="mx-auto max-w-7xl p-5">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold leading-tight text-center md:text-left">
              Track Your{" "}
              <span className="text-indigo-400 whitespace-nowrap">
                Developer Career
              </span>
              <br />
              In One Smart Place
            </h1>

            <p className="mt-6 text-lg text-slate-300 max-w-xl">
              DevTrackr helps developers manage their portfolio links, social
              profiles, and job applications with clarity and confidence.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="fill-btn">
                Get Started
              </button>

              <button className="border-btn">
                View Demo
              </button>
            </div>

            <div className="mt-10 flex items-center gap-4 md:gap-6 text-slate-400 text-sm md:text-base">
              <div className="flex items-center gap-2 ">
                <FaGithub className="md:text-xl" />
                GitHub
              </div>
              <div className="flex items-center gap-2">
                <FaLinkedin className="md:text-xl" />
                LinkedIn
              </div>
              <div className="flex items-center gap-2">
                <FaBriefcase className="md:text-xl" />
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
      </section>
    </main>
  );
}
