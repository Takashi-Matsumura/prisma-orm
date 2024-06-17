"use client";

import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

const prisma = new PrismaClient();

type User = {
  id: number;
  name: string;
  email: string;
};

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/user");
      const users = await res.json();
      setUsers(users);
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col h-screen items-center justify-center">
        <h1 className="font-bold text-3xl">prisma-orm</h1>
        <Link
          href="/user"
          className="bg-black text-white border-2 rounded-full px-4 py-2 my-10 hover:bg-gray-700"
        >
          New user
        </Link>
        {users.map((user) => (
          <div key={user.id} className="mt-4 flex w-3/5">
            <p className="px-2 w-1/5">{user.id}</p>
            <p className="px-2 w-1/5">{user.name}</p>
            <p className="px-2 w-2/5">{user.email}</p>
            <Link
              key={user.id}
              href={`/user/edit/${user.id}`}
              className="w-1/5"
            >
              [edit]
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
