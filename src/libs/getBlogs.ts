export const getBlogs = async (
  limit: number = 12,
  page: number = 1,
  id: string = "",
) => {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/blog?limit=${limit}&page=${page}&id=${id}`,
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
