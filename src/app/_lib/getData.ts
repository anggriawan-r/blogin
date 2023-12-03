export async function getData() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/blog`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}
