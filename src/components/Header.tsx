"use client";
//using client side rendering as we are using next-auth and useEffect
//and it is not supported in server side rendering

import Image from "next/image";
import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { HiSearch, HiBell, HiChat } from "react-icons/hi";
import { useRouter } from "next/navigation";
import app from "../database/firebaseConfig";
import { AiFillHeart } from "react-icons/ai";
function Header() {
  const { data: session } = useSession();

  const router = useRouter();
  const db = getFirestore(app);

  useEffect(() => {
    const saveUserInfo = async () => {
      if (session?.user) {
        await setDoc(doc(db, "user", session.user.email!), {
          userName: session.user.name,
          email: session.user.email,
          userImage: session.user.image,
        });
      }
    };

    saveUserInfo();
    // console.log(session?.user);
  }, [session]);

  const onCreateClick = () => {
    if (session) {
      router.push("/homepage/pin-builder");
    } else {
      signIn();
    }
  };
  const onFavClick = () => {
    if (session) {
      router.push("/homepage/favorite");
    } else {
      signIn();
    }
  };

  return (
    <div className="flex justify-between items-center h-[10vh] bg-primary">
      <div className="w-1/3 flex justify-center pl-12">
        <Image
          src="/Logo.png"
          alt="logo"
          width={250}
          height={90}
          onClick={() => router.push("/homepage")}
          className="p-2
         cursor-pointer"
        />
      </div>
      <div className="w-1/3 flex justify-center">
        <div
          className="bg-[#e9e9e9] p-2 px-6
         gap-3 items-center rounded-full w-3/4 hidden md:flex">
          <HiSearch
            className="text-2xl
        text-gray-500"
          />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none w-full text-base"
          />
        </div>
        <HiSearch
          className="text-[25px] 
        text-gray-500 md:hidden"
        />
      </div>
      <div className="w-1/3 flex justify-center items-center pr-12">
        <button
          className="text-quadnary font-bold rounded-full
         text-lg hover:bg-secondary p-2 px-4 h-fit"
          onClick={() => router.push("/homepage")}>
          Home
        </button>
        <button
          className="text-quadnary font-bold rounded-full
         text-lg hover:bg-secondary p-2 px-4 h-fit"
          onClick={() => onCreateClick()}>
          Create
        </button>
        <button
          className="text-quadnary font-bold rounded-full
         text-2xl hover:bg-secondary p-3 mr-1  h-fit"
          onClick={() => onFavClick()}>
          <AiFillHeart />
        </button>
        {session?.user ? (
          <Image
            src={session.user.image!}
            onClick={() => router.push("/homepage/" + session?.user?.email)}
            alt="user-image"
            width={60}
            height={60}
            className="hover:bg-secondary p-1
        rounded-full cursor-pointer"
          />
        ) : (
          <button
            className="text-quadnary font-bold rounded-full
          text-lg hover:bg-secondary p-2 px-4 h-fit"
            onClick={() => signIn()}>
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
