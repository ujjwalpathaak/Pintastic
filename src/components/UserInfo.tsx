import Image from "next/image";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useStore from "../store";
import { userInfo } from "../types";

function UserInfo() {
  const router = useRouter();
  const { data: session } = useSession();

  let { user, isLoggedIn } = useStore();
  const onLogoutClick = () => {
    router.push("/homepage");
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
        src={user?.userImage as string}
        alt="userImage"
        width={100}
        height={100}
        className="rounded-full"
      />

      <h2
        className="text-[30px]
        font-semibold">
        {user?.userName}
      </h2>
      <h2 className="text-gray-400">{user?.email}</h2>
      {!isLoggedIn ? (
        <></>
      ) : (
        <div className="flex gap-4 mt-2">
          <button
            className="text-quadnary font-bold rounded-full
         text-lg hover:bg-secondary p-2 px-4 h-fit"
            onClick={() => onShareLink()}>
            Share
          </button>
          {/* {user?.email == user2?.email ( */}
          <button
            className="text-quadnary font-bold rounded-full
           text-lg hover:bg-secondary p-2 px-4 h-fit"
            onClick={() => onLogoutClick()}>
            Logout
          </button>
          {/* ) : null} */}
        </div>
      )}
    </div>
  );
}

export default UserInfo;
