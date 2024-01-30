import prisma from "@/utils/connect";
import { Fetcher } from "swr";

type category = {
  id: string;
  slug: string;
  title: string;
  img: string | null;
};

export const getCategories: Fetcher<category[], string> = async (
  url: string,
) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch data!");
  }

  const data = await res.json();
  return data;
};
