// src/app/homepage/pin/[pinId]/page.tsx
import React, { useState, useEffect } from "react";
import UserTag2 from "../../../../components/UserTag2";
import Image from "next/image";
import { BsArrowLeftCircle } from "react-icons/bs";
import { BiLinkExternal } from "react-icons/bi";
import { pinType } from "../../../../types";
import { getPin } from "../../../lib/api";
import ClientComponent from "./ClientComponent";
import Link from "next/link";

interface PageProps {
  pin: pinType;
}

const fetchPin = async (pinId: string): Promise<pinType | undefined> => {
  const pin = await getPin(pinId);

  return pin;
};

const Page = async ({ params }: { params: { pinId: string } }) => {
  const pin = await fetchPin(params.pinId);

  // Server-side data fetching logic
  return <div>{pin && <ClientComponent pin={pin} />}</div>;
};

export default Page;
