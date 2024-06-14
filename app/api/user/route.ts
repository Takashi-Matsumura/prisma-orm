import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req: Request, res: NextResponse) => {
    const user = await prisma.user.create({
      data: {
        name: "Alice",
        email: "alice@prisma.io",
      },
    });
    console.log(user);
    return NextResponse.json(user);
}

export const GET = async (req: Request, res: NextResponse) => {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
}