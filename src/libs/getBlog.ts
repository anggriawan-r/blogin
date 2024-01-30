export const getBlog = async (slug: string) => {
  const res = await fetch(`/api/blog/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data!");
  }

  return await res.json();
};
