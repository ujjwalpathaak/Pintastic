"use client";
import React from "react";
import { useSession } from "next-auth/react";
import ClientComponent from "./ClientComponent";

const Page = () => {
  const { data: session } = useSession();

  return (
    <>
      <h1 className="mb-4 text-3xl mx-6 font-extrabold text-quadnary md:text-4xl lg:text-5xl">
        Favorites!
      </h1>
      <ClientComponent session={session} />
    </>
  );
};

export default Page;
