export const getBlogs = async (page: number, uid?: string) => {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/blog?uid=${uid || ""}&page=${page}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data!");
  }

  return await res.json();
};
