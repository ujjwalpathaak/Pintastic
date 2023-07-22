"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import UserTag from "./UserTag";
import { AiFillDelete } from "react-icons/ai";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import app from "../database/firebaseConfig";
import { useSession } from "next-auth/react";

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
  const db = getFirestore(app);
  const userTag = {
    name: pin?.userName,
    image: pin?.userImage,
  };
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleClick = () => {
    router.push(`/homepage/pin/${pin.id}`);
  };
  const deletePin = async () => {
    try {
      // console.log(pin?.id);

      // const pinRef = query(collection(db, "pins"), where("id", "==", pin?.id));
      // console.log(pinRef);

      // Delete the document
      // await deleteDoc(pinRef);

      router.push(`/homepage/${session?.user?.email}`);
    } catch (error) {
      console.error("Error deleting pin:", error);
    }
  };

  return (
    <div
      className="z-30"
      onClick={handleClick}
      onMouseEnter={() => setHoverPin(id)}
      onMouseLeave={() => setHoverPin(-1)}>
      {hover && imageRef.current?.width && imageRef.current?.height && (
        <div
          className="w-full h-auto absolute z-20 object-cover rounded-2xl bg-black/50"
          style={{
            width: imageRef.current.width,
            height: imageRef.current.height,
          }}>
          <div className="flex flex-col h-full justify-between ">
            <div className="h-1/2 flex justify-start items-start">
              <h2
                className="font-bold
              text-[18px] z-20 mt-[0.5rem] ml-[0.5rem] mb-1 text-white line-clamp-2 absolute">
                {pin.title}{" "}
              </h2>
            </div>
            <div className="h-1/2 flex justify-between items-end w-full ">
              <UserTag userTag={userTag} />
              <button
                type="button"
                onClick={deletePin}
                className="text-white  mb-[0.5rem] mr-[0.5rem] rounded-full hover:text-black border border-white hover:bg-white focus:ring-4 focus:outline-none focus:ring-white font-medium text-base text-center p-1">
                <AiFillDelete />
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
  );
}

export default PinItem;
