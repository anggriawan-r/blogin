import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { slug: string } },
) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenthicated!" }),
      { status: 401 },
    );
  }

  const { slug } = params;

  try {
    await prisma.post.delete({
      where: {
        slug: slug,
      },
    });
    return new NextResponse(JSON.stringify({ message: "Delete success!" }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 },
    );
  }
};
