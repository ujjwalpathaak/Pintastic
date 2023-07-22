"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return (
    <div className="bg-secondary bg-center bg-contain flex justify-center">
      <div className=" h-[100vh] w-full flex justify-center items-center flex-col gap-5 max-w-4xl">
        <Image src="/Logo.png" alt="logo" height={100} width={500} />
        <h1 className="mb-4 text-3xl text-center lg:text-left font-extrabold text-quadnary md:text-4xl lg:text-5xl">
          Discover and Share Inspiration!
        </h1>
        <p className="text-lg font-normal text-[#4a3115] lg:text-xl text-justify w-[90%]">
          Pintastic is your go-to destination for discovering and sharing
          creativity, inspiration, and ideas from all corners of the world.
          Whether you're looking for DIY projects, mouthwatering recipes,
          stunning photography, or fashion-forward trends, we've got you
          covered. Get ready to dive into a world of endless inspiration!
        </p>
        <div className="flex gap-12 mt-12">
          <button
            onClick={() => router.push("/homepage")}
            className="relative inline text-lg group">
            <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-quadnary transition-colors duration-400 ease-out border-2 border-quadnary rounded-lg group-hover:text-white">
              <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
              <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-400 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-quadnary group-hover:-rotate-180 ease"></span>
              <span className="relative">Get Started</span>
            </span>
            <span
              className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-300 ease-linear bg-quadnary rounded-lg group-hover:mb-0 group-hover:mr-0"
              data-rounded="rounded-lg"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
