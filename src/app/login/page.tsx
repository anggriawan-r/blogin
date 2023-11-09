"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { BsGoogle, BsGithub, BsFacebook } from "react-icons/bs";

export default function LoginPage() {
  const { data, status } = useSession();
  const router = useRouter();

  function login(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    signIn("google");
  }

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className="container flex h-screen w-full items-center justify-center gap-0 px-4 sm:flex-row">
      <div className="flex h-max w-full flex-col items-center justify-center sm:flex-row sm:gap-10">
        <div className="relative hidden sm:block sm:w-[50%] sm:self-stretch">
          <Image
            src="https://images.pexels.com/photos/18895009/pexels-photo-18895009/free-photo-of-autumnal.jpeg"
            alt="Login cover"
            fill
            className="absolute rounded-lg object-cover"
          />
        </div>

        <div className="flex flex-col items-center justify-center rounded-lg border border-black/10 p-8 shadow-lg">
          <div className="flex flex-col items-center justify-center gap-2">
            <button
              className="btn flex w-full items-center gap-4 bg-gray-900 text-sm"
              onClick={(e) => login(e)}
            >
              <BsGoogle />
              Sign in with Google
            </button>
            <button className="btn flex w-full items-center gap-4 bg-gray-900 text-sm">
              <BsGithub /> Sign in with Github
            </button>
            <button className="btn flex w-full items-center gap-4 bg-gray-900 text-sm">
              <BsFacebook /> Sign in with Facebook
            </button>

            <div className="relative flex w-full flex-col items-center justify-center">
              <p className="softTextColor my-4 bg-white px-2">
                or use your account
              </p>
              <hr className="absolute top-7 -z-10 w-full border-[0.1px] border-black/10" />
            </div>

            <form action="" className="flex flex-col">
              <label htmlFor="email" className="mb-1 block">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                required
                placeholder="Your email"
                className="h-10 w-full rounded-md border-2 border-black/25 px-2 py-4"
              />
              <label htmlFor="password" className="mb-1 mt-4 block">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="Your password"
                className="h-10 w-full rounded-md border-2 border-black/25 px-2 py-4"
              />
              <button
                type="submit"
                className="btn mt-6 bg-gray-900 py-3 text-sm font-semibold"
              >
                Login
              </button>
              <p className="mt-4 text-center text-sm">
                Don’t have an account?{" "}
                <a href="/signup" className="cursor-pointer font-semibold">
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
