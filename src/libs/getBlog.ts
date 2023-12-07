export const getBlog = async (slug: string) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/blog/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data!");
  }

  return await res.json();
};
