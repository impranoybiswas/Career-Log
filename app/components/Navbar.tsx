import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi";
import { IoHomeOutline } from "react-icons/io5";

const navLink = [
  { name: "Home", url: "/", icon: <IoHomeOutline /> },
  { name: "Profile", url: "/profile", icon: <FaRegUser /> },
  { name: "Friends", url: "/friends", icon: <HiOutlineUsers /> },
];
export default function Navbar() {
  return (
    <nav className="fixed bottom-15 left-1/2 -translate-x-1/2  z-100 flex items-center gap-2 py-2 px-3 bg-amber-200 rounded-full w-fit">
      {navLink.map((link) => (
        <Link
          key={link.name}
          href={link.url}
          className="flex items-center justify-center gap-2 size-10 bg-green-200 rounded-full "
        >
          {link.icon}
        </Link>
      ))}
    </nav>
  );
}
