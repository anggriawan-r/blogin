"use client";

import React from "react";
import AuthButton from "./_components/AuthButton";
import { redirect, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import hero from "/public/heroImage.webp";
import { MerriweatherDisplay } from "@/libs/merriweather";
import { providers } from "@/utils/providers";

export default function LoginPage() {
  const { status } = useSession();
  const callbackUrl = useSearchParams().get("callbackUrl");

  if (status === "authenticated") {
    redirect("/");
  }

  return (
    <section className="container mx-auto flex h-[calc(100svh-64px)] w-full items-center justify-center px-4">
      <div className="relative flex h-[60svh] flex-col items-center justify-center rounded-lg border border-black/10 bg-white/80 px-8 shadow-lg sm:h-[70svh] sm:px-32">
        <h1
          className={`${MerriweatherDisplay.className} mb-12 text-2xl text-gray-900`}
        >
          Join Blogin.
        </h1>
        <div className="flex flex-col items-center justify-center gap-4">
          {providers &&
            Object.values(providers).map((provider) => (
              <AuthButton
                key={provider}
                provider={provider}
                callbackUrl={callbackUrl}
              />
            ))}
        </div>
        <Image
          src={hero}
          alt="background"
          fill
          quality={50}
          className="absolute -z-10 object-cover"
        />
      </div>
    </section>
  );
}
