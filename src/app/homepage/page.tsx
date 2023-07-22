"use client";
import { useState, useEffect } from "react";
import PinList from "../../components/UserPins";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import app from "../../database/firebaseConfig";
import useStore from "../../store";
import { pinType } from "../../types";

export default function Home() {
  const db = getFirestore(app);
  const { user } = useStore();
  const [listOfPins, setListOfPins] = useState<pinType[] | undefined>(
    undefined
  );

  useEffect(() => {
    const getUserPins = async () => {
      var q = query(collection(db, "pins"));

      const querySnapshot = await getDocs(q);

      const pins: pinType[] = [];

      querySnapshot.forEach((doc) => {
        pins.push(doc.data() as pinType);
      });

      for (let i = pins.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pins[i], pins[j]] = [pins[j], pins[i]];
      }

      setListOfPins(pins);
    };

    getUserPins();
  }, [user]);

  return (
    <>
      <div className="">
        <PinList listOfPins={listOfPins} />
      </div>
    </>
  );
}
