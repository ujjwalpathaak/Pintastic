import React from "react";
import UserTag2 from "../../../../components/UserTag2";
import Image from "next/image";
import { BsArrowLeftCircle } from "react-icons/bs";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { pinType } from "../../../../types";
import { getPin, handleDownloadPin } from "../../../lib/api";
interface providerProps {
  params: {
    pinId: string;
  };
}

const page = async (props: providerProps) => {
  const router = useRouter();
  const pin: pinType | undefined = await getPin(props.params.pinId);
  const downloadURL: string = await handleDownloadPin(pin);

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
                  onClick={() => router.back()}
                >
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
                      onClick={() => window.open(pin.link)}
                    >
                      <BiLinkExternal color="#3F2305" />
                    </button>
                    <a
                      href={downloadURL}
                      download="stars.jpg"
                      className="h-fit flex hover:bg-secondary justify-center text-4xl lg:text-3xl items-center w-fit text-white rounded-full border-r border-gray-100  mr-6 ml-4"
                    >
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
          </div>
        </div>
      ) : null}
    </>
  );
};

export default page;
