export const getBlogs = async (take: number) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/blog?take=${take}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data!");
  }

  return await res.json();
};
