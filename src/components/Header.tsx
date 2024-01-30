"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import MobileNavigation from "./MobileNavigation";
import DesktopNavigation from "./DesktopNavigation";

export default function Header() {
  const [open, setOpen] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { data: session, status } = useSession();

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <header className="sticky inset-x-0 top-0 z-40 flex h-16 w-full items-center justify-between bg-white/80 px-4 shadow-sm backdrop-blur">
        <Link href="/" className="text-2xl font-bold">
          blogin.
        </Link>
        <nav className="">
          <MobileNavigation
            open={open}
            setOpen={setOpen}
            handleOpen={handleOpen}
            session={session}
          />

          <DesktopNavigation
            status={status}
            session={session}
            setOpen={setOpen}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </nav>
      </header>
    </>
  );
}
