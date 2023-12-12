import Aside from "@/components/Aside";
import BlogList from "@/components/BlogList";
import Hero from "@/components/Hero";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container flex flex-col items-center justify-center">
      <Hero />
      <div className="mt-12 block lg:flex lg:gap-8">
        <div className="flex w-full flex-col items-center lg:w-2/3">
          <BlogList />
          <Link
            href="/blog"
            className="my-12 w-[240px] rounded-lg border border-gray-900 bg-white py-2 text-center font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white"
          >
            Load more
          </Link>
        </div>
        <Aside />
      </div>
    </main>
  );
}
