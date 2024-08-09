"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import useStore from "../store";

interface Provider {
  id: string;
  name: string;
}

const page = () => {
  const { data: session } = useSession();
  const { Guestlogin } = useStore();
  const [providers, setProviders] = useState<Provider | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchProviders() {
      const res = await fetch("/api/auth/providers");
      const providerData = await res.json();
      setProviders(providerData);
    }
    if (session) {
      router.push("/homepage");
    }

    fetchProviders();
  }, [session]);
  if (!providers) {
    return <></>;
  }
  const provider = Object.values(providers)[0];
  const signInGuest = () => {
    Guestlogin(
      "guest@gmail.com",
      "guest",
      "https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg"
    );
    router.push("/homepage");
  };

  return (
    <div className="bg-secondary h-[100vh] bg-center bg-contain flex flex-col justify-start">
      <div className=" h-fit w-[100vw] flex justify-center mt-16 items-center flex-col p-5">
        <Image src="/Logo.png" priority alt="logo" height={100} width={500} />
      </div>
      <div className="h-fit w-full flex mt-12 justify-start items-center gap-12 flex-col">
        <h1 className="mb-4 text-3xl text-center lg:text-left font-extrabold text-quadnary md:text-4xl lg:text-5xl">
          Discover and Share Inspiration!
        </h1>
        <p className="text-sm md:text-lg font-normal text-[#4a3115] lg:text-xl text-center w-[90%] max-w-4xl">
          Pintastic is your go-to destination for discovering and sharing
          creativity, inspiration, and ideas from all corners of the world.
          Whether you're looking for DIY projects, mouthwatering recipes,
          stunning photography, or fashion-forward trends, we've got you
          covered. Get ready to dive into a world of endless inspiration!
        </p>
        <div className="flex justify-center flex-col items-center w-full mb-3 gap-2 md:mt-5 ">
          <div className="flex h-12 justify-center items-center mt-8">
            <button
              onClick={() => signIn(provider.id)}
              className="px-2 md:px5 py-2 md:py-3 bg-white text-xs md:text-base min-w-[50px] md:min-w-[200px] justify-center border flex gap-0 md:gap-2 items-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
            >
              <Image
                className="w-6 h-6"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                loading="lazy"
                alt="google logo"
                width={0}
                height={0}
              />
              <span>Google Account</span>
            </button>

            <div className="flex justify-between items-center  text-quadnary font-semibold">
              <hr className="w-full h-1 my-8 bg-quadnary border-0 rounded " />
              <span className="p-2 mb-1">OR</span>
              <hr className="w-full h-1 my-8 bg-quadnary border-0 rounded " />
            </div>

            <button
              onClick={() => signInGuest()}
              className="px-2 md:px5 py-2 sm:py-3 text-xs md:text-base border flex gap-2 min-w-[50px] md:min-w-[200px] justify-center items-center  bg-white border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
            >
              <Image
                className="w-6 h-6"
                src="https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg"
                loading="lazy"
                alt="google logo"
                width={50}
                height={50}
              />
              <span>Guest Login</span>
            </button>
          </div>
          <button
            onClick={() => router.push("/homepage")}
            className="relative inline text-lg group mt-5 md:mt-0"
          >
            <span className="relative mt-Gues z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-quadnary transition-colors duration-400 ease-out border-2 border-quadnary rounded-lg group-hover:text-white">
              <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
              <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-400 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-quadnary group-hover:-rotate-180 ease"></span>
              <span className="relative">Maybe Later</span>
            </span>
            <span
              className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-300 ease-linear bg-quadnary rounded-lg group-hover:mb-0 group-hover:mr-0"
              data-rounded="rounded-lg"
            ></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
