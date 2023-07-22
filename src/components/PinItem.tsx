"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import UserTag from "./UserTag";
import { AiFillHeart } from "react-icons/ai";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import app from "../database/firebaseConfig";
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
  hover: boolean;
  setHoverPin: (id: number) => void;
};

function PinItem({ id, pin, hover, setHoverPin }: pinType) {
  const router = useRouter();
  const { user, isLoggedIn } = useStore();
  const userTag = {
    name: pin?.userName,
    image: pin?.userImage,
  };
  const imageRef = useRef<HTMLImageElement | null>(null);
  const handleClick = () => {
    router.push(`/homepage/pin/${pin.id}`);
  };
  const handleFavClick = async () => {
    console.log(pin?.email, pin?.id);
    if (isLoggedIn) {
      let email = user?.email as string;
      const db = getFirestore(app);
      const userDocRef = doc(db, "user", email);

      const userSnapshot = await getDoc(userDocRef);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();

        const currentFavPins = userData?.favPins || [];

        if (!currentFavPins.includes(pin?.id)) {
          const updatedFavPins = [...currentFavPins, pin?.id];

          await updateDoc(userDocRef, { favPins: updatedFavPins });
        }
      }
    }
  };
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const checkIsMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };
  useEffect(() => {
    checkIsMobile();

    // Add event listener to handle window resize
    window.addEventListener('resize', checkIsMobile);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return (
    <>
    {isMobile ? (
        <div
        className="z-30 "
        onClick={handleClick}
        onMouseEnter={() => setHoverPin(id)}
        onMouseLeave={() => setHoverPin(-1)}>
        {imageRef.current?.width && imageRef.current?.height && (
          <div
            className="w-full h-auto absolute z-20 object-cover rounded-2xl  transition-opacity "
            style={{
              width: imageRef.current.width,
              height: imageRef.current.height,
            }}>
            <div className="flex flex-col h-full justify-between ">
              <div className="h-fit flex justify-start items-start bg-black/30 rounded-tl-2xl rounded-tr-2xl">
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
                  onClick={handleFavClick}
                  className="text-red-700  mb-[0.5rem] mr-[0.5rem] rounded-full hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium text-base text-center p-1 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
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
      className="z-30 "
      onClick={handleClick}
      onMouseEnter={() => setHoverPin(id)}
      onMouseLeave={() => setHoverPin(-1)}>
      {hover && imageRef.current?.width && imageRef.current?.height && (
        <div
          className="w-full h-auto absolute z-20 object-cover rounded-2xl bg-black/50 transition-opacity "
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
                onClick={handleFavClick}
                className="text-red-700  mb-[0.5rem] mr-[0.5rem] rounded-full hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium text-base text-center p-1 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
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
