"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditPage() {
  const id = useParams<{ id: string }>().id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/user/${parseInt(id)}`);
      const user = await res.json();
      setName(user.name);
      setEmail(user.email);
    };
    fetchUser();
  }, []);

  const router = useRouter();
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/user/${parseInt(id)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name, email }),
    });
    const user = await res.json();

    router.push("/");
    router.refresh();
  };

  const handleDelete = async () => {
    const res = await fetch(`/api/user/${parseInt(id)}`, {
      method: "DELETE",
    });
    const user = await res.json();

    router.push("/");
    router.refresh();
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col h-screen items-center justify-center">
        <h1 className="font-bold text-3xl mb-10">Edit Page #{id}</h1>
        <form className="border-2 w-2/3 p-5">
          <div className="flex flex-col mb-4">
            <label htmlFor="name" className="mb-2">
              Name
            </label>
            <input
              onChange={(event) => {
                setName(event.target.value);
              }}
              type="text"
              name="name"
              id="name"
              value={name}
              className="border-2 p-2"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="mb-2">
              Email
            </label>
            <input
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              type="email"
              name="email"
              id="email"
              value={email}
              className="border-2 p-2"
            />
            <button
              onClick={handleUpdate}
              type="button"
              className="bg-green-500 text-white py-3 mt-10"
            >
              UPDATE
            </button>
            <button
              onClick={handleDelete}
              type="button"
              className="bg-red-500 text-white py-3 mt-10"
            >
              DELETE
            </button>
          </div>
        </form>
        <Link
          href="/"
          className="border-2 rounded-full px-4 py-2 my-10 hover:bg-gray-700 hover:text-white"
        >
          back to Home
        </Link>
      </div>
    </div>
  );
}
