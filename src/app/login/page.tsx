"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { BsGoogle, BsGithub, BsFacebook } from "react-icons/bs";

type InputType = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { status } = useSession();

  if (status === "authenticated") {
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
            <button
              className="btn flex w-full items-center gap-4 bg-gray-900 py-4 text-sm transition hover:scale-110"
              onClick={() => signIn("google")}
            >
              <BsGoogle />
              Login with Google
            </button>
            <button
              className="btn flex w-full items-center gap-4 bg-gray-900 py-4 text-sm transition hover:scale-110"
              onClick={() => signIn("github")}
            >
              <BsGithub /> Login with Github
            </button>
            <button
              className="btn flex w-full items-center gap-4 bg-gray-900 py-4 text-sm transition hover:scale-110"
              onClick={() => signIn("facebook")}
            >
              <BsFacebook /> Login with Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
