import React from "react";
import UserInfo from "../../../components/UserInfo";
import UserPins2 from "../../../components/UserPins2";
import { providerProps } from "../../../types";

const page = async (props: providerProps) => {
  return (
    <>
      <div>
        <div>
          <UserInfo />
          <h1 className="mb-4 text-3xl mx-6 font-extrabold text-quadnary md:text-4xl lg:text-5xl">
            My Pins!
          </h1>
          <UserPins2 />
        </div>
      </div>
    </>
  );
};

export default page;
