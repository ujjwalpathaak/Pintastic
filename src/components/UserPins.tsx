"use client";
import React, { useState } from "react";
import PinItem from "./PinItem";
import { pinType } from "../types";

interface UserPinsProps {
  listOfPins: pinType[] | undefined;
}

function UserPins({ listOfPins }: UserPinsProps) {
  const [hoverPin, setHoverPin] = useState<number | null>(null);
  return (
    <div
      className="columns-2 md:columns-3
     lg:columns-4 mb-4
     xl:columns-5 space-y-6 mx-6 ">
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
