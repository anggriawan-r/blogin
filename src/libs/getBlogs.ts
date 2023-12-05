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

  const data = await res.json();
  return data;
};
