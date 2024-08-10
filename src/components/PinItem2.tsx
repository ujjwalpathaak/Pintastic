"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { AiFillDelete } from "react-icons/ai";
import "firebase/firestore";
import { deletePin } from "../app/lib/api";
import useStore from "../store";

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
};

function PinItem({ pin }: pinType) {
  const router = useRouter();
  const { user } = useStore();

  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleDeletePin = async (pin: any) => {
    try {
      const result = await deletePin(pin);
    } catch (error) {
      console.error("Error deleting pin: ", error);
    }
  };

  return (
    <div className="z-20 relative">
      <Image
        ref={imageRef}
        src={pin?.image}
        alt="pin"
        width={500}
        height={500}
        className="rounded-2xl cursor-pointer z-0"
      />
      <button
        type="button"
        onClick={async () => {
          await handleDeletePin(pin);
          router.push("/homepage");
        }}
        className="text-black absolute bottom-2 left-2 p-1 z-30 rounded-full hover:text-black border border-black hover:bg-slate-200 bg-white focus:ring-4 focus:outline-none focus:ring-white font-medium text-base text-center"
      >
        <AiFillDelete />
      </button>
    </div>
  );
}

export default PinItem;
