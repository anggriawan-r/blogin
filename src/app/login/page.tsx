"use client";

import Image from "next/image";
import React from "react";
import AuthButton from "./_components/AuthButton";
import { redirect, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function LoginPage() {
  const providers = ["google", "github", "facebook"];
  const { data: session, status } = useSession();
  const callbackUrl = useSearchParams().get("callbackUrl");

  if (session) {
    redirect("/");
  }

  return (
    <div className="container flex h-screen w-full items-center justify-center gap-0 px-4 sm:flex-row">
      <div className="flex h-3/4 w-full flex-col items-center justify-center sm:flex-row sm:gap-10">
        <div className="relative hidden sm:block sm:w-[50%] sm:self-stretch">
          <Image
            src="https://images.pexels.com/photos/18895009/pexels-photo-18895009/free-photo-of-autumnal.jpeg"
            alt="Login cover"
            fill
            className="absolute rounded-lg object-cover"
          />
        </div>

        <div className="flex h-full flex-col items-center justify-center rounded-lg border border-black/10 p-8 shadow-lg">
          <h1 className="mb-12 text-3xl font-bold text-gray-900">Login</h1>
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
        </div>
      </div>
    </div>
  );
}
