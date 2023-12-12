"use client";

import { Loader2, PenBox } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiLogIn } from "react-icons/fi";
import { Merriweather } from "next/font/google";
import hero from "/public/heroImage.webp";

const playfairDisplay = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

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
          Login to Write
          <FiLogIn className="opacity-70" />
        </>
      );
    } else {
      return (
        <>
          Start Writing
          <PenBox className="opacity-70" width={16} height={16} />
        </>
      );
    }
  }

  return (
    <section className="container">
      <figure className="absolute left-0 top-0 -z-10 h-[80svh] w-screen sm:h-[70svh]">
        <Image
          src={hero}
          alt="Hero Image"
          fill
          className="absolute object-cover"
        />
        <div className="h-full w-full bg-white/80 backdrop-opacity-100"></div>
      </figure>

      <div className="flex h-[80svh] w-full flex-col items-center justify-center gap-8 px-4 pt-16 sm:h-[70svh] sm:w-3/4 md:w-1/2">
        <div className="flex flex-col gap-5">
          <h1 className={`${playfairDisplay.className} text-5xl sm:text-6xl`}>
            Share & find ideas.
          </h1>
          <h2 className="text-base font-medium sm:text-xl">
            Explore new ideas, perspectives, and experiences from anyone on any
            topic.
          </h2>
        </div>

        <div className="flex flex-col gap-2 self-start sm:flex-row sm:gap-4">
          {
            <Link
              href={status === "unauthenticated" ? "/login" : "/write"}
              className="flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-3 text-sm font-medium text-white"
            >
              {writeButton()}
            </Link>
          }

          <Link
            href="/blog"
            scroll
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-900 bg-white px-4 py-3 text-sm font-medium text-gray-900"
          >
            Explore Blog
          </Link>
        </div>
      </div>
      <hr className="absolute left-0 h-[2px] w-screen bg-black" />
    </section>
  );
}
