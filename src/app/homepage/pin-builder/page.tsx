import React, { useEffect } from "react";

import PinBuilderForm from "../../../components/PinBuilderForm";
import Head from "next/head";
// export const metadata = {
//   title: "Pin Builder",
// };
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
