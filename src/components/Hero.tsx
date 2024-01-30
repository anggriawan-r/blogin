"use client";

import { Loader2, PenBox } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiLogIn } from "react-icons/fi";
import { MerriweatherDisplay } from "@/libs/merriweather";
import hero from "/public/heroImage.webp";

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
    <section className="relative flex h-[60svh] min-h-[400px] w-full items-center">
      <div className="flex w-full flex-col items-start gap-8 px-4 sm:w-3/4 sm:px-6 md:w-1/2 md:px-12">
        <div className="flex flex-col gap-5">
          <h1
            className={`${MerriweatherDisplay.className} text-5xl sm:text-6xl`}
          >
            Share & find ideas.
          </h1>
          <h2 className="text-base font-medium sm:text-xl">
            Explore new ideas, perspectives, and experiences from anyone on any
            topic.
          </h2>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
          {
            <Link
              href={status === "unauthenticated" ? "/login" : "/write"}
              className="flex items-center justify-center gap-2 rounded-lg bg-gray-800 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-900"
            >
              {writeButton()}
            </Link>
          }

          <Link
            href="/blog"
            scroll
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-900 bg-white px-4 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-900 hover:text-white"
          >
            Explore Blog
          </Link>
        </div>
      </div>

      <div className="absolute inset-x-0 top-0 -z-20 h-[60svh] min-h-[400px] w-full">
        <Image
          src={hero}
          alt="Hero Image"
          fill
          className="absolute object-cover"
        />
      </div>
      <div className="absolute inset-x-0 top-0 -z-10 h-[60svh] min-h-[400px] w-full bg-white/80 backdrop-opacity-100"></div>
      <hr className="inset-x-0-0 absolute bottom-0 h-[2px] w-full bg-black" />
    </section>
  );
}
