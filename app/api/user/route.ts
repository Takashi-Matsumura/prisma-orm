import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req: Request, res: NextResponse) => {
  const { name, email } = await req.json();

  const new_user = await prisma.user.create({
    data: {
      name,
      email,
    },
  });
  return NextResponse.json(new_user);
}

export const GET = async (req: Request, res: NextResponse) => {
    const users = await prisma.user.findMany({
      orderBy: {
        id: "asc",
      },
    });
    return NextResponse.json(users);
}