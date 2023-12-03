export async function getBlog(slug: string) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/blog/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}
