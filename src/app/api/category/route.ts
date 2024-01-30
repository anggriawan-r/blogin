import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const category = await prisma.category.findMany();
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 },
    );
  }
};
