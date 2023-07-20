"use client";
import app from "../database/firebaseConfig";
import React, { useEffect, useState } from "react";
import PinItem from "./PinItem";

type pinType = {
  title: string;
  desc: string;
  link: string;
  image: string;
  userName: string;
  email: string;
  userImage: string;
  id: string;
};

interface UserPinsProps {
  listOfPins: pinType[] | undefined;
}

function UserPins({ listOfPins }: UserPinsProps) {
  console.log(listOfPins);

  const [hoverPin, setHoverPin] = useState<number | null>(null);
  return (
    <div
      className="px-2 md:px-5
     columns-2 md:columns-3
     lg:columns-4 mb-4
     xl:columns-5 space-y-6 mx-12">
      {listOfPins?.map((item, index) => (
        <PinItem
          key={index}
          id={index}
          pin={item}
          hover={index === hoverPin}
          setHoverPin={setHoverPin}
        />
      ))}
    </div>
  );
}

export default UserPins;
