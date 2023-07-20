import React, { useEffect } from "react";

import PinBuilderForm from "../../../components/PinBuilderForm";
import Head from "next/head";

function PinBuilder() {
  return (
    <div
      className="bg-primary h-[90vh] 
    px-[10px] md:px-[160px]">
      <PinBuilderForm />
    </div>
  );
}

export default PinBuilder;
