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
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { SetStateAction } from "react";

const storage = getStorage(app);
const db = getFirestore(app);

// const resizeImage = (
//   file: File,
//   maxWidth: number,
//   maxHeight: number
// ): Promise<Blob> => {
//   return new Promise((resolve) => {
//     const img = document.createElement("img");
//     const reader = new FileReader();

//     reader.onload = () => {
//       img.src = reader.result as string;
//     };

//     img.onload = () => {
//       const canvas = document.createElement("canvas");
//       const ctx = canvas.getContext("2d")!;
//       let width = img.width;
//       let height = img.height;

//       if (width > maxWidth) {
//         height *= maxWidth / width;
//         width = maxWidth;
//       }

//       if (height > maxHeight) {
//         width *= maxHeight / height;
//         height = maxHeight;
//       }

//       canvas.width = width;
//       canvas.height = height;

//       ctx.drawImage(img, 0, 0, width, height);

//       ctx.filter = "blur(10px)";
//       ctx.drawImage(canvas, 0, 0, width, height);

//       canvas.toBlob((blob) => {
//         if (blob) resolve(blob);
//       }, file.type);
//     };

//     reader.readAsDataURL(file);
//   });
// };

export const getGenrePins = async (genre: string) => {
  const q = query(collection(db, "tags"), where("id", "==", genre || ""));

  const querySnapshot = await getDocs(q);

  const pinPromises: Promise<pinType | undefined>[] = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const images = data.images || [];

    if (images.size === 0) {
      return [];
    }
    images.forEach((imageId: string) => {
      return pinPromises.push(getPin(imageId));
    });
  });

  const pins = await Promise.all(pinPromises);

  return pins;
};

export const getFavPins = async (
  user: {
    email: string;
    userName: string;
    userImage: string;
    favPins: string[];
  } | null
) => {
  if (!user || !user.email) {
    throw new Error("User or user email is not defined");
  }
  const userDocRef = doc(db, "user", user?.email);
  const userSnapshot = await getDoc(userDocRef);
  const userData = userSnapshot.data();

  const favPinId = userData?.favPins;
  if (!favPinId || favPinId.length === 0) return [];

  const pinPromises: Promise<pinType | undefined>[] = [];

  favPinId.forEach((id: string) => {
    pinPromises.push(getPin(id));
  });

  const pins = await Promise.all(pinPromises);

  return pins;
};

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
  setLoading: { (value: SetStateAction<boolean>): void; (arg0: boolean): void },
  selectedOptions: any
) => {
  if (!file) {
    return;
  }

  const storageRef = ref(storage, "pinterest/" + file.name);

  await uploadBytes(storageRef, file)
    .then(() => {
      return getDownloadURL(storageRef);
    })
    .then(async (url) => {
      let _id = Date.now().toString();
      let userName = user?.userName || GuestUser?.userName;

      const postData = {
        title: title,
        desc: desc,
        link: link,
        name: file.name || "undefined",
        image: url,
        userName: userName,
        email: user?.email || GuestUser?.email,
        userImage: user?.userImage || GuestUser?.userImage,
        id: _id + userName,
      };

      await setDoc(doc(db, "pins", _id), postData);
      setLoading(true);
      return postData;
    })
    .then(async (postData) => {
      for (let i = 0; i < selectedOptions.length; i++) {
        const genre = selectedOptions[i].value;

        const q = query(collection(db, "tags"), where("id", "==", genre || ""));
        const querySnapshot = await getDocs(q);

        for (const docSnap of querySnapshot.docs) {
          const docRef = docSnap.ref;
          const docData = docSnap.data();

          const ids = [...(docData.images || []), postData.id];

          await updateDoc(docRef, { images: ids });
        }
      }
    })
    .catch((error) => {
      console.error("Error uploading file:", error);
    });
};

export const getPin = async (pinId: string): Promise<pinType | undefined> => {
  if (pinId) {
    var q = query(
      collection(db, "pins"),
      where("id", "==", pinId!.replace("%20", " ") || "")
    );

    const querySnapshot = await getDocs(q);

    const pins: pinType[] = [];
    querySnapshot.forEach((doc) => {
      pins.push(doc.data() as pinType);
    });
    return pins[0];
  }
  return undefined;
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
      (user?.email as string) || (GuestUser?.email as string) || ""
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
    let _id = pin.id.match(/(\d+)/);
    let __id = _id![0];

    await deleteDoc(doc(db, "pins", __id));

    return __id;
  } catch (error) {
    console.error("Error deleting pin:", error);
  }
};
