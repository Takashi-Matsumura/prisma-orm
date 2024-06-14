"use client";

import { PrismaClient } from "@prisma/client";
import { useEffect, useState } from "react";

const prisma = new PrismaClient();

type User = {
  id: number;
  name: string;
  email: string;
};

export default function Home() {
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
        <button
          onClick={handleClick}
          className="bg-black text-white border-2 rounded-full px-4 py-2 mt-10 hover:bg-gray-700"
        >
          Click me!
        </button>
        <div className="mt-10">
          {users.map((user) => (
            <p key={user.id}>{JSON.stringify(user)}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
