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
        const pins = await getFavPins(session.user);
        setFavPins(pins);
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
