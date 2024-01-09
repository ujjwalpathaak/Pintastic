import Image from "next/image";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { AiFillHeart } from "react-icons/ai";
import useStore from "../store";
import { handleFavClick } from "../app/lib/api";
import { pinTypeHover } from "../types";
import UserTag from "./UserTag";

function PinItem({ id, pin, hover, setHoverPin, isMobile }: pinTypeHover) {
  const router = useRouter();
  const { user, isLoggedIn } = useStore();
  const imageRef = useRef<HTMLImageElement | null>(null);

  const userTag = {
    name: pin?.userName,
    image: pin?.userImage,
  };

  return (
    <>
      {isMobile ? (
        <div
          className="z-30"
          onClick={() => router.push(`/homepage/pin/${pin.id}`)}
          onMouseEnter={() => setHoverPin(id)}
          onMouseLeave={() => setHoverPin(-1)}
        >
          {imageRef.current?.width && imageRef.current?.height && (
            <div
              className="w-full h-auto absolute z-20 object-cover rounded-2xl  transition-opacity "
              style={{
                width: imageRef.current.width,
                height: imageRef.current.height,
              }}
            >
              <div className="flex flex-col h-full justify-between ">
                <div className="h-fit flex justify-start items-start bg-black/30 rounded-tl-2xl rounded-tr-2xl">
                  <h2
                    className="font-bold
                text-[18px] z-20 mt-[0.5rem] ml-[0.5rem] mb-1 text-white line-clamp-2 absolute"
                  >
                    {pin.title}{" "}
                  </h2>
                </div>
                <div className="h-1/2 flex justify-between items-end w-full ">
                  <UserTag userTag={userTag} />
                  <button
                    type="button"
                    onClick={async () =>
                      await handleFavClick(user, pin, isLoggedIn)
                    }
                    className="text-red-700  mb-[0.5rem] mr-[0.5rem] rounded-full hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium text-base text-center p-1 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    <AiFillHeart />
                  </button>
                </div>
              </div>
            </div>
          )}
          <Image
            ref={imageRef}
            src={pin.image}
            alt={pin.title}
            width={500}
            height={500}
            className="rounded-2xl
      cursor-pointer relative z-0 hover"
          />
        </div>
      ) : (
        <div
          className="z-30 cursor-pointer"
          onClick={() => router.push(`/homepage/pin/${pin.id}`)}
          onMouseEnter={() => setHoverPin(id)}
          onMouseLeave={() => setHoverPin(-1)}
        >
          {hover && imageRef.current?.width && imageRef.current?.height && (
            <div
              className="w-full h-auto absolute z-20 object-cover rounded-2xl bg-black/50 transition-opacity "
              style={{
                width: imageRef.current.width,
                height: imageRef.current.height,
              }}
            >
              <div className="flex flex-col h-full justify-between ">
                <div className="h-1/2 flex justify-start items-start">
                  <h2
                    className="font-bold
              text-[18px] z-20 mt-[0.5rem] ml-[0.5rem] mb-1 text-white line-clamp-2 absolute"
                  >
                    {pin.title}{" "}
                  </h2>
                </div>
                <div className="h-1/2 flex justify-between items-end w-full ">
                  <UserTag userTag={userTag} />
                  <button
                    type="button"
                    onClick={async () =>
                      await handleFavClick(user, pin, isLoggedIn)
                    }
                    className="text-red-700  mb-[0.5rem] mr-[0.5rem] rounded-full hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium text-base text-center p-1 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    <AiFillHeart />
                  </button>
                </div>
              </div>
            </div>
          )}
          <Image
            ref={imageRef}
            src={pin.image}
            alt={pin.title}
            width={500}
            height={500}
            className="rounded-2xl
    cursor-pointer relative z-0 hover"
          />
        </div>
      )}
    </>
  );
}

export default PinItem;
