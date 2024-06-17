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
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/user");
      const users = await res.json();
      setUsers(users);
    };

    fetchUsers();
    setReload(false);
  }, [reload]);

  const handleClick = async () => {
    const res = await fetch("/api/user", {
      method: "POST",
    });
    const add_user = await res.json();
    setReload(true);
  };

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
          <div key={user.id} className="mt-4 flex">
            <p className="px-2">{user.id}</p>
            <p className="px-2">{user.name}</p>
            <p className="px-2">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
