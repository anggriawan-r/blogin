"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { BsGoogle, BsGithub, BsFacebook } from "react-icons/bs";

const authIcon = (provider: string) => {
  switch (provider) {
    case "Google":
      return <BsGoogle className="h-full w-full" />;
    case "Github":
      return <BsGithub className="h-full w-full" />;
    case "Facebook":
      return <BsFacebook className="h-full w-full" />;
    default:
      break;
  }
};

export default function AuthButton({
  provider,
  callbackUrl,
}: {
  provider: string;
  callbackUrl: string | undefined | null;
}) {
  return (
    <button
      key={provider}
      onClick={() =>
        signIn(provider.toLowerCase(), { ...(callbackUrl && { callbackUrl }) })
      }
      className="flex w-full items-center justify-start gap-4 rounded-lg border border-black/50 bg-white px-3 py-3 text-sm transition-colors hover:bg-gray-900 hover:text-white sm:justify-between sm:text-base"
    >
      <div className="h-4 w-4 sm:h-5 sm:w-5">{authIcon(provider)}</div>
      Login with {provider}
      <div className="hidden sm:block sm:h-5 sm:w-5"></div>
    </button>
  );
}
