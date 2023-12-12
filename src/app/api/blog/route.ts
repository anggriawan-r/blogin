import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  const POST_PER_PAGE = parseInt(limit || "12");
  const BLOG_PAGE = parseInt(page || "1");

  try {
    const posts = await prisma.post.findMany({
      take: POST_PER_PAGE,
      skip: POST_PER_PAGE * (BLOG_PAGE - 1),
      where: {
        ...(id && { user: { id: id } }),
      },
      include: {
        user: true,
        Category: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 },
    );
  }
};
