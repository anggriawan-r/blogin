import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";

export default function PostPage({ params }: { params: Params }) {
  return (
    <section className="container my-20 flex items-center justify-center">
      {params.slug}
    </section>
  );
}
