// components/ClientComponent.tsx

import React, { useEffect, useState } from "react";
import PinItem from "../../../components/PinItem";
import { getFavPins } from "../../lib/api";
import { pinType } from "../../../types";
import { Session } from "next-auth";

interface ClientComponentProps {
  session: Session | null;
}

const ClientComponent: React.FC<ClientComponentProps> = ({ session }) => {
  const [favPins, setFavPins] = useState<pinType[]>([]);

  useEffect(() => {
    if (session?.user) {
      const fetchFavPins = async () => {
        try {
          const pins = await getFavPins({
            email: session?.user?.email || "",
            userName: session?.user?.name || "",
            userImage: session?.user?.image || "",
            favPins: [],
          });
          const filteredPins = pins.filter(
            (pin) => pin !== undefined
          ) as pinType[];
          setFavPins(filteredPins);
        } catch (error) {
          console.error("Failed to fetch favorite pins:", error);
        }
      };
      fetchFavPins();
    }
  }, [session]);

  return (
    <div
      className="columns-2 md:columns-3
     lg:columns-4 mb-4
     xl:columns-5 space-y-6 mx-6"
    >
      {favPins?.map((item, index) => (
        <PinItem
          key={index}
          id={index}
          pin={item}
          hover={false}
          setHoverPin={() => {}}
          isMobile={false}
        />
      ))}
    </div>
  );
};

export default ClientComponent;
