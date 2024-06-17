"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();
  const handleSubmit = async () => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });
    const data = await response.json();

    router.push("/");
    router.refresh();
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col h-screen items-center justify-center">
        <h1 className="font-bold text-3xl mb-10">User Page</h1>
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
              className="border-2 p-2"
            />
            <button
              onClick={handleSubmit}
              type="button"
              className="bg-blue-500 text-white py-3 mt-10"
            >
              Submit
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
