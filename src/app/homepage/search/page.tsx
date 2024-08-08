"use client";
import HomepagePins from "../../../components/HomepagePins";
import { getGenrePins } from "../../lib/api";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { pinType } from "../../../types";

export default function Home() {
  const [listOfPins, setListOfPins] = useState<pinType[]>([]);
  const searchParams = useSearchParams();
  const genre = searchParams.get("genre");

  useEffect(() => {
    const fetchPins = async () => {
      if (genre) {
        const pins = (await getGenrePins(genre)) as pinType[];
        setListOfPins(pins);
      }
    };
    fetchPins();
  }, [genre]);

  return (
    <div className="">
      {listOfPins.length === 0 ? (
        <div className="text-xl font-extrabold text-quadnary md:text-2xl lg:text-3xl">
          No pins in this genre! Upload some :)
        </div>
      ) : (
        <HomepagePins listOfPins={listOfPins} />
      )}
    </div>
  );
}
