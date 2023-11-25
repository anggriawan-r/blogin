"use client";

import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiLogIn } from "react-icons/fi";

export default function Hero() {
  const { status } = useSession();

  function writeButton() {
    if (status === "loading") {
      return (
        <div className="animate-spin">
          <Loader2 />
        </div>
      );
    } else if (status === "unauthenticated") {
      return (
        <>
          Login untuk menulis
          <FiLogIn className="opacity-70" />
        </>
      );
    } else {
      return (
        <>
          Mulai menulis
          <FiLogIn className="opacity-70" />
        </>
      );
    }
  }

  return (
    <section className="container flex h-screen items-center justify-center px-4">
      <div className="flex h-[75vh] w-full flex-col gap-5 sm:flex-row sm:gap-8 md:gap-16">
        <div className="relative h-full w-full bg-white/50 py-4 sm:shrink-[1] sm:grow-[2]">
          <Image
            src="https://images.pexels.com/photos/161275/santorini-travel-holidays-vacation-161275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Hero Image"
            quality={90}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-8 sm:shrink-[2] sm:grow-[1]">
          <div className="flex flex-col gap-5">
            <h1 className="textColor text-center text-3xl font-semibold sm:text-left sm:text-6xl">
              Publikasikan tulisan Anda.
            </h1>
            <h2 className="softTextColor text-center sm:text-left sm:text-xl">
              Blogin bukan hanya platform blogging biasa. Blogin juga merupakan
              wadah untuk komunitas penulis, pembaca, dan penggemar yang suka
              mengeksplorasi ide, perspektif, dan pengalaman baru.
            </h2>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:self-start">
            {
              <Link
                href={status === "unauthenticated" ? "/login" : "/write"}
                className="btn flex items-center justify-center gap-2 rounded-full bg-gray-900 py-3 text-sm text-white transition-all hover:scale-105 sm:self-start sm:px-5 sm:py-3"
              >
                {writeButton()}
              </Link>
            }

            <Link
              href="#blog"
              scroll
              className="btn flex items-center justify-center gap-2 rounded-full border border-gray-950 bg-white py-3 text-sm text-gray-900 transition-all hover:scale-105 sm:self-start sm:px-5 sm:py-3"
            >
              Jelajahi Blog
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
