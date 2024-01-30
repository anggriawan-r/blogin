import { Loader2 } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="-z-10 -mt-16 flex h-screen w-screen items-center justify-center bg-white">
      <div className="animate-spin">
        <Loader2 />
      </div>
    </div>
  );
}
