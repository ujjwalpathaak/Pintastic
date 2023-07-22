"use client";
import React, { useEffect, useState } from "react";
import app from "../../../database/firebaseConfig";
import UserInfo from "../../../components/UserInfo";
import UserPins2 from "../../../components/UserPins2";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  getDoc,
  where,
} from "firebase/firestore";
import useStore from "../../../store";
import { pinType, providerProps, userInfo } from "../../../types";

const page = (props: providerProps) => {
  const [userInfo, setUserInfo] = useState<userInfo | null>(null);
  const db = getFirestore(app);

  const { user, isLoggedIn } = useStore();

  const [listOfPins, setListOfPins] = useState<pinType[] | undefined>(
    undefined
  );

  useEffect(() => {
    document.title = "Profile | Pintastic";

    const getUserPins = async () => {
      const q = query(
        collection(db, "pins"),
        where("email", "==", user?.email as string)
      );

      const querySnapshot = await getDocs(q);

      const pins: pinType[] = [];
      querySnapshot.forEach((doc) => {
        pins.push(doc.data() as pinType);
      });
      setListOfPins(pins);
    };

    const getUserInfo = async () => {
      const docRef = doc(db, "user", user?.email as string);
      const docSnap = await getDoc(docRef);

      let userInfo = docSnap.data() as userInfo;

      setUserInfo(userInfo);
      if (docSnap.exists()) {
      } else {
        console.log("No such user exist!");
      }
    };

    if (isLoggedIn) {
      getUserPins();
      getUserInfo();
    }
  }, [user]);

  return (
    <>
      <div>
        {userInfo ? (
          <div>
            <UserInfo />
            <h1 className="mb-4 text-3xl mx-6 font-extrabold text-quadnary md:text-4xl lg:text-5xl">
              My Pins!
            </h1>
            <UserPins2 listOfPins={listOfPins} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default page;
