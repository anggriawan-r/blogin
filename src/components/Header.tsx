"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

export default function Header() {
  const [open, setOpen] = useState<boolean>(false);

  const auth: boolean = false;

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

  return (
    <header className="fixed top-0 z-10 flex h-16 w-full items-center justify-between bg-white/80 px-4 backdrop-blur-lg">
      <h1 className="text-2xl font-bold">blogin.</h1>
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
              className="borderBlack softTextColor absolute right-0 top-[250%] flex min-w-max flex-col items-center justify-center gap-4 rounded-md bg-white/90 px-4 py-4 backdrop-blur-lg"
              initial={{ opacity: 0, x: 50 }}
              animate={"open"}
              exit={"closed"}
              variants={variantsNav}
              transition={{ ease: "easeOut", duration: 0.2 }}
            >
              <Link href="/" className="">
                Home
              </Link>
              <Link href="/blog" className="">
                Blog
              </Link>
              {!auth ? (
                <Link href="/login" className="btn bg-gray-950">
                  Login
                </Link>
              ) : (
                <Link href="/logout" className="btn bg-gray-950">
                  Logout
                </Link>
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
        {!auth ? (
          <Link href="/login" className="btn hidden bg-gray-950 sm:block">
            Login
          </Link>
        ) : (
          <Link href="/logout" className="btn hidden bg-gray-950 sm:block">
            Logout
          </Link>
        )}
      </nav>
    </header>
  );
}
