import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { pinType, userInfo } from "../../types";
import app from "../../database/firebaseConfig";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { SetStateAction } from "react";
const storage = getStorage(app);
const db = getFirestore(app);

export const getUserPins = async () => {
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

  return pins;
};

export const handleFavClick = async (
  user: {
    email: string;
    userName: string;
    userImage: string;
    favPins: string[];
  } | null,
  pin: {
    title: string;
    desc: string;
    link: string;
    image: string;
    userName: string;
    email: string;
    userImage: string;
    id: string;
  },
  isLoggedIn: boolean
) => {
  console.log(pin?.email, pin?.id);
  if (isLoggedIn) {
    let email = user?.email as string;
    const db = getFirestore(app);
    const userDocRef = doc(db, "user", email);

    const userSnapshot = await getDoc(userDocRef);
    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();

      const currentFavPins = userData?.favPins || [];

      if (!currentFavPins.includes(pin?.id)) {
        const updatedFavPins = [...currentFavPins, pin?.id];

        await updateDoc(userDocRef, { favPins: updatedFavPins });
      }
    }
  }
};

export const uploadFile = async (
  user: {
    email: string;
    userName: string;
    userImage: string;
    favPins: string[];
  } | null,
  GuestUser: {
    email: string;
    userName: string;
    userImage: string;
  } | null,
  title: string | undefined,
  desc: string | undefined,
  link: string | undefined,
  file: File | null | undefined,
  setLoading: { (value: SetStateAction<boolean>): void; (arg0: boolean): void }
) => {
  const storageRef = ref(storage, "pinterest/" + file?.name);
  uploadBytes(storageRef, file as Blob)
    .then((snapshot) => {
      console.log("File Uploaded");
    })
    .then((resp) => {
      getDownloadURL(storageRef).then(async (url) => {
        console.log("DownloadUrl");

        const postData = {
          title: title,
          desc: desc,
          link: link,
          name: file?.name || "undefined",
          image: url,
          userName: user?.userName || GuestUser?.userName,
          email: user?.email || GuestUser?.email,
          userImage: user?.userImage || GuestUser?.userImage,
          id: Date.now().toString() + user?.userName || GuestUser?.userName,
        };
        console.log(postData);

        await setDoc(doc(db, "pins", Date.now().toString()), postData).then(
          (resp) => {
            setLoading(true);
          }
        );
      });
    });
};

export const getPin = async (pinId: string) => {
  if (pinId) {
    var q = query(
      collection(db, "pins"),
      where("id", "==", pinId.replace("%20", " "))
    );

    const querySnapshot = await getDocs(q);

    const pins: pinType[] = [];
    querySnapshot.forEach((doc) => {
      pins.push(doc.data() as pinType);
    });
    return pins[0];
  }
};

export const handleDownloadPin = async (pin: pinType | undefined) => {
  const storage = getStorage();
  const starsRef = ref(storage, `pinterest/${pin?.name}`);

  getDownloadURL(starsRef).then((url) => {
    return url;
  });
  return "";
};

export const getUserPins2 = async (
  user: {
    email: string;
    userName: string;
    userImage: string;
    favPins: string[];
  } | null,
  GuestUser: {
    email: string;
    userName: string;
    userImage: string;
  } | null
) => {
  const q = query(
    collection(db, "pins"),
    where(
      "email",
      "==",
      (user?.email as string) || (GuestUser?.email as string)
    )
  );

  const querySnapshot = await getDocs(q);

  const pins: pinType[] = [];
  querySnapshot.forEach((doc) => {
    pins.push(doc.data() as pinType);
  });
  return pins;
};

export const getUserInfo = async (
  user: {
    email: string;
    userName: string;
    userImage: string;
    favPins: string[];
  } | null,
  GuestUser: {
    email: string;
    userName: string;
    userImage: string;
  } | null
) => {
  const docRef = doc(
    db,
    "user",
    (user?.email as string) || (GuestUser?.email as string)
  );
  const docSnap = await getDoc(docRef);

  let userInfo = docSnap.data() as userInfo;

  return userInfo;
};
