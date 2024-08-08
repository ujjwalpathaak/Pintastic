"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { HiSearch } from "react-icons/hi";
import { useRouter } from "next/navigation";
import app from "../database/firebaseConfig";
import { AiFillHeart } from "react-icons/ai";
import { usePathname } from "next/navigation";
import useStore from "../store";
import Link from "next/link";
import clsx from "clsx";

const options = [
  { value: "cars", label: "Cars" },
  { value: "anime", label: "Anime" },
  { value: "games", label: "Games" },
  { value: "travel", label: "Travel" },
  { value: "food", label: "Food" },
  { value: "quotes", label: "Quotes" },
  { value: "movies", label: "Movies" },
  { value: "technology", label: "Technology" },
  { value: "nature", label: "Nature" },
  { value: "animals", label: "Animals" },
];

function Header() {
  const { data: session } = useSession();
  const { GuestUser, login } = useStore();
  const router = useRouter();
  const pathname = usePathname();
  const db = getFirestore(app);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const handleSearchChange = (event: { target: { value: any } }) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value) {
      const filtered = options.filter((option) =>
        option.label.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered.slice(0, 5)); // Show only the first 5 results
    } else {
      setFilteredOptions([]);
    }
  };

  const handleSearch = () => {
    router.push(`/homepage/search?genre=${searchTerm}`);
    setSearchTerm("");
    setFilteredOptions([]);
  };

  const handleOptionClick = (option: { value: any; label?: string }) => {
    setSearchTerm(option.value);
    setFilteredOptions([]);
  };

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

  return (
    <div className="flex w-full justify-around lg:justify-between items-center h-[10vh] bg-primary">
      <div className="w-1/3 flex justify-center lg:pl-12">
        <Image
          src="/Logo.png"
          priority
          alt="logo"
          width={250}
          height={90}
          onClick={() => router.push("/homepage")}
          className="lg:p-2 cursor-pointer"
        />
      </div>
      <div className="w-[15%] lg:w-1/3 flex justify-center relative">
        <div className="relative bg-[#e9e9e9] p-2 px-6 gap-3 items-center rounded-full w-3/4 hidden md:flex">
          <HiSearch className="text-4xl lg:text-2xl text-gray-500" />
          <input
            type="text"
            placeholder="Type keyword"
            value={searchTerm}
            onChange={handleSearchChange}
            className="bg-transparent outline-none w-full text-base hidden lg:block"
          />
          <button className="text-sm" onClick={handleSearch}>
            search
          </button>
          {filteredOptions.length > 0 && (
            <div className="absolute top-12 left-0 right-0 bg-primary w-full border border-gray-300 rounded-md shadow-lg z-20">
              {filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
        <HiSearch className="text-[25px] text-gray-500 md:hidden" />
      </div>
      <div className="lg:w-1/3 w-fit max-w-full flex justify-start lg:justify-center gap-2 items-center lg:pr-12">
        <Link
          className={clsx(
            "text-quadnary font-bold hidden lg:block rounded-full text-lg hover:bg-secondary p-2 px-4 h-fit",
            { "bg-secondary": pathname === "/homepage" }
          )}
          href="/homepage"
        >
          Home
        </Link>
        <Link
          className={clsx(
            "text-quadnary font-bold rounded-full text-lg hover:bg-secondary p-2 px-4 h-fit",
            { "bg-secondary": pathname === "/homepage/pin-builder" }
          )}
          href={session || GuestUser ? "/homepage/pin-builder" : "/"}
        >
          Create
        </Link>
        <Link
          className={clsx(
            "text-quadnary font-bold rounded-full text-2xl hover:bg-secondary p-3 mr-1  h-fit",
            { "bg-secondary": pathname === "/homepage/favorite" }
          )}
          href={session || GuestUser ? "/homepage/favorite" : "/"}
        >
          <AiFillHeart />
        </Link>

        {session?.user || GuestUser ? (
          <div className="flex items-center">
            <Link
              href={`/homepage/${
                session?.user ? session?.user?.email : GuestUser?.email
              }`}
              className=" mr-2 text-quadnary hover:bg-secondary p-3 font-bold rounded-full text-lg"
            >
              Profile
            </Link>
            <Image
              src={session?.user?.image! || GuestUser?.userImage!}
              onClick={() =>
                router.push(
                  "/homepage/" +
                    `${session?.user ? session?.user?.email : GuestUser?.email}`
                )
              }
              alt="user-image"
              width={45}
              height={45}
              className="hover:bg-secondary rounded-full cursor-pointer"
            />
          </div>
        ) : (
          <button
            className="text-quadnary font-bold rounded-full text-lg hover:bg-secondary p-2 px-4 h-fit"
            onClick={() => router.push("/")}
          >
            Login <span className="text-[#afafaa]">(guest account)</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
