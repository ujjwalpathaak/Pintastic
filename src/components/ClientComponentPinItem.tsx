"use client";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AiFillHeart } from "react-icons/ai";
import useStore from "../store";
import { handleFavClick } from "../app/lib/api";
import { pinTypeHover } from "../types";
import UserTag from "./UserTag";

function ClientComponent({
  id,
  pin,
  hover,
  setHoverPin,
  isMobile,
}: pinTypeHover) {
  const router = useRouter();
  const { user, isLoggedIn } = useStore();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (pin?.image) {
      const img = new window.Image();
      img.src = pin.image;
      img.onload = () => setLoaded(true);
    }
  }, [pin?.image]);

  const userTag = {
    name: pin?.userName,
    image: pin?.userImage,
  };

  if (!pin?.lowResImage || !pin?.image) {
    return <div></div>;
  }

  return (
    <>
      {isMobile ? (
        <div
          className="z-10 relative"
          onClick={() => router.push(`/homepage/pin/${pin.id}`)}
          onMouseEnter={() => setHoverPin(id)}
          onMouseLeave={() => setHoverPin(-1)}
        >
          <div className="w-full h-full absolute z-20 object-cover rounded-2xl transition-opacity">
            <div className="flex flex-col h-full justify-between">
              <div className="h-fit flex justify-start items-start bg-black/30 rounded-tl-2xl rounded-tr-2xl">
                <h2 className="font-bold text-[15px] z-20 mt-[0.5rem] ml-[0.5rem] mb-1 text-white line-clamp-2 absolute">
                  {pin.title}
                </h2>
              </div>
              <div className="h-1/2 flex justify-between items-end w-full">
                <UserTag userTag={userTag} />
                <button
                  type="button"
                  onClick={async () =>
                    await handleFavClick(user, pin, isLoggedIn)
                  }
                  className="text-red-700 mb-[0.5rem] mr-[0.5rem] rounded-full hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium text-xs text-center p-1 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  <AiFillHeart className="text-xs" />
                </button>
              </div>
            </div>
          </div>
          <Image
            src={pin.lowResImage}
            alt={pin.title}
            width={500}
            height={500}
            objectFit="contain"
            className={`inset-0 transition-opacity duration-500 ${
              loaded ? "hidden" : "block"
            } rounded-2xl`}
            priority
          />
          <Image
            src={pin.image}
            alt={pin.title}
            width={500}
            height={500}
            objectFit="contain"
            className={`inset-0 transition-opacity duration-500 ${
              loaded ? "block" : "hidden"
            } rounded-2xl`}
            onLoad={() => setLoaded(true)}
            priority
          />
        </div>
      ) : (
        <div
          className="z-10 cursor-pointer relative"
          onClick={() => router.push(`/homepage/pin/${pin.id}`)}
          onMouseEnter={() => setHoverPin(id)}
          onMouseLeave={() => setHoverPin(-1)}
        >
          {hover && (
            <div className="w-full h-full absolute z-20 object-cover rounded-2xl bg-black/20 transition-opacity">
              <div className="flex flex-col h-full justify-between">
                <div className="h-1/2 flex justify-start items-start">
                  <h2 className="font-bold text-[18px] z-20 mt-[0.5rem] ml-[0.5rem] mb-1 text-white line-clamp-2 absolute">
                    {pin.title}
                  </h2>
                </div>
                <div className="h-1/2 flex justify-between items-end w-full">
                  <UserTag userTag={userTag} />
                  <button
                    type="button"
                    onClick={async () =>
                      await handleFavClick(user, pin, isLoggedIn)
                    }
                    className="text-red-700 mb-[0.5rem] mr-[0.5rem] rounded-full hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium text-base text-center p-1 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    <AiFillHeart />
                  </button>
                </div>
              </div>
            </div>
          )}
          <Image
            src={pin.lowResImage}
            alt={pin.title}
            width={500}
            height={500}
            objectFit="contain"
            className={`inset-0 transition-opacity duration-500 ${
              loaded ? "hidden" : "block"
            } rounded-2xl`}
            priority
          />
          <Image
            src={pin.image}
            alt={pin.title}
            width={500}
            height={500}
            objectFit="contain"
            className={`inset-0 transition-opacity duration-500 ${
              loaded ? "block" : "hidden"
            } rounded-2xl`}
            onLoad={() => setLoaded(true)}
            priority
          />
        </div>
      )}
    </>
  );
}

export default ClientComponent;
