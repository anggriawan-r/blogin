"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

export default function ProfilePage() {
  const { status } = useSession();

  if (status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <div>
      <h1></h1>
    </div>
  );
}
