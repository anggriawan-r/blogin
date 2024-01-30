import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json(
      { message: "Not Authenticated!" },
      { status: 401 },
    );
  }

  try {
    const body = await req.json();
    const post = await prisma.post.create({
      data: {
        ...body,
        userEmail: session?.user?.email,
      },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 },
    );
  }
};
