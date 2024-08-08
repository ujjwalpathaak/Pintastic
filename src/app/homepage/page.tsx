import HomepagePins from "../../components/HomepagePins";
import { getUserPins } from "../../app/lib/api";

export default async function Home() {
  const listOfPins = await getUserPins();

  return <HomepagePins listOfPins={listOfPins} />;
}
