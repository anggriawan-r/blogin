import BlogList from "@/components/BlogList";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <Hero />
      <BlogList />
    </main>
  );
}
