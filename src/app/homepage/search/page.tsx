"use client";
import HomepagePins from "../../../components/HomepagePins";
import { getGenrePins } from "../../lib/api";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const [listOfPins, setListOfPins] = useState([]);
  const searchParams = useSearchParams();
  const genre = searchParams.get("genre");

  useEffect(() => {
    const fetchPins = async () => {
      if (genre) {
        const pins = await getGenrePins(genre);
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
