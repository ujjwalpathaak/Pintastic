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
    <div className="z-20 relative">
      <Image
        ref={imageRef}
        src={pin.image}
        alt={pin.title}
        width={500}
        height={500}
        className="rounded-2xl cursor-pointer z-0"
      />
      <button
        type="button"
        onClick={() => handleDeletePin(pin)}
        className="text-black absolute bottom-2 left-2 p-1 z-30 rounded-full hover:text-black border border-black hover:bg-slate-200 bg-white focus:ring-4 focus:outline-none focus:ring-white font-medium text-base text-center"
      >
        <AiFillDelete />
      </button>
    </div>
  );
}

export default PinItem;
