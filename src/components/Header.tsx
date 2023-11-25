"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState<boolean>(false);
  const { data: session, status } = useSession();

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

  function AuthButton() {
    if (status === "loading") {
      return (
        <Link href="/login" className="btn hidden bg-gray-900 sm:block">
          <div className="animate-spin">
            <Loader2 />
          </div>
        </Link>
      );
    } else if (status === "unauthenticated") {
      return (
        <Link href="/login" className="btn hidden bg-gray-900 sm:block">
          Login
        </Link>
      );
    } else {
      return (
        <button
          onClick={(e) => logout(e)}
          className="btn hidden bg-gray-900 sm:block"
        >
          Logout
        </button>
      );
    }
  }

  return (
    <header className="fixed top-0 z-10 flex h-16 w-full items-center justify-between bg-white/80 px-4 backdrop-blur-lg">
      <Link href="/" className="text-2xl font-bold">
        blogin.
      </Link>
      <nav className="relative flex items-center gap-4 sm:gap-8">
        {status === "authenticated" && (
          <div className="relative h-8 w-8 sm:hidden">
            <Image
              src={session?.user?.image as string}
              alt="profile picture"
              fill
              className="rounded-full object-cover"
            />
          </div>
        )}
        <motion.div animate={open ? "open" : "closed"} variants={variantsBar}>
          {!open ? (
            <Menu onClick={handleOpen} className="h-6 w-6 sm:hidden" />
          ) : (
            <X onClick={handleOpen} className="h-6 w-6 sm:hidden" />
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
        {status === "authenticated" && (
          <>
            <Link
              href="/write"
              className="hidden font-semibold sm:block"
              onClick={() => setOpen(false)}
            >
              Write
            </Link>
            <div className="relative hidden h-8 w-8 sm:block">
              <Image
                src={session.user?.image as string}
                alt="profile picture"
                fill
                className="rounded-full object-cover"
              />
            </div>
          </>
        )}
        <AuthButton />
      </nav>
    </header>
  );
}
