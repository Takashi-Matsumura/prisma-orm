"use client";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function Home() {
  const handleClick = async () => {
    const response = await fetch("/api/user", {
      method: "POST",
    });
    const user = await response.json();
    console.log(user);
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col h-screen items-center justify-center">
        <h1 className="font-bold text-3xl">prisma-orm</h1>
        <button
          onClick={handleClick}
          className="bg-black text-white border-2 rounded-full px-4 py-2 mt-10 hover:bg-gray-700"
        >
          Click me!
        </button>
      </div>
    </div>
  );
}
