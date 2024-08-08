"use client";
import React, { useEffect, useState } from "react";
import PinItem from "./PinItem";
import { UserPinsProps } from "../types";

function HomepagePins({ listOfPins }: UserPinsProps) {
  const [hoverPin, setHoverPin] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const checkIsMobile = () => setIsMobile(window.innerWidth < 768);

  useEffect(() => {
    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  return (
    <div
      className="columns-2 md:columns-3
     lg:columns-4 mb-4
     xl:columns-5 space-y-6 mx-6 "
    >
      {listOfPins?.map((item, index) => (
        <PinItem
          key={index}
          id={index}
          pin={item}
          hover={index === hoverPin}
          setHoverPin={setHoverPin}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
}

export default HomepagePins;
