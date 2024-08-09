"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import UserTag2 from "../../../../components/UserTag2";
import { BsArrowLeftCircle } from "react-icons/bs";
import { BiLinkExternal } from "react-icons/bi";
import Link from "next/link";
import { pinType } from "../../../../types";

interface ClientComponentProps {
  pin: pinType;
}

const ClientComponent: React.FC<ClientComponentProps> = ({ pin }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (pin?.image) {
      const img = new window.Image();
      img.src = pin.image;
      img.onload = () => setLoaded(true);
    }
  }, [pin?.image]);

  return (
    <div className="bg-primary pt-3 pb-6 h-[90vh] rounded-2xl md:px-24 lg:px-36">
      <div className="bg-[#efefef] h-full flex lg:flex-row flex-col rounded-2xl py-2 lg:py-[2rem] xl:pd-16">
        <div className="w-full lg:w-1/2 flex lg:flex-row lg:h-auto h-full flex-col justify-between">
          <div>
            <Link
              type="button"
              href={`/homepage`}
              className="h-fit flex hover:bg-secondary justify-center lg:text-4xl text-5xl items-center w-fit text-white rounded-full border-r border-gray-100 mx-[2rem]"
            >
              <BsArrowLeftCircle color="#3F2305" />
            </Link>
          </div>
          <div className="flex justify-end h-full items-center w-full flex-col">
            <div className="relative w-full h-full">
              <Image
                src={pin.lowResImage}
                alt="pin"
                layout="fill"
                objectFit="contain"
                className={`absolute inset-0 transition-opacity duration-500 ${
                  loaded ? "opacity-0" : "opacity-100"
                } rounded-2xl`}
                priority
              />
              <Image
                src={pin.image}
                alt="pin"
                layout="fill"
                objectFit="contain"
                className={`absolute inset-0 transition-opacity duration-500 ${
                  loaded ? "opacity-100" : "opacity-0"
                } rounded-2xl`}
                onLoad={() => setLoaded(true)}
              />
            </div>
            <div className="h-[20%] lg:h-[10%] flex item-center">
              <div className="flex items-center">
                <button
                  className="h-fit flex hover:bg-secondary justify-center text-4xl lg:text-3xl items-center w-fit text-white rounded-full border-r border-gray-100"
                  onClick={() => window.open(pin.link)}
                >
                  <BiLinkExternal color="#3F2305" />
                </button>
                <UserTag2
                  user={{
                    name: pin.userName,
                    image: pin.userImage,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="px-12 pb-3 lg:p-16 lg:pb-3 w-full lg:w-[50%]">
          <div>
            <h1 className="text-3xl lg:text-5xl text-quadnary font-bold mb-5 lg:mb-10">
              {pin.title}
            </h1>
            <h2 className="mt-5 lg:mt-10 text-quadnary ">{pin.desc}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientComponent;
