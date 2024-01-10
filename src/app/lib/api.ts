import {
  collection,
  deleteDoc,
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
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { SetStateAction } from "react";
import { log } from "console";
const storage = getStorage(app);
const db = getFirestore(app);

export const getUserPins = async () => {
  var q = query(collection(db, "pins"));
  const querySnapshot = await getDocs(q);
  const pins: pinType[] = [];
  querySnapshot.forEach((doc) => {
    pins.push(doc.data() as pinType);
  });
  console.log(pins.length);
  

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
  console.log(file?.name);
  const storageRef = ref(storage, "pinterest/" + file?.name);
  uploadBytes(storageRef, file as Blob)
    .then((snapshot) => {
      console.log("File Uploaded");
    })
    .then((resp) => {
      getDownloadURL(storageRef).then(async (url) => {
        let _id = Date.now().toString();
        let userName = user?.userName || GuestUser?.userName;
        console.log("DownloadUrl");

        const postData = {
          title: title,
          desc: desc,
          link: link,
          name: file?.name || "undefined",
          image: url,
          userName: userName,
          email: user?.email || GuestUser?.email,
          userImage: user?.userImage || GuestUser?.userImage,
          id: _id + userName,
        };
        console.log(postData);

        await setDoc(doc(db, "pins", _id), postData).then(
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
      where("id", "==", pinId!.replace("%20", " "))
    );

    const querySnapshot = await getDocs(q);

    const pins: pinType[] = [];
    querySnapshot.forEach((doc) => {
      pins.push(doc.data() as pinType);
    });
    return pins[0];
  }
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

export const deletePin = async (pin: {
  title: string;
  desc: string;
  name: string;
  link: string;
  image: string;
  userName: string;
  email: string;
  userImage: string;
  id: string;
}) => {
  try {
    console.log(pin);
    let _id = pin.id.match(/(\d+)/);
    let __id = _id![0];
    console.log(__id);

    await deleteDoc(doc(db, "pins", __id)).then(() => {
      console.log(`Document with ID '${__id}' deleted successfully.`);
    });
  } catch (error) {
    console.error("Error deleting pin:", error);
  }
};
