"use client";
import React, { useEffect, useState } from "react";
import PinItem2 from "./PinItem2";
import { getUserPins2 } from "../app/lib/api";
import useStore from "../store";
import { pinType } from "../types";

function UserPins() {
  const { user, GuestUser } = useStore();
  const [hoverPin, setHoverPin] = useState<number | null>();
  const [listOfPins, setListOfPins] = useState<pinType[] | undefined>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pins = await getUserPins2(user, GuestUser);        
        setListOfPins(pins!);
      } catch (error) {
        console.error("Error fetching user pins:", error);
      }
    };

    fetchData();
  }, [user, GuestUser]);
  return (
    <div
      className="columns-2 md:columns-3
     lg:columns-4 mb-4
     xl:columns-5 space-y-6 mx-6"
    >
      {listOfPins?.map((item, index) => (
        <PinItem2
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
