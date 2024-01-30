import prisma from "@/utils/connect";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");

  const sortFn = (sort: Prisma.SortOrder | string | null) => {
    if (sort === "asc") return "asc";

    if (sort === "desc") return "desc";

    return "desc";
  };

  const POST_PER_PAGE = parseInt(limit || "12");
  const BLOG_PAGE = parseInt(page || "1");
  const SORT_PAGE = sortFn(sort);

  try {
    const posts = await prisma.post.findMany({
      take: POST_PER_PAGE,
      skip: POST_PER_PAGE * (BLOG_PAGE - 1),
      where: {
        ...(id && { user: { id: id } }),
        ...(category && { Category: { slug: category } }),
      },
      include: {
        user: true,
        Category: true,
      },
      orderBy: [
        {
          createdAt: SORT_PAGE,
        },
      ],
    });
    const count = await prisma.post.count({
      where: {
        ...(id && { user: { id: id } }),
        ...(category && { Category: { slug: category } }),
      },
    });
    return NextResponse.json({ posts, count }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!", error: error },
      { status: 500 },
    );
  }
};
