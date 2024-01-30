import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const slug = req.nextUrl.searchParams.get("blogSlug");

  try {
    const comments = await prisma.comment.findMany({
      where: {
        postSlug: slug as string,
      },
      include: { user: true },
    });
    return new NextResponse(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 },
    );
  }
};

export const POST = async (req: NextRequest) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }), {
      status: 401,
    });
  }

  try {
    const body = await req.json();
    const comment = await prisma.comment.create({
      data: {
        body: body.formData.comment,
        postSlug: body.blogSlug,
        userEmail: session.user!.email!,
      },
    });

    return new NextResponse(JSON.stringify(comment), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 },
    );
  }
};
