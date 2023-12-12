"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { BsGoogle, BsGithub, BsFacebook } from "react-icons/bs";

const authIcon = (provider: string) => {
  switch (provider) {
    case "google":
      return <BsGoogle />;
    case "github":
      return <BsGithub />;
    case "facebook":
      return <BsFacebook />;
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
      onClick={() => signIn(provider, { ...(callbackUrl && { callbackUrl }) })}
      className="btn flex w-full items-center gap-4 bg-gray-900 py-4 text-sm transition hover:scale-105"
    >
      {authIcon(provider)}
      Login with {provider}
    </button>
  );
}
