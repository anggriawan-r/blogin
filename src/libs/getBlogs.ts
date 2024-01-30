// type Props = {
//   id?: string;
//   limit?: number;
//   page?: number;
//   category?: string;
//   sort?: "asc" | "desc";
// };

export const getBlogs = async (url: string) => {
  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data!");
  }

  const data = await res.json();
  return data;
};
