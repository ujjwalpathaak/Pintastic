"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import UserTag from "./UserTag";
import { AiFillDelete } from "react-icons/ai";
import "firebase/firestore";
import { useSession } from "next-auth/react";
import { deletePin } from "../app/lib/api";

type pinType = {
  id: number;
  pin: {
    title: string;
    desc: string;
    link: string;
    image: string;
    userName: string;
    email: string;
    userImage: string;
    id: string;
  };
  hover: boolean;
  setHoverPin: (id: number) => void;
};

function PinItem({ id, pin, hover, setHoverPin }: pinType) {
  const router = useRouter();
  const { data: session } = useSession();
  const userTag = {
    name: pin?.userName,
    image: pin?.userImage,
  };
  const imageRef = useRef<HTMLImageElement | null>(null);
  const handleDeletePin = (pin: any) => {
    deletePin(pin);
    router.refresh();
  };
  const handleClick = () => {
    router.push(`/homepage/pin/${pin.id}`);
  };

  return (
    <div
      className="z-20"
      onMouseEnter={() => setHoverPin(id)}
      onMouseLeave={() => setHoverPin(-1)}
    >
      {hover && imageRef.current?.width && imageRef.current?.height && (
        <>
          <div
            onClick={handleClick}
            className="w-full h-auto absolute z-20 object-cover rounded-2xl bg-black/50"
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
              </div>
            </div>
          </div>
        </>
      )}
      <>
        <Image
          ref={imageRef}
          src={pin.image}
          alt={pin.title}
          width={500}
          height={500}
          className="rounded-2xl
    cursor-pointer relative z-0"
        />
        <button
          type="button"
          onClick={() => handleDeletePin(pin)}
          onMouseEnter={() => setHoverPin(-1)}
          onMouseLeave={() => setHoverPin(id)}
          className="text-black absolute z-30 m-2 p-1 rounded-full hover:text-black border border-black hover:bg-white focus:ring-4 focus:outline-none focus:ring-white font-medium text-base text-center"
        >
          <AiFillDelete />
        </button>
      </>
    </div>
  );
}

export default PinItem;
