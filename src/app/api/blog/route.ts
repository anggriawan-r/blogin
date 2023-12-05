import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const uid = req.nextUrl.searchParams.get("uid");
  const page = parseInt(req.nextUrl.searchParams.get("page") as string);

  const POST_PER_PAGE = 12;

  try {
    const posts = await prisma.post.findMany({
      take: POST_PER_PAGE,
      skip: POST_PER_PAGE * (page - 1),
      where: {
        ...(uid && { user: { id: uid } }),
      },
      include: {
        user: true,
      },
    });
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 },
    );
  }
};
