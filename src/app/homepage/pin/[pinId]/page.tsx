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
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useSession } from "next-auth/react";
import UserTag2 from "../../../../components/UserTag2";
import Image from "next/image";
import { BsArrowLeftCircle } from "react-icons/bs";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { pinType } from "../../../../types";
interface providerProps {
  params: {
    pinId: string;
  };
}

const page = (props: providerProps) => {
  const [pinId, setPinId] = useState<string>();
  const [pin, setPin] = useState<pinType>();
  const [imageUrl, setImageUrl] = useState<string>();
  const db = getFirestore(app);
  const router = useRouter();

  const handleDownloadPin = async () => {
    const storage = getStorage();
    const starsRef = ref(storage, `pinterest/${pin?.name}`);

    getDownloadURL(starsRef).then((url) => {
      setImageUrl(url);
    });
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
      }
    };

    getUserPins();
  }, [pinId]);

  return (
    <>
      {pin ? (
        <div className=" bg-primary pt-3 pb-6  h-[90vh] rounded-2xl md:px-24 lg:px-36">
          <div className="bg-[#efefef] h-full flex lg:flex-row flex-col rounded-2xl py-2 lg:py-[2rem] xl:pd-16">
            <div className="w-full lg:w-1/2 flex lg:flex-row lg:h-auto h-full flex-col justify-between">
              <div>
                <button
                  type="button"
                  className="h-fit flex hover:bg-secondary justify-center lg:text-4xl text-5xl items-center w-fit text-white rounded-full border-r border-gray-100 mx-[2rem]"
                  onClick={() => router.back()}>
                  <BsArrowLeftCircle color="#3F2305" />
                </button>
              </div>
              <div className="flex justify-end h-full items-center w-full flex-col">
                <div className="max-h-[100%] max-w-[100%] w-full h-full relative">
                  <Image
                    src={pin.image}
                    alt={pin.title}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-2xl"
                  />
                </div>

                <div className="h-[20%] lg:h-[10%] flex item-center">
                  <div className="flex items-center">
                    <button
                      className="h-fit flex hover:bg-secondary justify-center text-4xl lg:text-3xl items-center w-fit text-white rounded-full border-r border-gray-100"
                      onClick={() => window.open(pin.link)}>
                      <BiLinkExternal color="#3F2305" />
                    </button>
                    <a
                      href={imageUrl}
                      download="stars.jpg"
                      className="h-fit flex hover:bg-secondary justify-center text-4xl lg:text-3xl items-center w-fit text-white rounded-full border-r border-gray-100  mr-6 ml-4"
                      onClick={handleDownloadPin}>
                      <AiOutlineCloudDownload color="#3F2305" />
                    </a>
                    <UserTag2
                      user={{
                        name: pin.userName,
                        image: pin.userImage,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="px-12 pb-3 lg:p-16 lg:pb-3 w-full lg:w-[50%]">
              <div>
                <h1 className="text-3xl lg:text-5xl text-quadnary font-bold mb-5 lg:mb-10">
                  {pin.title}
                </h1>
                <h2 className="mt-5 lg:mt-10 text-quadnary ">{pin.desc}</h2>
              </div>
            </div>
            {/* 
            <div className="p-16 w-full lg:w-[50%]">
              <div>
                <h1 className="text-5xl text-quadnary font-bold mb-10">
                  {pin.title}
                </h1>
                <h2 className="mt-10 text-quadnary ">{pin.desc}</h2>
              </div>
            </div>
             */}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default page;
