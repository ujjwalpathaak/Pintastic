import Image from "next/image";
import React from "react";
// import UserTag from "../UserTag";
import { useRouter } from "next/navigation";
import UserTag from "./UserTag";

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
  const user = {
    name: pin?.userName,
    image: pin?.userImage,
  };

  const handleClick = () => {
    router.push(`/homepage/pin/${pin.id}`);
  };

  return (
    <div
      className="z-30"
      onClick={handleClick}
      onMouseEnter={() => setHoverPin(id)}
      onMouseLeave={() => setHoverPin(-1)}>
      {hover ? (
        <>
          <h2
            className="font-bold 
            text-[18px] z-20 mt-[0.5rem] ml-[0.5rem] mb-1 text-white line-clamp-2 absolute">
            {pin.title}
          </h2>
        </>
      ) : (
        <></>
      )}
      {hover ? (
        <>
          <div
            className="relative 
           before:absolute
           before:h-full before:w-full
           before:rounded-2xl
           before:z-10
           hover:before:bg-black
           before:opacity-50
           cursor-pointer
           "
            onClick={handleClick}>
            {" "}
            <Image
              src={pin.image}
              alt={pin.title}
              width={500}
              height={500}
              className="rounded-2xl
            cursor-pointer relative z-0 hover"
            />
          </div>
        </>
      ) : (
        <>
          {" "}
          <Image
            src={pin.image}
            alt={pin.title}
            width={500}
            height={500}
            className="rounded-2xl
        cursor-pointer relative z-0 hover"
          />
        </>
      )}

      {hover ? (
        <>
          <div className="absolute z-20 mt-[-2rem] ml-[0.5rem]">
            <UserTag user={user} />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default PinItem;
