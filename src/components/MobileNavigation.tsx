import { useClickOutsideDropdown } from "@/hooks/useClickOutsideDropdown";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Menu, User2, X } from "lucide-react";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

type propsType = {
  open: boolean;
  setOpen: (T: boolean) => void;
  handleOpen: () => void;
  session: Session | null;
};

export default function MobileNavigation({
  open,
  setOpen,
  handleOpen,
  session,
}: propsType) {
  const { status } = useSession();
  const buttonRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutsideDropdown(modalRef, buttonRef, () => setOpen(false), open);

  function ProfilePicture() {
    switch (status) {
      case "authenticated":
        return (
          <div className="relative mx-4 h-8 w-8 sm:hidden">
            <Image
              src={session?.user?.image as string}
              alt="profile picture"
              fill
              className="absolute rounded-full object-cover"
            />
          </div>
        );
      default:
        return (
          <div className="mx-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 sm:hidden">
            <User2 />
          </div>
        );
    }
  }

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
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -20 },
  };

  const variantsBar = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
  };

  return (
    <div className="relative flex items-center">
      <ProfilePicture />
      <motion.div
        animate={open ? "open" : "closed"}
        variants={variantsBar}
        ref={buttonRef}
        className="relative"
      >
        {!open ? (
          <Menu onClick={handleOpen} className="h-8 w-8 sm:hidden" />
        ) : (
          <X onClick={handleOpen} className="h-8 w-8 sm:hidden" />
        )}
      </motion.div>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={modalRef}
            className="absolute right-0 top-[200%] flex min-w-max flex-col items-center justify-center gap-4 rounded-md border border-black/10 bg-white px-4 py-4 text-gray-900 shadow-lg"
            initial={{ opacity: 0, y: -20 }}
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
