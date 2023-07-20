"use client";
import React, { useEffect, useState } from "react";
import app from "../../../database/firebaseConfig";
import UserInfo from "../../../components/UserInfo";
import UserPins from "../../../components/UserPins";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  getDoc,
  where,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/navigation";

// export const metadata = {
//   title: "Profile",
// };

interface providerProps {
  params: {
    userId: string;
  };
}
type userInfo = {
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
type userType = {
  email: string;
  userName: string;
  userImage: string;
};
const page = (props: providerProps) => {
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState<userInfo | null>(null);
  const db = getFirestore(app);

  const router = useRouter();

  const [listOfPins, setListOfPins] = useState<pinType[] | undefined>(
    undefined
  );

  let user = session?.user as userType;

  useEffect(() => {
    document.title = "Profile | Pintastic";

    const getUserPins = async () => {
      const q = query(
        collection(db, "pins"),
        where("email", "==", props.params.userId.replace("%40", '@') as string)
      );

      const querySnapshot = await getDocs(q);

      const pins: pinType[] = [];
      querySnapshot.forEach((doc) => {
        pins.push(doc.data() as pinType);
      });
      setListOfPins(pins);
    };

    getUserPins();
  }, [user]);

  useEffect(() => {
    const getUserInfo = async (email: string) => {
      const docRef = doc(db, "user", email);
      const docSnap = await getDoc(docRef);

      let userInfo = docSnap.data() as userInfo;

      setUserInfo(userInfo);
      if (docSnap.exists()) {
      } else {
        console.log("No such user exist!");
      }
    };

    if (props.params) {
      getUserInfo(props.params.userId.replace("%40", "@"));
    }
  }, [props.params]);

  return (
    <>
      <div>
        {userInfo ? (
          <div>
            <UserInfo guest={session ? false : true} userInfo={userInfo} />

            <UserPins listOfPins={listOfPins} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default page;
