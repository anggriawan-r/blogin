import prisma from "@/utils/connect";
import { deleteImage } from "@/utils/deleteImage";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { slug: string } },
) => {
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
