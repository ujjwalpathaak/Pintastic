"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import PinList from "../../components/UserPins";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import app from "../../database/firebaseConfig";
import { useSession } from "next-auth/react";
import RootLayout from "./layout";
import Head from "next/head";

// export const metadata = {
//   title: "Pin Builder",
// };
type userType = {
  email: string;
  userName: string;
  userImage: string;
};

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

export default function Home() {
  const { data: session } = useSession();
  const db = getFirestore(app);

  const [listOfPins, setListOfPins] = useState<pinType[] | undefined>(
    undefined
  );

  let user = session?.user as userType;

  useEffect(() => {
    const getUserPins = async () => {
      if (session?.user) {
        var q = query(collection(db, "pins"), where("email", "!=", user.email));
      } else {
        var q = query(collection(db, "pins"));
      }

      const querySnapshot = await getDocs(q);

      const pins: pinType[] = [];
      querySnapshot.forEach((doc) => {
        pins.push(doc.data() as pinType);
      });
      setListOfPins(pins);
    };

    getUserPins();
    // document.title = "Home";
  }, [user]);
  return (
    <>
      <div className="">
        <PinList listOfPins={listOfPins} />
      </div>
    </>
  );
}
