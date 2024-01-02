"use client";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import app from "../../../database/firebaseConfig";
import PinItem from "../../../components/PinItem";
import { useSession } from "next-auth/react";
import { pinType } from "../../../types";

const page = () => {
  const db = getFirestore(app);

  const [listOfPins, setListOfPins] = useState<pinType[] | undefined>(
    undefined
  );

  const { data: session } = useSession();
  const [hoverPin, setHoverPin] = useState<number | null>(null);

  useEffect(() => {
    const getUserPins = async () => {
      if (session?.user) {
        var q = query(
          collection(db, "user"),
          where("email", "==", session?.user?.email)
        );

        const querySnapshot = await getDocs(q);

        const favPinId = querySnapshot.docs[0].data()?.favPins;
        if (!favPinId) return;
        const pins: pinType[] = [];

        for (let i = 0; i < favPinId.length; i++) {
          const q = query(
            collection(db, "pins"),
            where("id", "==", favPinId[i])
          );

          const querySnapshot2 = await getDocs(q);
          querySnapshot2.forEach((doc) => {
            const pinData = doc.data() as pinType;
            console.log(pinData);
            pins.push(pinData);
          });
        }
        setListOfPins(pins);
      }
    };

    getUserPins();
  }, []);

  return (
    <>
      <h1 className="mb-4 text-3xl mx-6 font-extrabold text-quadnary md:text-4xl lg:text-5xl">
        Favorites!
      </h1>
      <div
        className="columns-2 md:columns-3
     lg:columns-4 mb-4
     xl:columns-5 space-y-6 mx-6"
      >
        {listOfPins ? (
          <>
            {listOfPins.map((item, index) => (
              <PinItem
                key={index}
                id={index}
                pin={item}
                hover={false}
                setHoverPin={setHoverPin}
              />
            ))}
          </>
        ) : (
          <>
            <span className="text-xl font-extrabold text-quadnary md:text-2xl lg:text-3xl">
              Guests cannot like pins. Go login :)
            </span>
          </>
        )}
      </div>
    </>
  );
};

export default page;
