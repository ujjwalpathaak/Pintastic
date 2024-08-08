"use client";
import React from "react";
import { pinType } from "../types";
import ClientComponentPinItem from "./ClientComponentPinItem";

interface PageProps {
  id: number; // Make sure to use the appropriate type for id
  pin: pinType;
  hover: boolean;
  setHoverPin: (id: number) => void;
  isMobile: boolean;
}

const PinItem = ({ id, pin, hover, setHoverPin, isMobile }: PageProps) => {
  return (
    <ClientComponentPinItem
      id={id}
      pin={pin}
      hover={hover}
      setHoverPin={setHoverPin}
      isMobile={isMobile}
    />
  );
};

export default PinItem;
