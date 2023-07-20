"use client";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import app from "../../../../database/firebaseConfig";
import { useSession } from "next-auth/react";
import { HiArrowSmallLeft } from "react-icons/hi2";
import UserTag2 from "../../../../components/UserTag2";
import Image from "next/image";
import { BsArrowLeftCircle } from "react-icons/bs";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
// import {saveAs} from "file-saver";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
interface providerProps {
  params: {
    pinId: string;
  };
}
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
const page = (props: providerProps) => {
  const [pinId, setPinId] = useState<string>();
  const [pin, setPin] = useState<pinType>();
  const db = getFirestore(app);
  const router = useRouter();
  const { data: session } = useSession();

  const handleDownloadPin = async () => {
    try {
      // Get the Firebase Storage reference
      const storage = getStorage(app);
      const storageRef = ref(storage, "path/to/your/image.jpg"); // Replace with the path to your image in Firebase Storage

      // Get the download URL of the image
      const imageUrl = await getDownloadURL(storageRef);

      // Fetch the image data
      const response = await fetch(imageUrl);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;

        // Extract the filename from the URL
        const filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);

        // Set the download attribute and filename
        link.setAttribute("download", filename);
        document.body.appendChild(link);

        // Simulate a click on the anchor element to start the download
        link.click();

        // Clean up the temporary anchor element
        link.parentNode?.removeChild(link);
      } else {
        console.error("Error downloading image:", response.statusText);
      }
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };
  useEffect(() => {
    setPinId(props.params.pinId);

    const getUserPins = async () => {
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
        setPin(pins[0]);
        console.log(pins[0]);
      }
    };

    getUserPins();
  }, [pinId]);

  return (
    <>
      {pin ? (
        <div className=" bg-primary pt-3 pb-6  h-[90vh] rounded-2xl md:px-24 lg:px-36">
          <div className="bg-[#efefef] h-full flex rounded-2xl py-[2rem] xl:pd-16">
            <button
              type="button"
              className="h-fit flex hover:bg-secondary justify-center text-4xl items-center w-fit text-white rounded-full border-r border-gray-100 mx-[2rem]"
              onClick={() => router.back()}>
              <BsArrowLeftCircle color="#3F2305" />
            </button>
            <div className="flex justify-center h-full items-center max-w-[40%] ">
              <div className="w-fit h-fit">
                <Image
                  src={pin.image}
                  alt={pin.title}
                  width={1000}
                  height={1000}
                  className="rounded-2xl"
                />
                <div className="flex">
                  <button
                    className="h-fit flex hover:bg-secondary justify-center text-3xl items-center w-fit text-white rounded-full border-r border-gray-100 mt-6"
                    onClick={() => window.open(pin.link)}>
                    <BiLinkExternal color="#3F2305" />
                  </button>
                  <button
                    className="h-fit flex hover:bg-secondary justify-center text-4xl items-center w-fit text-white rounded-full border-r border-gray-100  mt-6 mb-6 mr-6 ml-4"
                    onClick={handleDownloadPin}>
                    <AiOutlineCloudDownload color="#3F2305" />
                  </button>
                  <UserTag2
                    user={{
                      name: session?.user?.name!,
                      image: session?.user?.image!,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="p-16">
              <div>
                <h1 className="text-5xl text-quadnary font-bold mb-10">
                  {pin.title}
                </h1>
                <h2 className="mt-10 text-quadnary ">{pin.desc}</h2>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default page;
