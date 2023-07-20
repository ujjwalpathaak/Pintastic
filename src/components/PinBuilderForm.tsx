"use client";
import React, { useState, useEffect } from "react";
import UploadPin from "./UploadPin";
import { useSession } from "next-auth/react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../database/firebaseConfig";
import { AiOutlineCloudUpload } from "react-icons/ai";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BsArrowLeftCircle } from "react-icons/bs";

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

function Form() {
  const { data: session } = useSession();

  const router = useRouter();
  const db = getFirestore(app);
  const storage = getStorage(app);

  const postId = Date.now().toString();

  let user = session?.user as userType;

  const [title, setTitle] = useState<string>();
  const [desc, setDesc] = useState<string>();
  const [link, setLink] = useState<string>("#");
  const [file, setFile] = useState<File | null | undefined>();

  const [loading, setLoading] = useState<boolean>(false);

  const onSave = () => {
    setLoading(true);
    uploadFile();
  };

  const uploadFile = () => {
    const storageRef = ref(storage, "pinterest/" + file?.name);
    uploadBytes(storageRef, file as Blob)
      .then((snapshot) => {
        console.log("File Uploaded");
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (url) => {
          console.log("DownloadUrl", url);

          const postData = {
            title: title,
            desc: desc,
            link: link,
            name: file?.name,
            image: url,
            userName: session?.user?.name,
            email: session?.user?.email,
            userImage: session?.user?.image,
            id: postId + session?.user?.name,
          };

          console.log(postData);

          await setDoc(doc(db, "pins", postId), postData).then((resp) => {
            console.log("Saved");
            setLoading(true);
            router.push("/homepage/" + session?.user?.email);
          });
        });
      });
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };
  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
  };
  const handletTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div className=" bg-[#efefef] p-16 rounded-2xl justify-center flex flex-col items-center">
      <div className="flex justify-between mb-6 w-full">
        <button
          type="button"
          // className="h-fit flex hover:bg-secondary justify-center text-4xl items-center w-fit text-white rounded-full border-r border-gray-100 mx-[2rem]"
          className="text-white w-fit h-fit font-semibold text-5xl hover:bg-secondary rounded-full"
          onClick={() => router.back()}>
          <BsArrowLeftCircle color="#3F2305" />
        </button>
        <button
          onClick={() => onSave()}
          className=" p-2
            text-white font-semibold px-3 
            rounded-lg text-5xl">
          {loading ? (
            <Image
              src="/loading-upload.gif"
              width={50}
              height={50}
              alt="loading"
              className="animate-spin"
            />
          ) : (
            <AiOutlineCloudUpload color="#3F2305" />
          )}
        </button>
      </div>
      <div className="grid grid-cols-1 w-fit lg:grid-cols-2 gap-20">
        <UploadPin setFile={setFile} />

        <div className="">
          <div className="w-[100%]">
            <input
              type="text"
              placeholder="Add your title *required"
              onChange={(e) => handletTitleChange(e)}
              className="text-[35px] outline-none font-bold w-full
        border-b-[2px] border-gray-400 bg-transparent placeholder-quadnary"
            />
            <textarea
              onChange={(e) => handleDescChange(e)}
              placeholder="Tell everyone what your pin is about *required"
              className="outline-none  w-full mt-[90px]
              border-b-[2px] border-gray-400 bg-transparent placeholder-quadnary"
            />
            <input
              type="text"
              onChange={(e) => handleLinkChange(e)}
              placeholder="Add a Destination Link"
              className=" outline-none  w-full  pb-4 mt-[90px]
        border-b-[2px] border-gray-400 bg-transparent placeholder-quadnary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
