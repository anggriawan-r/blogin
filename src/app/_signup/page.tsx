"use client";

import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";

type InputType = {
  name: string;
  email: string;
  password: string;
  repassword: string;
};

export default function SignUpPage() {
  const { register, handleSubmit } = useForm<InputType>();

  const onSubmit = (data: InputType) => {
    console.log(data);
  };

  return (
    <div className="container flex h-screen w-full items-center justify-center gap-0 px-4 sm:flex-row">
      <div className="flex h-max w-full flex-col items-center justify-center sm:flex-row sm:gap-10">
        <div className="relative hidden sm:block sm:w-[50%] sm:self-stretch">
          <Image
            src="https://images.pexels.com/photos/1544420/pexels-photo-1544420.jpeg"
            alt="Sign Up Cover"
            fill
            className="absolute rounded-lg object-cover"
          />
        </div>

        <div className="flex flex-col items-center justify-center rounded-lg border border-black/10 p-8 shadow-lg">
          <div className="flex flex-col items-center justify-center gap-2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <label htmlFor="name" className="">
                Name
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: true })}
                  placeholder="Your name"
                  className="h-10 w-full rounded-md border-2 border-black/25 px-2 py-4"
                />
              </label>
              <label htmlFor="email" className="">
                Email
                <input
                  type="email"
                  id="email"
                  {...register("email", { required: true })}
                  placeholder="Your email"
                  className="h-10 w-full rounded-md border-2 border-black/25 px-2 py-4"
                />
              </label>
              <label htmlFor="password" className="">
                Password
                <input
                  type="password"
                  id="password"
                  {...register("password", { required: true })}
                  placeholder="Your password"
                  className="h-10 w-full rounded-md border-2 border-black/25 px-2 py-4"
                />
              </label>
              <label htmlFor="repassword" className="">
                Password
                <input
                  type="password"
                  id="repassword"
                  {...register("repassword", { required: true })}
                  placeholder="Re-enter your password"
                  className="h-10 w-full rounded-md border-2 border-black/25 px-2 py-4"
                />
              </label>
              <button
                type="submit"
                className="btn mt-6 bg-gray-900 py-3 text-sm font-semibold"
              >
                Sign Up
              </button>
              <p className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <a href="/login" className="cursor-pointer font-semibold">
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
