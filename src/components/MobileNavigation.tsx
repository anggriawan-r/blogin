import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

type propsType = {
  open: boolean;
  setOpen: (T: boolean) => void;
  handleOpen: () => void;
};

export default function MobileNavigation({
  open,
  setOpen,
  handleOpen,
}: propsType) {
  const { status } = useSession();

  function AuthButton() {
    if (status === "loading") {
      return (
        <Link href="/login" className="btn bg-gray-900" onClick={handleOpen}>
          <div className="animate-spin">
            <Loader2 />
          </div>
        </Link>
      );
    } else if (status === "unauthenticated") {
      return (
        <Link href="/login" className="btn bg-gray-900" onClick={handleOpen}>
          Login
        </Link>
      );
    } else if (status === "authenticated") {
      return (
        <>
          <Link href="/write" className="" onClick={() => setOpen(false)}>
            Write
          </Link>

          <hr className="w-full" />

          <Link href="/profile">My Profile</Link>
          <Link href="/myblog">My Blog</Link>

          <hr className="w-full" />

          <button
            onClick={() => signOut()}
            className="btn border border-black/20 bg-white text-gray-900 hover:bg-gray-900 hover:text-white"
          >
            Logout
          </button>
        </>
      );
    }
  }

  const variantsNav = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: 50 },
  };

  const variantsBar = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
  };

  return (
    <div>
      <motion.div animate={open ? "open" : "closed"} variants={variantsBar}>
        {!open ? (
          <Menu onClick={handleOpen} className="h-8 w-8 sm:hidden" />
        ) : (
          <X onClick={handleOpen} className="h-8 w-8 sm:hidden" />
        )}
      </motion.div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute right-0 top-[200%] flex min-w-max flex-col items-center justify-center gap-4 rounded-md border border-black/10 bg-white px-4 py-4 text-gray-900 shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={"open"}
            exit={"closed"}
            variants={variantsNav}
            transition={{ ease: "easeOut", duration: 0.2 }}
          >
            <Link href="/" onClick={handleOpen}>
              Home
            </Link>
            <Link href="/blog" onClick={handleOpen}>
              Blog
            </Link>
            {AuthButton()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
