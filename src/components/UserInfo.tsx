"use client";
import Image from "next/image";
import React from "react";
import { signOut } from "next-auth/react";
import useStore from "../store";
import Link from "next/link";

function UserInfo() {
  let { user, GuestUser, isLoggedIn } = useStore();

  return (
    <div className="flex flex-col items-center mb-6">
      <Image
        src={(user?.userImage as string) || (GuestUser?.userImage as string)}
        alt="userImage"
        width={100}
        height={100}
        className="rounded-full"
      />

      <h2
        className="text-[30px]
        font-semibold"
      >
        {user?.userName || GuestUser?.userName}
      </h2>
      <h2 className="text-gray-400">{user?.email || GuestUser?.email}</h2>
      {!isLoggedIn ? (
        <></>
      ) : (
        <div className="flex gap-4 mt-2">
          <Link
            href="/"
            className="text-quadnary font-bold rounded-full text-lg hover:bg-secondary p-2 px-4 h-fit"
            onClick={() => signOut({ callbackUrl: "/", redirect: true })}
          >
            Logout
          </Link>
        </div>
      )}
    </div>
  );
}

export default UserInfo;
