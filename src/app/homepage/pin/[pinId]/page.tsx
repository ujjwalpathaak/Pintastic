import React from "react";
import { pinType } from "../../../../types";
import { getPin } from "../../../lib/api";
import ClientComponent from "./ClientComponent";

const fetchPin = async (pinId: string): Promise<pinType | undefined> => {
  const pin = await getPin(pinId);

  return pin;
};

const Page = async ({ params }: { params: { pinId: string } }) => {
  const pin = await fetchPin(params.pinId);

  return <div>{pin && <ClientComponent pin={pin} />}</div>;
};

export default Page;
