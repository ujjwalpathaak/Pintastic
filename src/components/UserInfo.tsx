"use client";
import Image from "next/image";
import React from "react";
import { signOut } from "next-auth/react";
import useStore from "../store";
import Link from "next/link";

function UserInfo() {
  let { user, GuestUser, isLoggedIn } = useStore();

  const onLogoutClick = () => {
    signOut();
  };

  const onShareLink = () => {
    const currentURL = window.location.href;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(currentURL)
        .then(() => alert("URL copied to clipboard!"))
        .catch((err) => {
          console.error("Error copying to clipboard:", err);
        });
    }
  };
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
          <button
            className="text-quadnary font-bold rounded-full
         text-lg hover:bg-secondary p-2 px-4 h-fit"
            onClick={() => onShareLink()}
          >
            Share
          </button>
          <Link
            href="/homepage"
            className="text-quadnary font-bold rounded-full text-lg hover:bg-secondary p-2 px-4 h-fit"
            onClick={() => onLogoutClick()}
          >
            Logout
          </Link>
        </div>
      )}
    </div>
  );
}

export default UserInfo;
