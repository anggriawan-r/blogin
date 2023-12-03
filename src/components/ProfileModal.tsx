import { useClickOutsideDropdown } from "@/hooks/useClickOutsideDropdown";
import { AnimatePresence, motion } from "framer-motion";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

export default function ProfileModal({
  showModal,
  setShowModal,
  session,
}: {
  showModal: boolean;
  setShowModal: (T: boolean) => void;
  session: Session;
}) {
  const profileRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutsideDropdown(
    profileRef,
    modalRef,
    () => {
      setShowModal(false);
    },
    showModal,
  );

  const handleProfile = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="relative">
      <div
        className="relative hidden h-10 w-10 cursor-pointer transition hover:scale-110 sm:block"
        onClick={handleProfile}
        ref={profileRef}
      >
        <Image
          src={session?.user?.image as string}
          alt="profile picture"
          fill
          className="absolute rounded-full object-cover"
        />
      </div>
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="absolute -left-3/4 top-16 w-max rounded-lg border border-black/20 bg-white p-1 shadow-lg"
            id="modal"
            ref={modalRef}
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ ease: "easeOut", duration: 0.1 }}
          >
            <ul className="flex flex-col justify-center gap-1 text-left font-semibold text-gray-500">
              <Link href="/profile" onClick={() => setShowModal(false)}>
                <li className="rounded-md px-6 py-4 transition-all hover:bg-gray-200 hover:text-gray-900">
                  My Profile
                </li>
              </Link>
              <Link href="/myblog" onClick={() => setShowModal(false)}>
                <li className="rounded-md px-6 py-4 transition-all hover:bg-gray-200 hover:text-gray-900">
                  My Blog
                </li>
              </Link>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
