"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { HiSearch } from "react-icons/hi";
import { useRouter } from "next/navigation";
import app from "../database/firebaseConfig";
import { AiFillHeart } from "react-icons/ai";

import useStore from "../store";

function Header() {
  const { data: session } = useSession();
  const { user, isLoggedIn, login, logout } = useStore();
  const router = useRouter();
  const db = getFirestore(app);

  useEffect(() => {
    const saveUserInfo = async () => {
      if (session?.user) {
        const userRef = doc(db, "user", session.user.email!);

        const userSnapshot = await getDoc(userRef);
        if (!userSnapshot.exists()) {
          await setDoc(userRef, {
            userName: session.user.name,
            email: session.user.email,
            userImage: session.user.image,
            favPins: [],
          });
        }

        login(
          session?.user?.email as string,
          session?.user?.name as string,
          session?.user?.image as string,
          userSnapshot?.data()?.favPins as string[]
        );
      }
    };

    saveUserInfo();
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
    <div className="flex w-full justify-around lg:justify-between items-center h-[10vh] bg-primary">
      <div className="w-1/3 flex justify-center lg:pl-12">
        <Image
          src="/Logo.png"
          alt="logo"
          width={250}
          height={90}
          onClick={() => router.push("/homepage")}
          className="lg:p-2
         cursor-pointer"
        />
      </div>
      <div className="w-[15%] lg:w-1/3 flex justify-center">
        <div
          className="bg-[#e9e9e9] p-2 px-6
         gap-3 items-center rounded-full w-3/4 hidden md:flex">
          <HiSearch
            className="text-4xl lg:text-2xl
        text-gray-500"
          />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none w-full text-base hidden lg:block"
          />
        </div>
        <HiSearch
          className="text-[25px] 
        text-gray-500 md:hidden"
        />
      </div>
      <div className="lg:w-1/3 w-fit max-w-full flex justify-start lg:justify-center items-center lg:pr-12">
        <button
          className="text-quadnary font-bold hidden lg:block rounded-full
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
            width={45}
            height={45}
            className="hover:bg-secondary
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
