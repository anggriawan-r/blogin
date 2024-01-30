"use client";

import Link from "next/link";
import React from "react";
import ProfileModal from "./ProfileModal";
import { Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

function AuthButton({ status }: { status: Props["status"] }) {
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
      <Link
        href="/login"
        className="btn hidden bg-gray-900 transition hover:bg-gray-700 sm:block"
      >
        Login
      </Link>
    );
  } else {
    return (
      <button
        onClick={() => signOut()}
        className="btn hidden border border-gray-900 bg-white text-gray-900 transition hover:bg-gray-900 hover:text-white sm:block"
      >
        Logout
      </button>
    );
  }
}

type Props = {
  setOpen: (T: boolean) => void;
  showModal: boolean;
  setShowModal: (T: boolean) => void;
  session: Session | null;
  status: "loading" | "unauthenticated" | "authenticated";
};

export default function DesktopNavigation({
  setOpen,
  showModal,
  setShowModal,
  session,
  status,
}: Props) {
  return (
    <div className="flex items-center gap-6">
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
        <Link
          href="/write"
          className="hidden font-semibold text-gray-500 transition-all hover:text-gray-900 sm:block"
          onClick={() => setOpen(false)}
        >
          Write
        </Link>
      )}
      <ProfileModal
        showModal={showModal}
        setShowModal={setShowModal}
        session={session}
        status={status}
      />

      <AuthButton status={status} />
    </div>
  );
}
