"use client";

import { AnimatePresence, motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

export default function Header() {
  const [open, setOpen] = useState<boolean>(false);
  const { data, status } = useSession();

  const handleOpen = (): void => {
    setOpen(!open);
  };

  const variantsNav = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: 50 },
  };

  const variantsBar = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
  };

  function logout(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    signOut();
  }

  return (
    <header className="fixed top-0 z-10 flex h-16 w-full items-center justify-between bg-white/80 px-4 backdrop-blur-lg">
      <Link href="/" className="text-2xl font-bold">
        blogin.
      </Link>
      <nav className="relative flex items-center gap-8">
        <motion.div animate={open ? "open" : "closed"} variants={variantsBar}>
          {!open ? (
            <FaBars onClick={handleOpen} className="h-6 w-6 sm:hidden" />
          ) : (
            <FaXmark onClick={handleOpen} className="h-6 w-6 sm:hidden" />
          )}
        </motion.div>
        <AnimatePresence>
          {open && (
            <motion.div
              className="z-999 absolute right-0 top-[250%] flex min-w-max flex-col items-center justify-center gap-4 rounded-md border border-black/10 bg-white/95 px-4 py-4 text-gray-900 shadow-lg backdrop-blur-lg"
              initial={{ opacity: 0, x: 50 }}
              animate={"open"}
              exit={"closed"}
              variants={variantsNav}
              transition={{ ease: "easeOut", duration: 0.2 }}
            >
              <Link href="/" className="" onClick={handleOpen}>
                Home
              </Link>
              <Link href="/blog" className="" onClick={handleOpen}>
                Blog
              </Link>
              {status === "unauthenticated" ? (
                <Link
                  href="/login"
                  className="btn bg-gray-900"
                  onClick={handleOpen}
                >
                  Login
                </Link>
              ) : (
                <>
                  <Link
                    href="/write"
                    className=""
                    onClick={() => setOpen(false)}
                  >
                    Write
                  </Link>
                  <button
                    onClick={(e) => logout(e)}
                    className="btn bg-gray-900"
                  >
                    Logout
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <Link href="/" className="hidden font-semibold sm:block">
          Home
        </Link>
        <Link href="/blog" className="hidden font-semibold sm:block">
          Blog
        </Link>
        {status === "unauthenticated" ? (
          <Link href="/login" className="btn hidden bg-gray-900 sm:block">
            Login
          </Link>
        ) : (
          <>
            <Link
              href="/write"
              className="hidden font-semibold sm:block"
              onClick={() => setOpen(false)}
            >
              Write
            </Link>
            <button
              onClick={(e) => logout(e)}
              className="btn hidden bg-gray-900 sm:block"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
