import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { slug: string } },
) => {
  const { slug } = params;

  try {
    const post = await prisma.post.findUnique({
      where: { slug: slug },
    });
    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 },
    );
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { slug: string } },
) => {
  const { slug } = params;

  try {
    const body = await req.json();
    const post = await prisma.post.update({
      where: {
        slug: slug,
      },
      data: {
        ...body,
      },
    });
    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 },
    );
  }
};