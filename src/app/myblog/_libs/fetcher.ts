export const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("Failed to fetch data!");
    throw error;
  }

  const data = await res.json();
  return data;
};
