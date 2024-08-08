"use client";
import { getProviders, signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Provider from "../../../Provider";
import { useRouter } from "next/navigation";
import RootLayout from "../../../layout";
import Image from "next/image";
import useStore from "../../../../store";

interface Provider {
  id: string;
  name: string;
}

const page = () => {
  const { data: session } = useSession();
  const { user, isLoggedIn, Guestlogin, logout } = useStore();
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

  const signInGuest = () => {
    Guestlogin(
      "guest@gmail.com",
      "guest",
      "https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg"
    );
    router.push("/homepage");
  };

  const provider = Object.values(providers)[0];

  return (
    <div className=" bg-quadnary">
      <div className="container h-screen flex justify-center items-center">
        <div className="p-8 bg-primary rounded-lg flex-col justify-center flex max-w-6xl pb-10">
          <div className="flex justify-center mb-4">
            <Image src="/Logo.png" priority width={400} height={150} alt="login-photo" />
          </div>

          <button
            onClick={() => signIn(provider.id)}
            className="px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
          >
            <Image
              className="w-6 h-6"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
              width={50}
              height={50}
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
            className="px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
          >
            <Image
              className="w-6 h-6"
              src="https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg"
              loading="lazy"
              alt="google logo"
              width={50}
              height={50}
            />
            <span>Guest</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
