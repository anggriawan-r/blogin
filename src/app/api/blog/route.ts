import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const take = parseInt(req.nextUrl.searchParams.get("take") as string);

  try {
    const posts = await prisma.post.findMany({
      take: take,
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
