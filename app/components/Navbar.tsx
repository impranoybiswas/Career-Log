"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi";
import { IoHomeOutline } from "react-icons/io5";

const navLink = [
  { name: "Home", url: "/", icon: <IoHomeOutline /> },
  { name: "Profile", url: "/profile", icon: <FaRegUser /> },
  { name: "Friends", url: "/friends", icon: <HiOutlineUsers /> },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 backdrop-blur-md p-2 shadow-xl">
        {navLink.map((link) => {
          const isActive = pathname === link.url;

          return (
            <Link
              key={link.name}
              href={link.url}
              title={link.name}
              className={`group flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300
                ${
                  isActive
                    ? "bg-indigo-500/20 text-indigo-400 ring-2 ring-indigo-500/40"
                    : "text-slate-400 hover:bg-indigo-500/15 hover:text-indigo-400"
                }
              `}
            >
              <span
                className={`text-xl transition-transform duration-300
                  ${isActive ? "scale-110" : "group-hover:scale-110"}
                `}
              >
                {link.icon}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
