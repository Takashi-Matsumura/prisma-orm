import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req: Request, res: NextResponse) => {
    //const { name, email } = await req.json();

    const user = await prisma.user.create({
      data: {
        name: "Alice",
        email: "alice@prisma.io",
      },
    });
    return NextResponse.json(user);
}