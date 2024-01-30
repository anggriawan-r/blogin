import prisma from "@/utils/connect";

export const getCategories = async (limit?: number) => {
  const res = await prisma.category.findMany({
    take: limit,
  });
  return res;
};
