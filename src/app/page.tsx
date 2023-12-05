import RecentBlogs from "@/components/RecentBlogs";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <Hero />
      <RecentBlogs />
    </main>
  );
}
