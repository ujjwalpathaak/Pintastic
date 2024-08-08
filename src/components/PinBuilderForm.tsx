"use client";
import React, { useEffect, useState } from "react";
import UploadPin from "./UploadPin";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Select, { MultiValue, ActionMeta } from "react-select";
import makeAnimated from "react-select/animated";
import { BsArrowLeftCircle } from "react-icons/bs";
import useStore from "../store";
import { uploadFile } from "../app/lib/api";

const animatedComponents = makeAnimated();

interface OptionType {
  value: string;
  label: string;
}

const options: OptionType[] = [
  { value: "cars", label: "Cars" },
  { value: "anime", label: "Anime" },
  { value: "games", label: "Games" },
  { value: "travel", label: "Travel" },
  { value: "food", label: "Food" },
  { value: "quotes", label: "Quotes" },
  { value: "movies", label: "Movies" },
  { value: "technology", label: "Technology" },
  { value: "nature", label: "Nature" },
  { value: "animals", label: "Animals" },
];

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    minWidth: "300px",
    backgroundColor: "#EFEFEF",
    margin: "10px 0",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "#EFEFEF",
    color: "black",
  }),
};

function Form() {
  const router = useRouter();
  const { user, GuestUser } = useStore();
  const [selectedOptions, setSelectedOptions] = useState<
    MultiValue<OptionType>
  >([]);

  const handleChange = (
    selected: MultiValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    setSelectedOptions(selected);
  };

  useEffect(() => {
    console.log(selectedOptions);
  }, [selectedOptions]);

  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [link, setLink] = useState<string>("#");
  const [file, setFile] = useState<File | null | undefined>();

  const [loading, setLoading] = useState<boolean>(false);

  const onSave = async () => {
    if (!title || !desc) {
      alert("Title and description are required!");
      return;
    }
    setLoading(true);
    await uploadFile(
      user,
      GuestUser,
      title,
      desc,
      link,
      file,
      setLoading,
      selectedOptions
    );
    router.push("/homepage/" + user?.email);
    router.refresh();
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };
  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div className="bg-[#efefef] p-16 rounded-2xl justify-center flex flex-col items-center">
      <div className="flex justify-between mb-6 w-full">
        <button
          type="button"
          className="text-white w-fit h-fit font-semibold text-5xl hover:bg-secondary rounded-full"
          onClick={() => router.back()}
        >
          <BsArrowLeftCircle color="#3F2305" />
        </button>
        <button
          onClick={() => onSave()}
          className="p-2 text-white font-semibold px-3 rounded-lg text-5xl"
        >
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
              required
              placeholder="Add your title"
              onChange={(e) => handleTitleChange(e)}
              className="text-[35px] outline-none font-bold w-full border-b-[2px] border-gray-400 bg-transparent placeholder-quadnary"
            />
            <textarea
              onChange={(e) => handleDescChange(e)}
              placeholder="Tell everyone what your pin is about"
              className="outline-none w-full mt-[90px] border-b-[2px] border-gray-400 bg-transparent placeholder-quadnary"
            />
            <input
              type="text"
              onChange={(e) => handleLinkChange(e)}
              placeholder="Add a Destination Link"
              className="outline-none w-full pb-4 mt-[90px] border-b-[2px] border-gray-400 bg-transparent placeholder-quadnary"
            />
            <Select
              styles={customStyles}
              className="mt-10"
              closeMenuOnSelect={false}
              placeholder="Select Genre"
              components={animatedComponents}
              onChange={handleChange}
              isMulti
              options={options}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
