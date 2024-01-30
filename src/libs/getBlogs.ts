type Props = {
  id?: string;
  limit?: number;
  page?: number;
  category?: string;
  sort?: "asc" | "desc";
};

export const getBlogs = async ({ id, limit, page, category, sort }: Props) => {
  const params = new URLSearchParams();

  if (id) params.append("id", id);
  if (limit) params.append("limit", limit.toString());
  if (page) params.append("page", page.toString());
  if (category) params.append("category", category.toString());
  if (sort) params.append("sort", sort.toString());

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/blog?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data!");
  }

  const data = await res.json();
  return data;
};
