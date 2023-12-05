"use client";

import { Loader2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ProfileModal from "./ProfileModal";
import MobileNavigation from "./MobileNavigation";

export default function Header() {
  const [open, setOpen] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { data: session, status } = useSession();

  const handleOpen = () => {
    setOpen(!open);
  };

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
          onClick={() => signOut()}
          className="btn hidden border border-black/20 bg-white text-gray-900 transition hover:bg-gray-900 hover:text-white sm:block"
        >
          Logout
        </button>
      );
    }
  }

  return (
    <header className="fixed top-0 z-[999] flex h-16 w-full items-center justify-between bg-white/80 px-4 shadow-sm backdrop-blur">
      <Link href="/" className="text-2xl font-bold">
        blogin.
      </Link>
      <nav className="relative flex items-center sm:gap-8">
        {status === "authenticated" && (
          <div className="relative mx-4 h-8 w-8 sm:hidden">
            <Image
              src={session.user?.image as string}
              alt="profile picture"
              fill
              className="absolute rounded-full object-cover"
            />
          </div>
        )}
        <MobileNavigation
          open={open}
          setOpen={setOpen}
          handleOpen={handleOpen}
        />

        <Link
          href="/"
          className="hidden font-semibold text-gray-500 transition-all hover:text-gray-900 sm:block"
        >
          Home
        </Link>
        <Link
          href="/blog"
          className="hidden font-semibold text-gray-500 transition-all hover:text-gray-900 sm:block"
        >
          Blog
        </Link>
        {status === "authenticated" && (
          <>
            <Link
              href="/write"
              className="hidden font-semibold text-gray-500 transition-all hover:text-gray-900 sm:block"
              onClick={() => setOpen(false)}
            >
              Write
            </Link>
            <ProfileModal
              showModal={showModal}
              setShowModal={setShowModal}
              session={session}
            />
          </>
        )}
        <AuthButton />
      </nav>
    </header>
  );
}
