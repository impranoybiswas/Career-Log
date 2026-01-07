"use client";

import { ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import { CgClose } from "react-icons/cg";

type ModalProps = {
  label: ReactNode;
  children: ReactNode;
};

export default function Modal({ label, children }: ModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Trigger */}
      <span
        onClick={() => setOpen(true)}
        className="inline-block cursor-pointer"
      >
        {label}
      </span>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-150 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-[92%] max-w-md rounded-2xl border border-slate-700 bg-slate-900/90 backdrop-blur-md px-6 pb-6 pt-14 shadow-2xl fade-in"
            >
              <span
                onClick={() => setOpen(false)}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/50 text-slate-300 hover:bg-red-500 hover:text-white transition cursor-pointer"
              >
                <CgClose size={18} />
              </span>

              {children}

              <div className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
